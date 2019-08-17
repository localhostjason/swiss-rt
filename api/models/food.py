from ..db import db
from .enums import *


class Food(db.Model):
    name = db.Column(db.String(64), index=True)
    desc = db.Column(db.String(128))
    price = db.Column(db.Float)

    # 商品单位
    price_unit = db.Column(db.String(64))

    is_show_dash = db.Column(db.Boolean, default=False)

    type = db.Column(db.Enum(FoodType), default=FoodType.chives)

    img_name = db.Column(db.String(32))
    img_url = db.Column(db.String(32))
    img_path = db.Column(db.String(32))

    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)

    @property
    def type_value(self):
        return self.type.value
