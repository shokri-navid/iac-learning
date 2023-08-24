import uuid
from pydantic import BaseModel

class AddUserDto(BaseModel):
    name: str
    family: str
    