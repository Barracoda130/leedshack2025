from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base

class Item(Base):
    __tablename__ = "item"
    
    name = db.Column(db.String(80), nullable=False)
    new_price = db.Column(db.Float)
    fk_base_policy_id = db.Column(db.Integer, db.ForeignKey("base_policy.id"))
    fk_dao_id = db.Column(db.Integer, db.ForeignKey("dao.id"))
    
    base_policy = db.relationship("BasePolicy", foreign_keys=[fk_base_policy_id])
    dao = db.relationship("Dao", foreign_keys=[fk_dao_id])
