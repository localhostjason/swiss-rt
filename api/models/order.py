from ..db import db
from .enums import *
from .relations import *
from sqlalchemy import func


class Order(db.Model):
    number = db.Column(db.Integer, nullable=False)
    budget = db.Column(db.Float, nullable=False)
    dinner_time = db.Column(db.String, nullable=False)

    # 辣味接受度
    spicy = db.Column(db.Enum(SpicyType))

    avoid_food = db.Column(db.String(128))  # 设定为忌口
    other_avoid_food = db.Column(db.String(255))  # todo 暂时用不到

    phone = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(32), nullable=False)

    is_completed = db.Column(db.Boolean, default=False)
    is_noticed = db.Column(db.Boolean, default=False)

    # room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    # room = db.relationship('Room', backref=db.backref('order', cascade='all, delete-orphan'))

    room = db.relationship('Room', secondary=relation_order_room, lazy='subquery',
                           backref=db.backref('order', lazy='subquery'))

    # 暂时 去掉 选菜 环节
    # food = db.relationship('Food', secondary=relation_order_food, lazy='subquery',
    #                        backref=db.backref('order', lazy='subquery'))

    @classmethod
    def can_order_today(cls, room_id, dinner_time):
        order = cls.query.filter(
            cls.is_completed.is_(False)
        ).group_by(
            func.strftime("%Y-%m-%d", cls.dinner_time)
        ).having(
            func.strftime("%Y-%m-%d", cls.dinner_time) == dinner_time
        ).first()
        rooms = []
        if order:
            rooms = [v.id for v in order.room]

        un_room = list(set(room_id) & set(rooms))
        return not un_room, un_room

    def to_json(self):
        d = self.to_dict()
        d['room'] = [v.id for v in self.room]
        return d
