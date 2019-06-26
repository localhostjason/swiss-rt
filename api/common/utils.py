from flask_uploads import IMAGES
import os
from config import Config
import json


def del_os_filename(base_path, filename):
    for root, dirs, files in os.walk(base_path, topdown=False):
        for name in files:
            if filename and filename == name:
                os.remove(os.path.join(root, name))


def remove_file(my_file):
    if os.path.exists(my_file):
        os.remove(my_file)
    else:
        print('no such file:%s' % my_file)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in IMAGES


def check_contain_chinese(check_str):
    for ch in check_str:
        if u'\u4e00' <= ch <= u'\u9fff':
            return True
    return False
