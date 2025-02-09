from datetime import datetime

from .insure import Insure
from .policy import Policy
from .base import Base
from .join_tables import *
from .claim import Claim
from .item import Item

from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class User(Base):
    __tablename__ = 'user'

    username = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(120), nullable=True)  
    password = db.Column(db.String(80), nullable=True)
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
        # self.validate_length(min_length=4, max_length=80, username=username, password=password)
        # self.unique_constraint_check(username=username, email=email)

        # hashed_password = generate_password_hash(password) 
        self.username = username
        self.email = email
        self.password = password
        self.firstname = firstname
        self.surname = surname


    @classmethod
    def authenticate(cls, username, password):
        user = cls.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return user  
        return None  
        

    def make_claim(self, item_id):
        item = Item.get(id=item_id)
        claim = Claim(user=self, item=item, status="pending")
        claim.save()

        self._update_user_policy_on_item(item)
        return claim
    
    def insure_item(self, item_id):
        item = Item.get(id=item_id)
        policy = item.base_policy
        insure = Insure(self.id, item.id, policy.id)
        insure.save()
        return insure
    

    def _update_user_policy_on_item(self, item):
        insure = Insure.get(user=self, item=item)
        current_policy = insure.policy
        num_of_claims = len(Claim.get_all(user=self, item=item))

        excess_rate = item.excess_rate
        new_excess = num_of_claims * excess_rate

        premium_rate = item.premium_rate
        new_premium = num_of_claims * premium_rate

        current_policy.excess = new_excess
        current_policy.premium = new_premium
        current_policy.update()

    def get_insured_items(self):
        return [x.item for x in Insure.get_all(user=self)]

    def get_policies(self):
        return [x.policy for x in Insure.get_all(user=self)]

    def get_info(self):
        return {
            'username': self.username,
            'email': self.email,
            'firstname': self.firstname,
            'surname': self.surname,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'items_insured': [x.get_info() for x in self.get_insured_items()],
        }
        
        
         

    
    
    
