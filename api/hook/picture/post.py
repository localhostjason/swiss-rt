from api.common.utils import *


def after_delete_picture(item):
    if item.get('img_path'):
        remove_file(item['img_path'])
