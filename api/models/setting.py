from ..db import db


class Setting(db.Model):
    """
    name: setting -> 基础设置
    """
    name = db.Column(db.String(68))
    value = db.Column(db.Text)
