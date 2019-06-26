from flask import redirect, request, jsonify
from werkzeug.utils import secure_filename
import os
from .. import app, db
from api.flask_auth import requires_auth
from api.common.utils import allowed_file, check_contain_chinese, del_os_filename
from api.frontEnd.message import *
from api.models.setting import Picture


@app.route('/api/import/img', methods=['POST'])
@requires_auth
def import_img():
    # file id 存在 上传，否则编辑
    file_id = request.args.get('file_id')
    file_type = request.args.get('file_type', 'dash')
    language = request.args.get('language', 'zh')

    upload_dir = app.config['MY_UPLOAD_DIR']

    file = request.files['file']
    if not file or not allowed_file(file.filename):
        return jsonify(error_message('文件不存在，或者文件格式不对')), 421
    filename = secure_filename(file.filename) if not check_contain_chinese(file.filename) else file.filename

    path = os.path.join(upload_dir, filename)
    url = '{}/{}/{}'.format(app.config['PRE_UPLOAD_PATH'], 'dash_img' if file_type == 'dash' else 'food', filename)

    if file_id:
        old_img = Picture.query.get_or_404(file_id)
        del_os_filename(upload_dir, old_img.img_name)

        old_img.img_url = url
        old_img.img_path = path
    else:
        img = Picture(img_name=filename,
                      language=language,
                      img_url=url,
                      img_path=path,
                      type=file_type)
        db.session.add(img)

    file.save(path)
    return jsonify(ok_message())
