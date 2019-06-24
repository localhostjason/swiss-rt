from enum import Enum


class UserType(Enum):
    front = '前端用户'
    admin = '后端用户'


class StoryType(Enum):
    food = '餐厅故事'
    room = '房间故事'


class LanguageType(Enum):
    zh = '中文'
    en = '英文'
    gm = '德语'


class PictureType(Enum):
    dash = '首页'
    food = '食品'
