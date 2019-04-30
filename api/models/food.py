from ..db import db


class FoodType(db.Model):
    __tablename__ = 'food_type'
    name = db.Column(db.String(64), unique=True, index=True)
    desc = db.Column(db.String(128))


class Food(db.Model):
    name = db.Column(db.String(64), unique=True, index=True)
    desc = db.Column(db.String(128))

    food_type_id = db.Column(db.Integer, db.ForeignKey('food_type.id'))
    food_type = db.relationship('FoodType', backref=db.backref('food', cascade='all, delete-orphan'))
