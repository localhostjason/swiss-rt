from ..db import db
from .enums import *
from .relations import *


class Order(db.Model):
    number = db.Column(db.Integer, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    dinner_time = db.Column(db.DateTime, nullable=False)

    avoid_food = db.Column(db.String(128))
    other_avoid_food = db.Column(db.String(255))

    phone = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(32), nullable=False)

    type = db.Column(db.Enum(OrderType), default=OrderType.confirmed)

    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    room = db.relationship('Room', backref=db.backref('order', cascade='all, delete-orphan'))

    food = db.relationship('Food', secondary=relation_order_food, lazy='subquery',
                           backref=db.backref('order', lazy='subquery'))
