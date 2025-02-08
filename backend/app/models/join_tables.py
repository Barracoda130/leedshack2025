from app import db

insures = db.Table('insures', db.Model.metadata,
                   db.Column('fk_user', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                   db.Column('fk_item', db.Integer, db.ForeignKey('item.id'), primary_key=True),
                   db.Column('fk_policy', db.Integer, db.ForeignKey('policy.id'), primary_key=True))

user_in_dao = db.Table('user_in_dao', db.Model.metadata,
                       db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                       db.Column('dao_id', db.Integer, db.ForeignKey('dao.id'), primary_key=True))

user_in_committee = db.Table('user_in_committee', db.Model.metadata,
                            db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                            db.Column('dao_id', db.Integer, db.ForeignKey('dao.id'), primary_key=True))
