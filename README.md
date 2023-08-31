# Description

Hi there, these days I am trying to apply to new vacancies in LinkedIn and It seems that my lack of familiarity with Cloud and IAC Is one Of my big problems. with regard that cloud providers are not available in Iran 🇮🇷
It seems I never found a Job BUT leaving there made us stubborn so I want to transform "this big sorrow into a big work" (this is not my sentence I borrowed it from [Touran Mirhadi](https://en.wikipedia.org/wiki/Touran_Mirhadi)🌹)

I want to start a self-learning course (based on my own R&D, not any specific online course) to get familiar with IAC technologies. So, this Is my plan:

- I will try to share my experiences and research results like a story. (I guess it could be fun, let's try!!!) 💤
- I am a Back-end developer  mainly focused on (C#, PHP) but In this course, I promised myself not to use these two languages my new candidates are among this
 list (GO lang, Python, NodeJs, JAVA, or maybe Rust) this helps me to learn some new programming languages and pushes me more out of my comfort zone 😜
- Because I am living in Iran and as Iranian modern humans we are faced with a long list of sanctions and restrictions there is no real cloud service provider available 💥
- According to the previous item I should learn How I compose a cloud system on my local machine. maybe using K8s. But I do not know exactly I will share the result in the future 😄
- After finding that running the cloud on the local machine is possible or not I will start my development phase: 🎉
  - I will create multiple services using the mentioned programming language those are listed above.
  - Then We should make them ready to auto-deploy on the cloud system. I have no idea yet may I should dockerize them or use other tools.
  - Then I will try to build that f**king mythical cloud engine on my laptop.
  - and try to deploy my services on this cloud station

-----

## First Step

**IAC??? What is that?😳**

Based on my understanding, IaC is a way to automate efforts for providing infrastructure and service deployment. when you want to deploy a service you should take these steps:

1. Make ready some machines to provide your requests services like Database, Message brokers and so on.
2. Deploy your prerequisites.
3. Implement the network topography of your services to make them visible or invisible from each other.
4. Create a machine ready for your developed service and deploy it.

So you should have done all this time-consuming work manually by your hand. regardless of these long stories and repeating them for many other upcoming services.
There is another furious monster waiting for you 😆 **maintenance and modification**.

So, what can we do to fight all of these time-consuming tasks?
Using templates and tools to automate all of these steps. So, there you are. it is ***IAC*** the great ⚔️

IaC puts these benefits on the table:

- Cost reduction
- Increase in speed of deployments
- Reduce errors
- Improve infrastructure consistency
- Eliminate configuration drift
  
So there is two approach for implementing your desired mesh of machines: (When I am talking about machine I mean Machines with all kind of prerequisites those are necessary to provide the final service to the beloved customer 🤗)

1. Declrative: Describe your desired state of machines
2. Imprative: describe the steps that have to be taken to build that desired state of machines.

## Conclusion

So, After a while of researching and surfing the internet, I found that there is a lot of IaC tools available:

1. terraform
2. Ansible
3. AWS CloudFormation.
4. Azure Resource Manager.
5. Google Cloud Deployment Manager, ...

So, May I be wrong but Terraform was more interesting for me because it was multiplatform which means you can use it for many technologies from Docker and K8S to Google Cloud provider and other cloud provider services. Also, it is Opensource and we love open-source things because they can last longer when you are living in a totally sanctioned country like Iran.

So Until now, I will use Terraform from now and I will start with its docker feature. because I found that IaC is very coupled with virtualization and environments that contain multiple Vitulized servers. Obviously, I cannot prepare such an environment for myself because of budget but who knows One day I run my own data center with a dozen real G10 Servers.
I will start with docker and then I will continue on K8S 😃

-----

## Second Step

I need to create multiple services and then create some docker images based on those services and finally run this mesh of services using IaC:
My microservice application will contain these building blocks (they will not connect to the database at the first step but may I add database persistence abilty to them in the future):

1. User service that is responsible for maintaining users (written in Python)
2. Product service that manages all products (written in go)
3. Order service that handles all orders-related requests (written in Nodejs)

So, I finished the required applications and they are all functional and have their own `Dockerfile` and `README.md`. you can find them inside the `eshop` folder.

## Third Step

Now I have all the needed code to build my microservice application and they are all dockerized I am going to use the docker driver of the terraform to deploy my applications in the docker platform.
you can find all the needed configuration inside the terraform-docker folder. If you want to run this stack using terraform and docker you should install terraform in your system by using [this instruction](https://developer.hashicorp.com/terraform/downloads?product_intent=terraform).

and then run the below commands to run the stack:
> terraform init
> terraform validate
> terraform apply

and if you want to undo all the changes that are made by the `apply` command just use:
> terraform destroy

## Fourth Step

We created the docker configuration so far and it was a very pleasurable journey for me. but I want to configure this stack to run in *K8S*. Installing K8S on the laptop is not a good idea because of its resource consumption, but we have another option to use and that option is *MicroK8s*. It is lightweight and almost can provide all functionalities of the *K8s* even clustering. So, I will start my next step by installing MicroK8s on my laptop and then we will create a terraform configuration for *K8s*. for more details, you can refer to re references section.

### Points

1- k8s cannot pull image from local docker registry and you should register you local insecure registry address by reading [this link] (https://microk8s.io/docs/registry-private). *you can use localhost instead of mentioned IP.*

2- You should enable your own microk8s image registery accordong to [this link](https://stackoverflow.com/questions/55297278/how-to-use-local-docker-images-with-microk8s)

```bash
  microk8s.enable registry
  docker tag <imageName:version> localhost:32000/<imageName:version>
  docker push localhost:32000/<imageName:version>
```

-----

References:

- <https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac>
- <https://opensource.com/article/19/3/home-lab>
- <https://opensource.com/article/19/7/infrastructure-code>
- <https://sweetcode.io/leverage-terraform-to-automate-docker-images-and-container-builds>
- <https://github.com/localstack/localstack>
- <https://go.dev/doc/tutorial/web-service-gin>
- <https://github.com/swaggo/gin-swagger>
- <https://www.acuriousanimal.com/blog/20181020/express-swagger-doc>
- <https://microk8s.io/docs/getting-started>
- <https://github.com/balchua/do-microk8s>
- <https://kubernetes.io/docs/tutorials/kubernetes-basics/>
