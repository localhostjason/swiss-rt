from .user import UserHook
from .picture import PictureHook


class PostHook:
    @staticmethod
    def init_app(app):
        UserHook.init_post(app)
        PictureHook.init_post(app)
