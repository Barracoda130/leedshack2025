from app import db
from .base import Base

class Insure(Base):
    fk_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    fk_item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    fk_policy_id = db.Column(db.Integer, db.ForeignKey('policy.id'), nullable=False)

    user = db.relationship('User', foreign_keys=[fk_user_id])
    item = db.relationship('Item', foreign_keys=[fk_item_id])
    policy = db.relationship('Policy', foreign_keys=[fk_policy_id])

    def __init__(self, user_id, item_id, policy_id):
        self.fk_user_id = user_id
        self.fk_item_id = item_id
        self.fk_policy_id = policy_id