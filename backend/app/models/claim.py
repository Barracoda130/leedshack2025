from .base import Base

from app import db

class Claim(Base):
    __tablename__ = 'claim'
    
    fk_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    fk_item = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    status = db.Column(db.String(80), nullable=False)