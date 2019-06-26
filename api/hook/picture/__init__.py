from .post import *
from .extra import *
from .pre import *


class PictureHook:
    @staticmethod
    def init_extra(app):
        pass

    @staticmethod
    def init_post(app):
        app.on_deleted_item_picture += after_delete_picture

    @staticmethod
    def init_pre(app):
        pass
