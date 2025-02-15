from flask_sqlalchemy import SQLAlchemy

from app import db

class Base(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    @classmethod
    def get(cls, **kwargs):
        result = cls.query.filter_by(**kwargs).first()
        if result is None:
            raise ValueError(f'{cls.__name__} not found')
        
        return result
    
    @classmethod
    def get_all(cls, **kwargs):
        result = cls.query.filter_by(**kwargs).all()
        if result is None:
            raise ValueError(f'{cls.__name__} not found')
        
        return result
    
    def validate_length(self, min_length, max_length, **kwargs):
        for field, value in kwargs.items():
            if not (min_length <= len(value) <= max_length):
                raise ValueError(f'{field} must be between {min_length} and {max_length} characters long')
            
    def unique_constraint_check(self, **kwargs):
        for field, value in kwargs.items():
            if self.query.filter_by(**{field: value}).first():
                raise ValueError(f'{field} already exists')