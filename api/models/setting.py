from datetime import datetime

from ..db import db
from .enums import *


class Picture(db.Model):
    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)
    img_name = db.Column(db.String(32))
    img_url = db.Column(db.String(32))
    img_path = db.Column(db.String(32))
    time = db.Column(db.DateTime, default=datetime.now)

    type = db.Column(db.Enum(PictureType), default=PictureType.dash)


@db.event.listens_for(Picture, 'before_insert')
def pre_time(mapper, connection, target):
    target.time = datetime.now()
