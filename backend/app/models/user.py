from datetime import datetime

from backend.app.models.insure import Insure
from backend.app.models.policy import Policy
from .base import Base
from .join_tables import *
from .claim import Claim
from .item import Item

from werkzeug.security import generate_password_hash
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
    claims = db.relationship('Claim', back_populates='user')

    def __repr__(self):
        return f'<User(username={self.username}, email={self.email}, created_at={self.created_at})>'
    

    def __init__(self, username, email, password, firstname, surname):
        self.validate_length(min_length=4, max_length=80, username=username, password=password)
        
        hashed_password = generate_password_hash(password) 
        self.username = username
        self.email = email
        self.password = hashed_password
        self.firstname = firstname
        self.surname = surname

    def make_claim(self, item_id, status):
        item = Item.get(id=item_id)
        claim = Claim(user=self, item=item, status=status)
        claim.save()

        self._update_user_policy_on_item(item)
        return claim
    
    def insure_item(self, item_id):
        item = Item.get(id=item_id)
        policy = item.base_policy
        insure = Insure(user=self, item=item, policy=policy)
        insure.save()
        return insure
    

    def _update_user_policy_on_item(self, item):
        insure = Insure.get(user=self, item=item)
        current_policy = insure.policy
        num_of_claims = len(Claim.get_all(user=self, item=item))

        excess_rate = item.excess_rate
        new_excess = num_of_claims * excess_rate

        new_policy = Policy(excess=new_excess, premium=current_policy.premium)
        
        insure.policy = new_policy
        insure.save()
         

    
    
    
