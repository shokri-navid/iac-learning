package main

import (
	"fmt"
	docs "iac-learning/product-service/docs"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type product struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
	Category string `json:"category"`
	Count int `json:"count"`
}

type addProductRequest struct {
	Name string `json:"name"`
	Category string `json:"category"`
	Count int `json:"count"`
}
type saleProductRequest struct {
	Quantity int `json:"quantity"`
}

type response struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}

func main(){
	r := gin.Default();
	docs.SwaggerInfo.BasePath = "/api";

	w := r.Group("/api")
	{
		p := w.Group("/products")
		{

			p.GET("/", getAllProducts);
			p.POST("/", addProduct);
			p.DELETE("/:id", deleteProduct);
			p.GET("/:id", getProduct);
			p.PUT("/:id", saleProduct);
			
		}
	};
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerfiles.Handler));
	
	r.Run("localhost:8080");

}

var werehouse = []product {};

// @BasePath /api
// @Summary Add product
// @Schemes
// @Param   addProductRequest      body   addProductRequest     true  "body"
// @Description  Add new product to list
// @Accept json
// @Produce json
// @Success 200 {string} response
// @Router /products [post]
func addProduct(c *gin.Context){
	var p addProductRequest;
	if err:= c.BindJSON(&p);err != nil{
		var r = response{
			Success: false,
			Error: err.Error(),
		};
		c.IndentedJSON(http.StatusBadRequest, r);
		return
	}
    var pr = product {
		ID: uuid.New() ,
		Name: p.Name,
		Category: p.Category,
		Count: p.Count,
	}
	
	werehouse = append(werehouse, pr);
	var r = response{ Success: true}
	c.IndentedJSON(http.StatusOK, r);
}

// @BasePath /api
// @Summary get all products
// @Schemes
// @Description  get list Of products in werehouse
// @Produce json
// @Success 200 {string} response
// @Router /products [get]
func getAllProducts(c *gin.Context){
	c.IndentedJSON(http.StatusOK, werehouse);
}

// @BasePath /api
// @Summary delete product
// @Schemes
// @Param id  path   string     true  "9d109467-4d0d-4faf-9c0b-224b94b39ee0"
// @Description  delete the product from werehouse
// @Produce json 
// @Success 200 {string} response
// @Failed 404 
// @Router /products/{id} [delete]

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

// @BasePath /api
// @Summary get products by Id
// @Schemes
// @Param id  path   string     true  "9d109467-4d0d-4faf-9c0b-224b94b39ee0"
// @Description  returns a spesific item in werehouse
// @Produce json
// @Success 200 {string} response
// @Failed 404 
// @Router /products/{id} [get]
func getProduct(c *gin.Context){
	id := c.Param("id");
	index := getIndexById(id);
	if index >= 0 {
		c.IndentedJSON(http.StatusOK, werehouse[index]);
		return;
	}
	c.IndentedJSON(http.StatusNotFound, nil);
}

// @BasePath /api
// @Summary sale product
// @Schemes
// @Param id  path   string     true  "9d109467-4d0d-4faf-9c0b-224b94b39ee0"
// @Param saleProductRequest  body   saleProductRequest     true "count of sold items"
// @Description  reduce the remaining items in werehouse
// @Produce json
// @Success 200 {string} response
// @Failed 404 
// @Router /products/{id} [put]
func saleProduct(c *gin.Context){
	id := c.Param("id");
	fmt.Println(id);
	var q saleProductRequest;
	if err := c.Bind(&q); err !=nil{
		c.IndentedJSON(http.StatusBadRequest, response {Success: false, Error: err.Error()});
	}
	index := getIndexById(id);
	if index >= 0 {
		if werehouse[index].Count > q.Quantity {
			werehouse[index].Count -= q.Quantity;
			c.IndentedJSON(http.StatusNoContent, response{Success: true});
			return;
		}
		c.IndentedJSON(http.StatusBadRequest, response {Success: false, Error: "there is not enough item in werehouse"});
		return;
	}
	c.IndentedJSON(http.StatusNotFound, response{Success: false, Error: "item not found"});
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