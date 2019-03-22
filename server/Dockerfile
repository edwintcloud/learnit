FROM golang:alpine as builder

RUN mkdir /learnit-server
WORKDIR /learnit-server
COPY go.mod .
COPY go.sum .

RUN apk update && apk add --update --no-cache ca-certificates git

RUN go mod download
COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build 

FROM alpine:latest

RUN mkdir /learnit-server
WORKDIR /learnit-server

COPY --from=builder /learnit-server/server .

CMD ["./server"]