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

    room_desc = db.Column(db.String(128))

    # 暂时 去掉 选菜 环节
    food = db.relationship('Food', secondary=relation_order_food, lazy='subquery',
                           backref=db.backref('order', lazy='subquery'))

    @classmethod
    def can_order_today(cls, room_id, dinner_time, room_desc):
        order = cls.query.filter(
            cls.is_completed.is_(False)
        ).group_by(
            func.strftime("%Y-%m-%d", cls.dinner_time)
        ).having(
            func.strftime("%Y-%m-%d", cls.dinner_time) == dinner_time
        ).first()

        rooms = []
        _rd = []
        if order:
            rooms = [v.id for v in order.room] if order.room else []
            _rd = order.room_desc.split(',') if order.room_desc else []

        room_d = []
        if room_desc:
            room_d = room_desc.split(',')

        un_room = list(set(room_id) & set(rooms))

        un_room_desc = list(set(_rd) & set(room_d))

        if room_desc:
            r = un_room and un_room_desc
        else:
            r = un_room

        return not r, un_room, ','.join(un_room_desc)

    def to_json(self):
        d = self.to_dict()
        d['room'] = [v.id for v in self.room] if self.room else []
        d['food'] = [v.id for v in self.food] if self.food else []
        return d
