from flask import jsonify
from .. import app
from api.models import *
from .message import *


@app.route('/api/dash')
def dash():
    language = request.args.get('language')

    picture_query = Picture.query
    if language:
        picture_query = picture_query.filter_by(language=language)

    picture = picture_query.all()
    return jsonify(ok_message({'data': [v.to_dict(
        extra_dict={'time': v.time.strftime('%Y-%m-%d %H:%M:%S')},
        remove_key=['img_path']
    ) for v in picture]}))


@app.route('/api/rooms')
def room():
    language = request.args.get('language')
    room_query = Room.query
    if language:
        room_query = room_query.filter_by(language=language)

    _room = room_query.all()

    return jsonify(ok_message({'data': [v.to_dict() for v in _room]}))


@app.route('/api/foods')
def food():
    language = request.args.get('language')
    types = request.args.getlist('type', [])
    food_query = Food.query
    if language:
        food_query = food_query.filter_by(language=language)
    if types:
        food_query = food_query.filter(Food.type.in_(types))

    foods = food_query.all()
    return jsonify(ok_message({'data': [v.to_dict() for v in foods]}))


@app.route('/api/contact/info')
def contact():
    language = request.args.get('language')
    contact_query = Contact.query
    if language:
        contact_query = contact_query.filter_by(language=language)

    contact_info = contact_query.first()
    return jsonify(ok_message({'data': contact_info.to_dict() if contact_info else None}))


@app.route('/api/story/info')
def story():
    language = request.args.get('language')
    story_type = request.args.get('type')

    story_query = Story.query
    if language:
        story_query = story_query.filter_by(language=language)
    if story_type:
        story_query = story_query.filter_by(type=story_type)

    story_list = story_query.all()
    return jsonify(ok_message({'data': [v.to_dict() for v in story_list]}))


@app.route('/api/order/create', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data.get('room_id'):
        return jsonify(error_message('请填写房间号')), 421

    if not data.get('number'):
        return jsonify(error_message('请填写用餐人数')), 421

    if not data.get('budget'):
        return jsonify(error_message('请填写人均预算')), 421

    if not data.get('dinner_time'):
        return jsonify(error_message('请填写用餐时间')), 421

    if not data.get('phone'):
        return jsonify(error_message('请填写手机号')), 421

    if not data.get('email'):
        return jsonify(error_message('请填写电子邮件')), 421

    old_order = Order.query.filter_by(phone=data['phone'], is_completed=False).first()
    if old_order:
        return jsonify(error_message('你刚刚已预约过了')), 421

    order_info = Order(**data)
    db.session.add(order_info)
    db.session.flush()
    return jsonify(ok_message({'data': order_info.to_dict()}))
