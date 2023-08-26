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

resource "docker_container" "my_user_service" {
  image = docker_image.user_service.name
  name  = "my_user_service"

  ports {
    internal = 8000
    external = 8000
  }
}