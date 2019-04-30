from api.models.user import *


def insert_admin():
    admin = User(username='admin')
    admin.password = '123'
    admin.is_admin = True
    db.session.add(admin)
    db.session.commit()
