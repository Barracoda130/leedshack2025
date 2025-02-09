from decimal import Decimal

from config import SQLALCHEMY_DATABASE_URI
from app import db
from app.models import *

db.drop_all()
db.create_all()

def create_dummy_data():
    u1 = User(username="user1", email="email1", password="password", firstname="first", surname="surname")
    u2 = User(username="user2", email="email2", password="password", firstname="first", surname="surname")
    u3 = User(username="user3", email="email3", password="password", firstname="first", surname="surname")
    u1.save()
    u2.save()
    u3.save()

    i1 = Item("item1", Decimal(100), Decimal(0.1), Decimal(0.1))
    i2 = Item("item2", Decimal(200), Decimal(0.2), Decimal(0.2))
    i1.save()
    i2.save()   

    p1 = Policy(Decimal(0.1), Decimal(0.1))
    p2 = Policy(Decimal(0.1), Decimal(0.1))
    p1.save()
    p2.save()

    i1.base_policy = p1
    i1.update()
    i2.base_policy = p2
    i2.update()


    d1 = Dao(name="dao_name")
    d1.save()
    d1.add_member(u1.id)
    d1.add_member(u2.id)
    d1.add_item(i1.id)
    d1.add_item(i2.id)
    

    d1.update()
    d2 = Dao(name="dao_name2")
    d2.save()

    u1.insure_item(i1.id)
    u1.insure_item(i2.id)

create_dummy_data()

    