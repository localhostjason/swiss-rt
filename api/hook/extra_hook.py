from .user import UserHook
from .picture import PictureHook
from ..models import *


def hook_add_extra_food_item(item):
    _food = Food.query.get(item['id'])
    item['type_value'] = _food.type_value


def hook_add_extra_resource_food(response):
    for item in response['_items']:
        hook_add_extra_food_item(item)


class ExtraHook:
    @staticmethod
    def init_app(app):
        app.on_fetched_resource_food += hook_add_extra_resource_food

        UserHook.init_extra(app)
        PictureHook.init_extra(app)
