package graph

//go run github.com/99designs/gqlgen generate

import (
	"context"
	"fmt"
	"skewax/db"
	"skewax/google"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"golang.org/x/oauth2"
	"gorm.io/gorm"
)

type Databased interface {
	GetGoogle() *google.GoogleProvider
	GetDB() *gorm.DB
}

func getUserTokenGeneric(r Databased, ctx context.Context) (*oauth2.Token, error) {
	ctxUser := ctx.Value("user")
	var user db.AuthUser
	switch ctxUser.(type) {
	case db.AuthUser:
		user = ctxUser.(db.AuthUser)
	default:
		return nil, fmt.Errorf("user not found")
	}

	token, err := r.GetGoogle().VerifyUser(user, r.GetDB())
	if err != nil {
		return nil, err
	}

	return token, nil
}

func (r *queryResolver) GetDB() *gorm.DB                   { return r.DB }
func (r *queryResolver) GetGoogle() *google.GoogleProvider { return r.Google }

func (r *queryResolver) getUserToken(ctx context.Context) (*oauth2.Token, error) {
	token, err := getUserTokenGeneric(r, ctx)
	return token, err
}

func (r *mutationResolver) GetDB() *gorm.DB                   { return r.DB }
func (r *mutationResolver) GetGoogle() *google.GoogleProvider { return r.Google }

func (r *mutationResolver) getUserToken(ctx context.Context) (*oauth2.Token, error) {
	token, err := getUserTokenGeneric(r, ctx)
	return token, err
}

func GetPreloads(ctx context.Context) []string {
	return getNestedPreloads(
		graphql.GetOperationContext(ctx),
		graphql.CollectFieldsCtx(ctx, nil),
		"",
	)
}

func getNestedPreloads(ctx *graphql.OperationContext, fields []graphql.CollectedField, prefix string) (preloads []string) {
	for _, column := range fields {
		prefixColumn := getPreloadString(prefix, column.Name)
		preloads = append(preloads, prefixColumn)
		preloads = append(preloads, getNestedPreloads(ctx, graphql.CollectFields(ctx, column.Selections, nil), prefixColumn)...)
	}
	return
}

func getPreloadString(prefix, name string) string {
	if len(prefix) > 0 {
		return prefix + "." + name
	}
	return name
}

func GetContainsField(fields []string, field string) bool {
	for _, f := range fields {
		if f == field {
			return true
		}
	}
	return false
}

func GetNestedFields(fields []string, prefix string) []string {
	subFields := make([]string, 0)
	for _, field := range fields {
		if strings.HasPrefix(field, prefix+".") {
			subFields = append(subFields, strings.TrimPrefix(field, prefix+"."))
		}
	}
	return subFields
}
