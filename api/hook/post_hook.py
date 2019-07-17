from .user import UserHook
from .picture import PictureHook
from api.common.utils import *


def after_delete_news(item):
    if item.get('img_path'):
        remove_file(item['img_path'])


def after_delete_room(item):
    if item.get('img_path'):
        remove_file(item['img_path'])


def after_delete_food(item):
    if item.get('img_path'):
        remove_file(item['img_path'])


class PostHook:
    @staticmethod
    def init_app(app):
        app.on_deleted_item_news += after_delete_news
        app.on_deleted_item_room += after_delete_room
        app.on_deleted_item_food += after_delete_food

        UserHook.init_post(app)
        PictureHook.init_post(app)
