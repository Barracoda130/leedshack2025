from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base

class Item(Base):
    __tablename__ = "item"
    
    name = db.Column(db.String(80), nullable=False)
    new_price = db.Column(db.Float)
    excess_rate = db.Column(db.Float)
    premium_rate = db.Column(db.Float)
    fk_base_policy_id = db.Column(db.Integer, db.ForeignKey("policy.id"))
    fk_dao_id = db.Column(db.Integer, db.ForeignKey("dao.id"))
    
    base_policy = db.relationship("Policy", foreign_keys=[fk_base_policy_id])
    dao = db.relationship("Dao", foreign_keys=[fk_dao_id])


    def __init__(self, name, new_price, excess_rate, premium_rate, base_policy_id=None, dao_id=None):
        self.name = name
        self.new_price = new_price
        self.excess_rate = excess_rate
        self.premium_rate = premium_rate
        self.fk_base_policy_id = base_policy_id
        self.fk_dao_id = dao_id

