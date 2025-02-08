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
        """
        >>> User.get(id=1)

        Returns:
            _type_: _description_
        """
        return cls.query.filter_by(**kwargs).first()
    
    