from ..db import db


class Contact(db.Model):
    province = db.Column(db.String(16))
    city = db.Column(db.String(16))
    area = db.Column(db.String(16))
    address = db.Column(db.String(128))
    phone = db.Column(db.String(32))
    zip = db.Column(db.String(32))
    fax = db.Column(db.String(32))
    email = db.Column(db.String(32))
