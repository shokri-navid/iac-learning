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
	r.GET("/products", getAllProducts);
    r.POST("/products", addProduct);
	r.DELETE("/products/:id", deleteProduct);
	r.GET("/products/:id", getProduct);
	r.PUT("/products/:id", saleProduct)
	r.Run("localhost:8080");
}

var werehouse = []product {};

func addProduct(c *gin.Context){
	var p product;
	if err:= c.BindJSON(&p);err != nil{
		r := struct	{
			Success bool;
			Error string;
		}{
			Success: false,
			Error: err.Error(),
		};
		c.IndentedJSON(http.StatusBadRequest, r);
		return
	}
	p.ID = uuid.New()
	werehouse = append(werehouse, p);
	r := struct{Success bool}{ Success: true}
	c.IndentedJSON(http.StatusOK, r);
}

func getAllProducts(c *gin.Context){
	c.IndentedJSON(http.StatusOK, werehouse);
}

func deleteProduct(c *gin.Context){
	i := c.Param("id");
	index := getIndexById(i);
	if index >= 0 {
		werehouse = removeIndex(werehouse, index);
		c.IndentedJSON(http.StatusCreated, nil);
		return;
	}

	c.IndentedJSON(http.StatusNotFound, nil);
}

func getProduct(c *gin.Context){
	id := c.Param("id");
	index := getIndexById(id);
	if index >= 0 {
		c.IndentedJSON(http.StatusOK, werehouse[index]);
		return;
	}
	c.IndentedJSON(http.StatusNotFound, nil);
}

func saleProduct(c *gin.Context){
	id := c.Param("id");
	index := getIndexById(id);
	if index >= 0 {
		if werehouse[index].Count > 0 {
			werehouse[index].Count--;
			c.IndentedJSON(http.StatusNoContent, nil);
			return;
		}
		c.IndentedJSON(http.StatusBadRequest, nil);
		return;
	}
	c.IndentedJSON(http.StatusNotFound, nil);
}

func removeIndex(s []product, index int) []product {
    return append(s[:index], s[index+1:]...)
}

func getIndexById(id string) int{
	for t, j := range werehouse {
		if j.ID == uuid.MustParse(id){
			return t;
		}
	}
	return -1;
}