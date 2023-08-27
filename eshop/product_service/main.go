package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type product struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
	Category string `json:"category"`
	Count int `json:"count"`
}

func main(){
	r := gin.Default();
	r.GET("/all", getAll);
    r.POST("/", addProduct);
	r.Run("localhost:8080");
}

var werehouse = []product {};

func addProduct(c *gin.Context){
	var p product;
	p.Category = "food";
	p.Name = "milk";
	p.Count = 10;
	p.ID = uuid.New()
	werehouse = append(werehouse, p);
}

func getAll(c *gin.Context){
	c.IndentedJSON(http.StatusOK, werehouse);
}