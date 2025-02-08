from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base

class Dao(Base):
    __tablename__ = "dao"

    name = db.Column(db.String(80), nullable=False)
    money = db.Column(db.Numeric, nullable=False)
    termination_period = db.Column(db.Integer, nullable=False) #months
    joining_fee = db.Column(db.Numeric, nullable=False)

    users = db.relationship('User', secondary='user_in_dao', back_populates='daos')
    committee_members = db.relationship('User', secondary='user_in_committee', back_populates='committees')
    items = db.relationship('Item', back_populates='dao')

    def __init__(self, name, money=0):
        self.name = name
        self.money = money

    def __repr__(self):
        return f'<Dao(name={self.name}, money={self.money}, termination_period={self.termination_period}, joining_fee={self.joining_fee})>'

    def get_total_monthly_income(self):
        total_monthly_income = {"total": 0, "stats": {}}
        for items in self.items:
            for user in items.users:
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