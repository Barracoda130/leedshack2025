from decimal import Decimal

from config import SQLALCHEMY_DATABASE_URI
from app import db
from app.models import *

db.drop_all()
db.create_all()

def create_dummy_data():
    dao1 = Dao('dao1')

    dao1.save()

    base_policy1 = Policy(Decimal('1.0'), Decimal('1.0'))
    base_policy2 = Policy(Decimal('2.0'), Decimal('2.0'))

    base_policy1.save()
    base_policy2.save()

    item1 = Item(name='item1', new_price=Decimal('10.0'), excess_rate=0.1, premium_rate=0.1, dao_id=dao1.id, base_policy_id=base_policy1.id)
    item2 = Item(name='item2', new_price=Decimal('20.0'), excess_rate=0.1, premium_rate=0.1, dao_id=dao1.id, base_policy_id=base_policy2.id)

    item1.save()
    item2.save()

    dao1.add_item(item1.id)
    dao1.add_item(item2.id)
    dao1.update()

    user1 = User(username=None, password=None, email=None, firstname='user', surname='one')
    user2 = User(username=None, password=None, email=None, firstname='user', surname='two')
    user3 = User(username=None, password=None, email=None, firstname='user', surname='three')

    user1.save()
    user2.save()
    user3.save()

    user1.insure_item(item1.id)
    user2.insure_item(item2.id)
    user3.insure_item(item1.id)
    user3.insure_item(item2.id)

    dao1.add_member(user1.id)
    dao1.add_member(user2.id)
    dao1.add_member(user3.id)
    dao1.update()

create_dummy_data()

    