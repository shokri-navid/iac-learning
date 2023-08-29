terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "user_service" {
  name = "user_service"
  build {
    context    = "../eshop/user_service"
    dockerfile = "Dockerfile"
  }
  #keep_locally = false
}

resource "docker_container" "iac_user_service" {
  image = docker_image.user_service.name
  name  = "iac_user_service"

  ports {
    internal = 8000
    external = 8000
  }
}


resource "docker_image" "product_service" {
  name = "product_service"
  build {
    context    = "../eshop/product_service"
    dockerfile = "Dockerfile"
  }
  #keep_locally = false
}

resource "docker_container" "iac_product_service" {
  image = docker_image.product_service.name
  name  = "iac_product_service"

  ports {
    internal = 8080
    external = 8080
  }
}