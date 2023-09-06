terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
}

provider "kubernetes" {
  config_path = "/var/snap/microk8s/current/credentials/client.config"
}

resource "kubernetes_namespace" "iac-learning" {
  metadata {
    name = "iac-learning"
  }
}

resource "kubernetes_service" "ingress" {
  metadata {
    name      = "ingress"
    namespace = "ingress"
  }
  spec {
    selector = {
      name = "nginx-ingress-microk8s"
    }
    port {
      port        = 80
      target_port = 8000
    }
    type = "LoadBalancer"
  }
}

resource "kubernetes_deployment" "user-app" {
  metadata {
    name      = "user-app"
    namespace = "iac-learning"
    labels = {
      app = "user-app"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "user-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "user-app"
        }
      }

      spec {
        container {
          image = "localhost:32000/user-service:latest"
          name  = "user-app"
          port {
            container_port = 8000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "user-service" {
  metadata {
    name      = "user-service"
    namespace = "iac-learning"
  }
  spec {
    selector = {
      app = "user-app"
    }
    port {
      port        = 8000
      target_port = 8000
    }
    type = "NodePort"
  }
}

resource "kubernetes_ingress_v1" "user-ingress" {
  metadata {
    name      = "user-ingress"
    namespace = "iac-learning"
    annotations = {
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
    }
  }

  spec {
    rule {
      host = "user.local"
      http {
        path {
          path = "/"
          backend {
            service {
              name = "user-service"
              port {
                number = 8000
              }
            }
          }
        }
      }
    }
  }
}