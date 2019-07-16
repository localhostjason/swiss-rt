from flask import request, jsonify
from .. import app
from api.models import *
from ..flask_auth import requires_auth
from .message import *


@app.route('/api/dash')
def dash():
    language = request.args.get('language')

    picture_query = Picture.query
    if language:
        picture_query.filter_by(language=language).all()

    picture = Picture.query.all()
    return jsonify(ok_message({'data': [v.to_dict(
        extra_dict={'time': v.time.strftime('%Y-%m-%d %H:%M:%S')},
        remove_key=['img_path']
    ) for v in picture]}))
