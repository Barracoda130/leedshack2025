from app import db

user_in_dao = db.Table('user_in_dao', db.Model.metadata,
                       db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                       db.Column('dao_id', db.Integer, db.ForeignKey('dao.id'), primary_key=True))

user_in_committee = db.Table('user_in_committee', db.Model.metadata,
                            db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                            db.Column('dao_id', db.Integer, db.ForeignKey('dao.id'), primary_key=True))
