# Description
Hi there,these days I am trying to apply to new vacancies in linked in and It seems that my lack of familiarity with Cloud and IAC Is one Of my big problems. with regarding that cloud providers are not available in Iran 🇮🇷
it seems I never find a Job BUT leaving ther made us stubborn so I want to transform "this big sarrow to a big work" (this is not my sentence I borrowed it from [Touran Mirhadi](https://en.wikipedia.org/wiki/Touran_Mirhadi)🌹)

I want to start a self learning course (base on my own R&D not any specific online course) to getting familar with IAC technologies. So, this Is my plan:
- I will try to share my experiances and researh result like story. (I guess it could be fun, lets try!!!) 💤
- I am a Back-end developer  mainly focused on (C#, PHP) but In this course I proissed to myself to donot use these two language my new condidates are amoung this
 list (GO lang , Python , NodeJs, JAVA or maybe Rust) this helps me to learn some new programming languages and push me more out of my confort zone 😜
- Because I am leaving in Iran and as Iranian modern human we are facxed with a long list of sanctions and restrictions So there is no real cloud service provider available 💥
- According to previous item I should learn How can I compose a cloud system on my local machine. maybe using K8s. But I do not know exactly I will share the result in future 😄
- After finding that th running cloud on local machine is possible or not I will start my development phase: 🎉
    - I will create multiple services using mentioned programming language those are listed above.
    - Then We should make them ready to auto deploy on cloud system. I have no idea yet may I should dockerize them or use other tools.
    - Then I will try to build that f**king mythical cloud engine on my laptop. 
    - and try to deploy my services on this cloud station

-----
## First Step:
**IAC??? What is that?😳**

Based on my understanding, IaC is a way to automate efforts for providing infrustracture and service deployment. when you want to deploy a service you should take these steps:

1. Make ready some machines to provide your prerequests services like Database, Message brokers and so on.
2. Deploy your prerequesties. 
3. Implement the network topography fo your services to make them visible or invisible from each other.
4. create Machin redy for your developed service and deploy it. 

So you should Done all this time conuming work manually by yiur hand. regardless of these long stories and repeating them for many other upcomming services 
there is another furious monster waiting for you 😆 **maintenance and modification**.

So, what can we do to fight with all of these time consuming task? 
Using templates and tools to automate all of these steps. So, there you are. it is ***IAC*** the great ⚔️

IaC puts these benefits on the table: 
- Cost reduction
- Increase in speed of deployments
- Reduce errors 
- Improve infrastructure consistency
- Eliminate configuration drift
  
so there is two approach for implementing youe desired mesh of machines: (when I am talking about machine I mean Machines with all kind of prerequesties those are necessary to provide the final service to the beloved customer 🤗)
1. Declrative: describe your desiered state of machines
2. Imprative: descraibe the steps those have to be taken to build that desired state of machines. 


-----
References:
- https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac
- https://opensource.com/article/19/3/home-lab
- https://opensource.com/article/19/7/infrastructure-code

