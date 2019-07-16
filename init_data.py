from api.models import *


def insert_admin():
    admin = User(username='admin')
    admin.password = '123'
    admin.is_admin = True
    db.session.add(admin)
    db.session.commit()


def insert_room():
    result = []
    for v in ['西安房', '兰州房', '北京房', '乌鲁木齐房']:
        result.append(Room(name=v))
    db.session.add_all(result)
    db.session.commit()
