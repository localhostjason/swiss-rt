from ..db import db
from .enums import *


class Food(db.Model):
    name = db.Column(db.String(64), unique=True, index=True)
    desc = db.Column(db.String(128))
    price = db.Column(db.Float)

    type = db.Column(db.Enum(FoodType), default=FoodType.chives)

    img_name = db.Column(db.String(32))
    img_url = db.Column(db.String(32))
    img_path = db.Column(db.String(32))

    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)
