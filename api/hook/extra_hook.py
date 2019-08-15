from .user import UserHook
from .picture import PictureHook
from ..models import *


def hook_add_extra_food_item(item):
    _food = Food.query.get(item['id'])
    item['type_value'] = _food.type_value


def hook_add_extra_resource_food(response):
    for item in response['_items']:
        hook_add_extra_food_item(item)


def hook_add_extra_room_item(item):
    _room = Room.query.get(item['id'])
    item['can_book'] = _room.can_book


def hook_add_extra_resource_room(response):
    for item in response['_items']:
        hook_add_extra_room_item(item)


class ExtraHook:
    @staticmethod
    def init_app(app):
        app.on_fetched_resource_food += hook_add_extra_resource_food
        app.on_fetched_resource_room += hook_add_extra_resource_room

        UserHook.init_extra(app)
        PictureHook.init_extra(app)
