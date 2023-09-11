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

resource "kubernetes_service" "ingress_user" {
  metadata {
    name      = "ingress-user"
    namespace = "ingress"
  }
  spec {
    selector = {
      name = "nginx-ingress-microk8s"
    }
    port {
      name        = "user-http"
      protocol    = "TCP"
      port        = 80
      target_port = 8000
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_service" "ingress_product" {
  metadata {
    name      = "ingress-product"
    namespace = "ingress"
  }
  spec {
    selector = {
      name = "nginx-ingress-microk8s"
    }
    port {
      name        = "user-http"
      protocol    = "TCP"
      port        = 80
      target_port = 8080
    }

    type = "LoadBalancer"
  }
}

resource "kubernetes_service" "ingress_order" {
  metadata {
    name      = "ingress-order"
    namespace = "ingress"
  }
  spec {
    selector = {
      name = "nginx-ingress-microk8s"
    }
    port {
      name        = "order-http"
      protocol    = "TCP"
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}

# user app
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

# product app
resource "kubernetes_deployment" "product-app" {
  metadata {
    name      = "product-app"
    namespace = "iac-learning"
    labels = {
      app = "user-app"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "product-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "product-app"
        }
      }

      spec {
        container {
          image = "localhost:32000/product_service:latest"
          name  = "product-app"
          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "product-service" {
  metadata {
    name      = "product-service"
    namespace = "iac-learning"
  }
  spec {
    selector = {
      app = "product-app"
    }
    port {
      port        = 8080
      target_port = 8080
    }
    type = "NodePort"
  }
}

resource "kubernetes_ingress_v1" "product-ingress" {
  metadata {
    name      = "product-ingress"
    namespace = "iac-learning"
    annotations = {
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
    }
  }
  spec {
    rule {
      host = "product.local"
      http {
        path {
          path = "/"
          backend {
            service {
              name = "product-service"
              port {
                number = 8080
              }
            }
          }
        }
      }
    }
  }
}


# order app
resource "kubernetes_deployment" "order-app" {
  metadata {
    name      = "order-app"
    namespace = "iac-learning"
    labels = {
      app = "order-app"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "order-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "order-app"
        }
      }

      spec {
        container {
          image = "localhost:32000/order_service:latest"
          name  = "order-app"
          port {
            container_port = 3000
          }
          env {
            name  = "PORT"
            value = "3000"
          }

          env {
            name  = "USER_API_ADDRESS"
            value = "http://user-service.iac-learning.svc.cluster.local:8000"
          }

          env {
            name  = "PRODUCT_API_ADDRESS"
            value = "http://product-service.iac-learning.svc.cluster.local:8080"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "order-service" {
  metadata {
    name      = "order-service"
    namespace = "iac-learning"
  }
  spec {
    selector = {
      app = "order-app"
    }
    port {
      port        = 3000
      target_port = 3000
    }
    type = "NodePort"
  }
}

resource "kubernetes_ingress_v1" "order-ingress" {
  metadata {
    name      = "order-ingress"
    namespace = "iac-learning"
    annotations = {
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
    }
  }

  spec {
    rule {
      host = "order.local"
      http {
        path {
          path = "/"
          backend {
            service {
              name = "order-service"
              port {
                number = 3000
              }
            }
          }
        }
      }
    }
  }
}
