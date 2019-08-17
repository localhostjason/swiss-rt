from ..db import db
from .enums import *


class Contact(db.Model):
    province = db.Column(db.String(16))
    city = db.Column(db.String(16))
    area = db.Column(db.String(16))
    address = db.Column(db.String(128))
    phone = db.Column(db.String(32))
    zip = db.Column(db.String(32))
    fax = db.Column(db.String(32))
    email = db.Column(db.String(32))

    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)


class Story(db.Model):
    content = db.Column(db.Text)

    type = db.Column(db.Enum(StoryType), default=StoryType.food)

    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    room = db.relationship('Room', backref=db.backref('story', cascade='all, delete-orphan'))

    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)

    img_name = db.Column(db.String(32))
    img_url = db.Column(db.String(32))
    img_path = db.Column(db.String(32))


class Room(db.Model):
    name = db.Column(db.String(68), nullable=False, index=True)

    img_name = db.Column(db.String(32))
    img_url = db.Column(db.String(32))
    img_path = db.Column(db.String(32))

    limit_number = db.Column(db.Integer, default=4)

    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)

    @property
    def can_book(self):
        no_completed_order = [v.id for v in self.order if not v.is_completed]
        return not no_completed_order
