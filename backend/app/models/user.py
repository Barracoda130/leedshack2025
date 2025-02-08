from datetime import datetime
from .base import Base
from .join_tables import *

from app import db

class User(Base):
    __tablename__ = 'user'

    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    firstname = db.Column(db.String(80), nullable=True)
    surname = db.Column(db.String(80), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())

    daos = db.relationship('Dao', secondary=user_in_dao, back_populates='users')
    committees = db.relationship('Dao', secondary=user_in_committee, back_populates='committee_members')
    claims = db.relationship('Claim', back_populates='fk_user_id')

    def __repr__(self):
        return f'<User(username={self.username}, email={self.email}, created_at={self.created_at})>'