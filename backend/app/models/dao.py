from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base

class Dao(Base):
   __tablename__ = "dao"
   pass