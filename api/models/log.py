from ..db import db
import json
from bson import json_util


class OpLog(db.Model):
    __tablename__ = 'oplog'
    r = db.Column(db.String(32))
    o = db.Column(db.String(16))
    i = db.Column(db.Integer)
    ip = db.Column(db.String(45))
    u = db.Column(db.String(4096))
    c = db.Column(db.String(4096))


@db.event.listens_for(OpLog, 'before_insert')
def receive_before_insert(mapper, connection, target):
    if not target.c:
        return

    d = dict()
    for k, v in target.c.items():
        try:
            d[k] = v.name
        except Exception as e:
            # print(e)
            d[k] = v

    target.c = json.dumps(d, default=json_util.default)

#     json.loads(aJsonString, object_hook=json_util.object_hook)
