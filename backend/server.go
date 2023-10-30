package main

import (
	"log"
	"net/http"
	"os"
	"skewax/auth"
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

	origins := strings.Split(os.Getenv("ALLOWED_ORIGINS"), ",")

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   origins,
		AllowCredentials: true,
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
	}).Handler)

	orm := db.InitDB()
	authMiddleware := auth.Middleware(orm)

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB: orm,
	}}))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", authMiddleware(srv))
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

	srvExchange := &auth.ExhangeHandler{
		DB: orm,
	}
	router.Handle("/exchange", srvExchange)
	
	srvSignout := &auth.SignoutHandler{
		DB: orm,
	}
	router.Handle("/signout", srvSignout)
	
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
