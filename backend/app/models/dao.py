from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base
from .user import User
from .item import Item

class Dao(Base):
    __tablename__ = "dao"

    name = db.Column(db.String(80), nullable=False)
    money = db.Column(db.Numeric, nullable=False)
    termination_period = db.Column(db.Integer, nullable=False) #months
    joining_fee = db.Column(db.Numeric, nullable=False)

    users = db.relationship('User', secondary='user_in_dao', back_populates='daos')
    committee_members = db.relationship('User', secondary='user_in_committee', back_populates='committees')
    items = db.relationship('Item', back_populates='dao')

    def __init__(self, name, money=0, termination_period=1, joining_fee=0):
        self.name = name
        self.money = money
        self.termination_period = termination_period
        self.joining_fee = joining_fee

    def __repr__(self):
        return f'<Dao(name={self.name}, money={self.money}, termination_period={self.termination_period}, joining_fee={self.joining_fee})>'

    def get_total_monthly_income(self):
        total_monthly_income = {"total": 0, "stats": {}}
        for item in self.items:
                total_monthly_income["total"] += sum([x.premium for x in item.get_policies()])
                print(total_monthly_income["total"])
                for user in item.get_users():
                    total_monthly_income["stats"][f"{user.firstname} {user.surname}"] = sum([x.premium for x in user.get_policies()])

        return total_monthly_income
    
   


    def get_info(self):
        num_of_users = len(self.users)
        total_monthly_income = self.get_total_monthly_income()

        return {
                'name': self.name,
                'money': self.money,
                'termination_period': self.termination_period,
                'joining_fee': self.joining_fee,
                'num_of_users': num_of_users,
                'total_monthly_income': total_monthly_income,
                'users': [x.get_info() for x in self.users],
                'items': self.get_items()
        }
    
    def get_items(self):
        items = []
        for item in self.items:
            items.append({"id": item.id, "name": item.name, "premium": item.base_policy.premium, "excess": item.base_policy.excess})
        return items

    def add_member(self, user_id):
      user = User.get(id=user_id)
      self.users.append(user)

    def add_item(self, item_id):
        item = Item.get(id=item_id)
        self.items.append(item)
