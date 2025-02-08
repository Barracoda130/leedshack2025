from .base import Base

from app import db

class Claim(Base):
    __tablename__ = 'claim'
    
    fk_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    fk_item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    status = db.Column(db.String(80))

    user = db.relationship('User', foreign_keys=[fk_user_id])
    item = db.relationship('Item', foreign_keys=[fk_item_id])
    
    def __init__(self, user, item, status):
        self.user = user
        self.item = item
        self.status = status