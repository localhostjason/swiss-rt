from ..db import db
from .enums import *


class News(db.Model):
    title = db.Column(db.String(64), index=True)
    time = db.Column(db.String(32))

    desc = db.Column(db.Text)

    detail = db.Column(db.Text)

    img_name = db.Column(db.String(32))
    img_url = db.Column(db.String(32))
    img_path = db.Column(db.String(32))

    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)
