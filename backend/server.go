package main

import (
	"log"
	"net/http"
	"os"
	"skewax/db"
	"skewax/google"
	"skewax/graph"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/rs/cors"

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

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080", "http://localhost:8000"},
		AllowCredentials: true,
	}).Handler)

	orm := db.InitDB()
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB: orm,
	}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)
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
	router.Handle("/signin", srvLogin)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
