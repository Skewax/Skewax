package main

import (
	"log"
	"net/http"
	"os"
	"skewax/db"
	"skewax/google"
	"skewax/graph"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"golang.org/x/oauth2"
	extGoogle "golang.org/x/oauth2/google"
)

const defaultPort = "8000"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	orm := db.InitDB()
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB: orm,
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
	googleProvider := google.NewGoogleProvider(&oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_OAUTH_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_OAUTH_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URI"),
		Scopes:       strings.Split(os.Getenv("GOOGLE_OAUTH_SCOPES"), ","),
		Endpoint:     extGoogle.Endpoint,
	})

	srvLogin := &google.LoginHandler{
		Google: googleProvider,
		DB:     orm,
	}
	http.Handle("/signin", srvLogin)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
