FROM golang:1.21
WORKDIR /opt/app
EXPOSE 8000

RUN go install github.com/cosmtrek/air@latest
CMD ["air", "-c", ".air.toml"]
