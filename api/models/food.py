from ..db import db
from .enums import *


class Food(db.Model):
    name = db.Column(db.String(64), unique=True, index=True)
    desc = db.Column(db.String(128))

    food_type = db.Column(db.Enum(FoodType), default=FoodType.chives)
