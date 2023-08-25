# Description

In this service I tryed to create a user service to mange and store users data. It is a RestAPI
and has its own swagger documemtation, it is dockerized but currently it does not use any database 
to store its data storage is in memory. :)

## Install dependencies

run bellow comment to install prerequesties:
> python -m pip install fastapi uvicorn

**Note:**
I install pipreqs buy running this command  
> pip install pipreqs

and then create a `requirements.txt` file by this one:
> pipreqs /path/to/project

So, Now I have generated list of my apps requierments automatically and then we can install them on each destination machine 
by:
> pip install --no-cache-dir -r requirements.txt

## Run

use below command to run the application:
> uvicorn main:app --reload
Note:
Since you used --reload for development, when you update your application code, the server will reload automatically.

## Use

browse the http://localhost:8000/docs to see the OpenAPI documentation.

## Docker

### Docker build  

> Docker Build -t user-service .

### Docker Run

> docker run -d -h localhost -name my-user-service user-service
