from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base

class Dao(Base):
   __tablename__ = "dao"

   users = db.relationship('User', secondary='user_in_dao', back_populates='daos')
   committee_members = db.relationship('User', secondary='user_in_committee', back_populates='committees')