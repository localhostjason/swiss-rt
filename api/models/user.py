from ..db import db
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app, request
from datetime import datetime
from .enums import UserType


class Role(db.Model):
    """
    权限列表，记录admin 后台 用户权限
    """
    key = db.Column(db.String(64), unique=True, index=True)
    name = db.Column(db.String(64), unique=True, index=True)
    routes = db.Column(db.Text)
    routes_map = db.Column(db.Text)
    desc = db.Column(db.String(1024))


class User(db.Model):
    username = db.Column(db.String(64), unique=True, index=True)
    _password = db.Column(db.String(128))
    token = db.Column(db.String(256))

    # 是否是后台admin用户
    is_admin = db.Column(db.Boolean, default=False)

    phone = db.Column(db.String(11), index=True)

    login_time = db.Column(db.DateTime)
    login_ip = db.Column(db.String(16))

    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship('Role', backref=db.backref('user'))

    desc = db.Column(db.Text)

    @property
    def password(self):
        raise AttributeError('password not readable')

    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self._password, password)

    def generate_auth_token(self, expiration):
        s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)

        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])

        try:
            data = s.loads(token)
        except:
            return None
        return User.query.get(data['id'])

    def update_time_ip(self):
        self.login_time = datetime.now()
        self.login_ip = request.remote_addr
