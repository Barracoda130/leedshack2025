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
        for items in self.items:
            for user in items.user:
                total_monthly_income["total"] += user.policy.premium
                total_monthly_income["stats"][f"{user.firstname} {user.lastname}"] = user.policy.premium

        return total_monthly_income
    
    def get_total_num_of_claims(self):
        total_num_of_claims = {"total": 0, "stats": {}}
        for user in self.users:
            total_claims_by_user = len(user.claims)
            total_num_of_claims["total"] += total_claims_by_user

            items = {}
            for claim in user.claims:
                items[claim.item.name] = len(items.get_all(user=user))
            total_num_of_claims["stats"][f"{user.firstname} {user.lastname}"] = {"total_claims": total_num_of_claims,
                                                                                 "items": items}
        return total_num_of_claims


    def get_info(self):
        num_of_users = len(self.users)
        total_monthly_income = self.get_total_monthly_income()
        total_num_of_claims = self.get_total_num_of_claims()

        return {
                'name': self.name,
                'money': self.money,
                'termination_period': self.termination_period,
                'joining_fee': self.joining_fee,
                'num_of_users': num_of_users,
                'total_monthly_income': total_monthly_income,
                'total_num_of_claims': total_num_of_claims
        }

    def add_member(self, user_id):
      user = User.get(id=user_id)
      self.users.append(user)

    def add_item(self, item_id):
        item = Item.get(id=item_id)
        self.items.append(item)
