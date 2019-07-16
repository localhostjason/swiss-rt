from ..db import db

# many to many relations

relation_order_food = db.Table(
    'relation_order_food',
    db.Column('order_id', db.Integer, db.ForeignKey('order.id'), primary_key=True),
    db.Column('food_id', db.Integer, db.ForeignKey('food.id'), primary_key=True)
)
