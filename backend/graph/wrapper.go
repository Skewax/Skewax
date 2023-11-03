package graph

import (
	"context"
	"fmt"
	"skewax/db"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"golang.org/x/oauth2"
)

func (r *queryResolver) getUserToken(ctx context.Context) (*oauth2.Token, error) {
	ctxUser := ctx.Value("user")
	var user db.AuthUser
	switch ctxUser.(type) {
	case db.AuthUser:
		user = ctxUser.(db.AuthUser)
	default:
		return nil, fmt.Errorf("user not found")
	}

	token, err := r.Google.VerifyUser(user, r.DB)
	if err != nil {
		return nil, err
	}

	return token, nil
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
