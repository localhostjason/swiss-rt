from flask import redirect, request, jsonify
from werkzeug.utils import secure_filename
import os
from .. import app
from api.flask_auth import requires_auth
from api.common.utils import allowed_file, check_contain_chinese, del_os_filename
from api.frontEnd.message import *
from api.models import *


@app.route('/api/import/img', methods=['POST'])
@requires_auth
def import_img():
    # file id 存在 上传，否则编辑
    file_id = request.args.get('id')
    file_type = request.args.get('file_type', 'dash')
    language = request.args.get('language', 'zh')

    upload_dir = app.config['MY_UPLOAD_DASH_DIR']

    file = request.files['file']
    if not file or not allowed_file(file.filename):
        return jsonify(error_message('文件不存在，或者文件格式不对')), 421
    filename = secure_filename(file.filename) if not check_contain_chinese(file.filename) else file.filename

    path = os.path.join(upload_dir, filename)
    url = '{}/{}/{}'.format(app.config['PRE_UPLOAD_PATH'], file_type, filename)

    if file_id:
        old_img = Picture.query.get_or_404(file_id)
        del_os_filename(upload_dir, old_img.img_name)

        old_img.img_name = filename
        old_img.img_url = url
        old_img.img_path = path
    else:
        img = Picture(img_name=filename,
                      language=language,
                      img_url=url,
                      img_path=path)
        db.session.add(img)

    file.save(path)
    return jsonify(ok_message())


@app.route('/api/import/room/img', methods=['POST'])
@requires_auth
def import_room_img():
    # file id 存在 上传，否则编辑
    room_id = request.args.get('id')
    file_type = request.args.get('file_type', 'dash')

    upload_dir = app.config['MY_UPLOAD_ROOM_DIR']

    if not room_id:
        return jsonify(error_message('房间iD不存在')), 421

    file = request.files['file']
    if not file or not allowed_file(file.filename):
        return jsonify(error_message('文件不存在，或者文件格式不对')), 421
    filename = secure_filename(file.filename) if not check_contain_chinese(file.filename) else file.filename

    path = os.path.join(upload_dir, filename)
    url = '{}/{}/{}'.format(app.config['PRE_UPLOAD_PATH'], file_type, filename)

    old_room = Room.query.filter_by(id=room_id).first()
    if not old_room:
        return jsonify(error_message('房间iD不存在')), 421

    del_os_filename(upload_dir, old_room.img_name)

    old_room.img_name = filename
    old_room.img_url = url
    old_room.img_path = path

    file.save(path)
    return jsonify(ok_message())


@app.route('/api/import/food/img', methods=['POST'])
@requires_auth
def import_food_img():
    food_id = request.args.get('id')
    file_type = request.args.get('file_type', 'food')

    upload_dir = app.config['MY_UPLOAD_FOOD_DIR']

    if not food_id:
        return jsonify(error_message('菜品iD不存在')), 421

    file = request.files['file']
    if not file or not allowed_file(file.filename):
        return jsonify(error_message('文件不存在，或者文件格式不对')), 421
    filename = secure_filename(file.filename) if not check_contain_chinese(file.filename) else file.filename

    path = os.path.join(upload_dir, filename)
    url = '{}/{}/{}'.format(app.config['PRE_UPLOAD_PATH'], file_type, filename)

    old_food = Food.query.filter_by(id=food_id).first()
    if not old_food:
        return jsonify(error_message('菜品iD不存在')), 421

    del_os_filename(upload_dir, old_food.img_name)

    old_food.img_name = filename
    old_food.img_url = url
    old_food.img_path = path

    file.save(path)
    return jsonify(ok_message())


@app.route('/api/import/news/img', methods=['POST'])
@requires_auth
def import_news_img():
    news_id = request.args.get('id')
    file_type = request.args.get('file_type', 'news')

    upload_dir = app.config['MY_UPLOAD_NEWS_DIR']

    if not news_id:
        return jsonify(error_message('新闻资讯iD不存在')), 421

    file = request.files['file']
    if not file or not allowed_file(file.filename):
        return jsonify(error_message('文件不存在，或者文件格式不对')), 421
    filename = secure_filename(file.filename) if not check_contain_chinese(file.filename) else file.filename

    path = os.path.join(upload_dir, filename)
    url = '{}/{}/{}'.format(app.config['PRE_UPLOAD_PATH'], file_type, filename)

    old_news = News.query.filter_by(id=news_id).first()
    if not old_news:
        return jsonify(error_message('新闻资讯iD不存在')), 421

    del_os_filename(upload_dir, old_news.img_name)

    old_news.img_name = filename
    old_news.img_url = url
    old_news.img_path = path

    file.save(path)
    return jsonify(ok_message())


@app.route('/api/import/story/img', methods=['POST'])
@requires_auth
def import_story_img():
    story_id = request.args.get('id')
    file_type = request.args.get('file_type', 'story')

    upload_dir = app.config['MY_UPLOAD_STORY_DIR']

    if not story_id:
        return jsonify(error_message('故事ID不存在')), 421

    file = request.files['file']
    if not file or not allowed_file(file.filename):
        return jsonify(error_message('文件不存在，或者文件格式不对')), 421
    filename = secure_filename(file.filename) if not check_contain_chinese(file.filename) else file.filename

    path = os.path.join(upload_dir, filename)
    url = '{}/{}/{}'.format(app.config['PRE_UPLOAD_PATH'], file_type, filename)

    old_story = Story.query.filter_by(id=story_id).first()
    if not old_story:
        return jsonify(error_message('故事ID不存在')), 421

    del_os_filename(upload_dir, old_story.img_name)

    old_story.img_name = filename
    old_story.img_url = url
    old_story.img_path = path

    file.save(path)
    return jsonify(ok_message())
