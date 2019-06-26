from .user import UserHook
from .picture import PictureHook


class ExtraHook:
    @staticmethod
    def init_app(app):
        UserHook.init_extra(app)
        PictureHook.init_extra(app)
