import uuid


class User: 
    id: uuid
    def __init__(self, name, family):
        self.name = name
        self.family = family
        self.id = uuid.uuid4()
    @property
    def get_id(self):
        return str(self.id)