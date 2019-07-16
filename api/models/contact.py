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
    language = db.Column(db.Enum(LanguageType), default=LanguageType.zh)


class Room(db.Model):
    number = db.Column(db.Integer, default=4)
    name = db.Column(db.String(68), unique=True, nullable=False, index=True)

    story_id = db.Column(db.Integer, db.ForeignKey('story.id'))
    story = db.relationship('Story', backref=db.backref('room', uselist=False, cascade='all, delete-orphan'))
