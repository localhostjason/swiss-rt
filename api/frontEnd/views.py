from .. import app
from api.models import *
from .message import *

from flask import jsonify, request
from datetime import datetime


def check_time(time_):
    r = True
    try:
        datetime.strptime(time_, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        r = False
    return r


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

    # print([v.to_dict() for v in _room])
    return jsonify(ok_message({'data': [v.to_dict(remove_key=['order']) for v in _room]}))


@app.route('/api/foods')
def food():
    language = request.args.get('language')
    types = [v for v in request.args.getlist('type') if v]
    food_query = Food.query
    if language:
        food_query = food_query.filter_by(language=language)
    if types:
        food_query = food_query.filter(Food.type.in_(types))

    foods = food_query.all()
    return jsonify(ok_message({'data': [v.to_dict() for v in foods]}))


@app.route('/api/foods/dash')
def food_dash():
    language = request.args.get('language')

    food_query = Food.query.filter(Food.type.in_(['chives', 'vegetarian']), Food.is_show_dash.is_(True))
    if language:
        food_query = food_query.filter_by(language=language)

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

    result = []
    if story_list:
        for v in story_list:
            info = v.to_dict()
            info['room_name'] = v.room.name if v.room else None
            info['_type'] = v.type.name
            if v.type.name == 'room':
                info['can_book'] = v.room.can_book if v.room else False
            result.append(info)

    return jsonify(ok_message({'data': result}))


@app.route('/api/news/info')
def news():
    language = request.args.get('language')

    news_query = News.query
    if language:
        news_query = news_query.filter_by(language=language)

    news_list = news_query.all()
    return jsonify(ok_message({'data': [v.to_dict() for v in news_list]}))


@app.route('/api/order/create', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data.get('room_id'):
        return jsonify(error_message('请选择房间号')), 421

    if not data.get('number'):
        return jsonify(error_message('请填写用餐人数')), 421

    if not data.get('budget'):
        return jsonify(error_message('请填写人均预算')), 421

    if not data.get('dinner_time'):
        return jsonify(error_message('请填写用餐时间')), 421

    if not check_time(data['dinner_time']):
        return jsonify(error_message('用餐时间格式不对')), 421

    if not data.get('phone'):
        return jsonify(error_message('请填写手机号')), 421

    if not data.get('email'):
        return jsonify(error_message('请填写电子邮件')), 421

    old_order = Order.query.filter_by(phone=data['phone'], is_completed=False, dinner_time=data['dinner_time']).first()
    if old_order:
        return jsonify(error_message('你刚刚已预约过了')), 421

    room_id = data['room_id']
    rooms = Room.query.filter(Room.id.in_(room_id)).all()

    food_id = data.get('taboo_food_id')
    foods = []
    if food_id:
        foods = Food.query.filter(Food.id.in_(food_id)).all()

    room_desc = data.get('room_desc')
    can_order, un_room, un_desc = Order.can_order_today(data['room_id'], data['dinner_time'].split()[0], room_desc)
    if not can_order:
        un_room = Room.query.get(un_room)
        if un_desc:
            return jsonify(error_message(f'房间 [{un_room.name}] [{un_desc}]卓今天已经被预定了，请预约其他日期')), 421
        return jsonify(error_message(f'房间 [{un_room.name}] 今天已经被预定了，请预约其他日期')), 421

    del data['room_id']
    if foods:
        del data['taboo_food_id']
    if not data.get('spicy'):
        try:
            del data['spicy']
        except:
            pass

    order_info = Order(**data)
    db.session.add(order_info)
    db.session.flush()

    order_info.room = rooms

    if foods:
        order_info.food = foods
    return jsonify(ok_message({'data': order_info.to_json()}))
