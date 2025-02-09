from app.models import *
def create():
    u1 = User(username="userrrr", email="email2", password="password", firstname="first", surname="surname")
    u1.save()

    d1 = Dao(name="dao_name")
    d1.save()
    d2 = Dao(name="dao_name2")
    d2.save()

def add():
    d2 = Dao.get(name="dao_name2")
    u1 = User.get(username="userrrr")
    d2.add_member(u1.id)
    print(d2.users)
# create()
add()
# print(User.get_all())
