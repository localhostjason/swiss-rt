from flask import request, jsonify
from .. import app, db
from api.models.user import User
from ..flask_auth import requires_auth
from .message import *


@app.route('/api/register', methods=['POST'])
def register():
    req_data = request.get_json() or {}

    phone = req_data.get('phone')
    password = req_data.get('password')

    if not phone or not password:
        return jsonify(error_message('用户名或者密码不能为空')), 421

    old_user = User.query.filter_by(phone=phone).first()
    if old_user:
        return jsonify(error_message('用户名已存在')), 421

    user = User(phone=phone, password=password)
    db.session.add(user)
    return jsonify(ok_message())


@app.route('/api/login', methods=['POST'])
def login():
    req_data = request.get_json()

    phone = req_data.get('phone')
    password = req_data.get('password')

    user = User.query.filter_by(phone=phone).first()
    if user and user.verify_password(password):
        token = user.generate_auth_token(expiration=36000).decode('ascii')
        user.token = token
        user.update_time_ip()
        return jsonify(ok_message({'token': token}))

    return jsonify(error_message('用户名或者密码错误')), 421


@app.route('/api/user_info', methods=['get'])
def get_user_info():
    token = request.args.get('token')

    user = User.query.filter_by(token=token).first()
    if not user:
        return jsonify(error_message('没有用户或者token失效')), 421

    return jsonify(ok_message({'data': user.to_dict()}))


@app.route('/api/logout', methods=['POST'])
@requires_auth
def logout():
    req_data = request.get_json() or {}
    token = req_data.get('token')

    user = User.query.filter_by(token=token).first()
    if not user:
        return jsonify(error_message('Token失效')), 421

    user.token = None
    return jsonify(ok_message())
