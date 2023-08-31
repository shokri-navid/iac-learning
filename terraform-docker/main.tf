terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_network" "private_network" {
  name = "iac_network"
}

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
  networks_advanced {
    name = docker_network.private_network.name
  }
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
  networks_advanced {
    name = docker_network.private_network.name
  }
  ports {
    internal = 8080
    external = 8080
  }
}

resource "docker_image" "order_service" {
  name = "order_service"
  build {
    context    = "../eshop/order_service"
    dockerfile = "Dockerfile"
  }
  #keep_locally = false
}

resource "docker_container" "iac_order_service" {
  image = docker_image.order_service.name
  name  = "iac_order_service"
  env   = ["PORT=3000", "USER_API_ADDRESS=http://iac_user_service:8000", "PRODUCT_API_ADDRESS=http://iac_product_service:8080"]
  networks_advanced {
    name = docker_network.private_network.name
  }
  ports {
    internal = 3000
    external = 3000
  }
}