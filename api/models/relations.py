from ..db import db

# many to many relations

relation_order_food = db.Table(
    'relation_order_food',
    db.Column('order_id', db.Integer, db.ForeignKey('order.id'), primary_key=True),
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), primary_key=True)
)

relation_order_room = db.Table(
    'relation_order_room',
    db.Column('order_id', db.Integer, db.ForeignKey('order.id'), primary_key=True),
    db.Column('room_id', db.Integer, db.ForeignKey('room.id'), primary_key=True)
)
