from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base


class Policy(Base):
    __tablename__ = 'policy'

    excess = db.Column(db.Float, nullable=False)
    premium = db.Column(db.Float, nullable=False)
