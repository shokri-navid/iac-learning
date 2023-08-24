### Install dependencies
run bellow comment to install prerequesties:
> python -m pip install fastapi uvicorn

### Run:
use below command to run the application: 
> uvicorn main:app --reload
Note: 
Since you used --reload for development, when you update your application code, the server will reload automatically.

### Use:
browse the http://localhost:8000/docs to see the OpenAPI documentation.