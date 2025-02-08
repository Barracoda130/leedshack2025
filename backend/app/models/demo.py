from flask_sqlalchemy import SQLAlchemy

from app import db
from .base import Base


class Demo(Base):
    __tablename__ = 'demos'
    
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)

    def __init__(self, name, description=None):
        self.name = name
        self.description = description

    def __repr__(self):
        return f'<Demo {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }