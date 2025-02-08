from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base
from .user import User

class Dao(Base):
   __tablename__ = "dao"

   name = db.Column(db.String(80), nullable=False)
   money = db.Column(db.Numeric, nullable=False)

   users = db.relationship('User', secondary='user_in_dao', back_populates='daos')
   committee_members = db.relationship('User', secondary='user_in_committee', back_populates='committees')

   def __init__(self, name, money=0):
      self.name = name
      self.money = money

   def __repr__(self):
      return f'<Dao(name={self.name}, money={self.money})>'

   def add_member(self, user_id):
      user = User.get(id=user_id)
      self.users.append(user)
