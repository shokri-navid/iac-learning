from fastapi import FastAPI, HTTPException
from model.Dto import AddUserDto
from model.User import User
import json

app = FastAPI()
userList = []

@app.get("/users/{id}")
async def get_item(id):
    user = findById(id)
    if user != None:
        return {"data": json.dumps(user.__dict__, default= str)}
    raise HTTPException(404, {"message" : "Item not fount."}) 
    #return {"data": json.dumps([obj.__dict__ for obj in  userList], default= str)}


@app.get("/users")
async def get_all():
    return {"data": json.dumps([obj.__dict__ for obj in  userList], default= str)}


@app.post("/users")
async def add(dto: AddUserDto):
    if len(dto.name) == 0 or len(dto.family) == 0 :
        raise HTTPException(400, {"message" : "name and family are required."})
    
    user = User(dto.name, dto.family)
    userList.append(user)
    return {"data": user.id}


@app.delete("/users/{id}")
async def delete_item(id):
    user = findById(id)
    if user != None:
        userList.remove(user)
        return {"data": "deleted"}
    raise HTTPException(404, {"message" : "Item not fount."}) 
    #return {"data": json.dumps([obj.__dict__ for obj in  userList], default= str)}


def findById(id: str):
    for user in userList:
        if user.get_id ==  id :
            return user
    return None
        