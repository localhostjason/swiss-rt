from ..db import db
from .enums import *
from .relations import *


class Order(db.Model):
    number = db.Column(db.Integer, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    dinner_time = db.Column(db.String, nullable=False)

    avoid_food = db.Column(db.String(128))  # 设定为忌口
    other_avoid_food = db.Column(db.String(255))  # todo 暂时用不到

    phone = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(32), nullable=False)

    is_completed = db.Column(db.Boolean, default=False)

    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    room = db.relationship('Room', backref=db.backref('order', cascade='all, delete-orphan'))

    # 暂时 去掉 选菜 环节
    # food = db.relationship('Food', secondary=relation_order_food, lazy='subquery',
    #                        backref=db.backref('order', lazy='subquery'))
