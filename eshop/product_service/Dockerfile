FROM golang:1.18
EXPOSE 8080

WORKDIR /app
COPY go.mod go.sum ./

RUN go mod download
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /product-service

CMD [ "/product-service" ]