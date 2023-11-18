package google

import (
	"context"
	"skewax/db"

	"golang.org/x/oauth2"
	"google.golang.org/api/drive/v3"
	goauth "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
	"gorm.io/gorm"
)

type GoogleProvider struct {
	config *oauth2.Config
}

func NewGoogleProvider(conf *oauth2.Config) *GoogleProvider {
	return &GoogleProvider{
		config: conf,
	}
}

func (p *GoogleProvider) ExchangeCode(code string) (*oauth2.Token, error) {
	return p.config.Exchange(context.Background(), code)
}

func (p *GoogleProvider) UserService(token *oauth2.Token) (*goauth.Service, error) {
	return goauth.NewService(context.Background(), option.WithTokenSource(p.config.TokenSource(context.Background(), token)))
}

func (p *GoogleProvider) DriveService(token *oauth2.Token) (*drive.Service, error) {
	return drive.NewService(context.Background(), option.WithTokenSource(p.config.TokenSource(context.Background(), token)))
}

func (p *GoogleProvider) VerifyUser(user db.AuthUser, db *gorm.DB) (*oauth2.Token, error) {
	token := user.GetToken()
	if token.Valid() {
		return token, nil
	}

	tokenSource := p.config.TokenSource(context.Background(), token)
	newToken, err := tokenSource.Token()
	if err != nil {
		return nil, err
	}

	user.AccessToken = newToken.AccessToken
	user.RefreshToken = newToken.RefreshToken
	user.AccessTokenExpiry = &newToken.Expiry

	db.Save(&user)
	return newToken, nil
}
