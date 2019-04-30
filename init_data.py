from api.models.user import *
from api.models.contact import *


def insert_admin():
    admin = User(username='admin')
    admin.password = '123'
    admin.is_admin = True
    db.session.add(admin)
    db.session.commit()


def insert_contact():
    contact = Contact(id=1)
    db.session.add(contact)
    db.session.commit()
