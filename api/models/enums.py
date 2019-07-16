from enum import Enum


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


class FoodType(Enum):
    chives = '荤菜'
    vegetarian = '素菜'

    chives_garnish = '荤类配菜'
    vegetarian_garnish = '素类配菜'


class OrderType(Enum):
    completed = '已完成'
    confirmed = '待确认'
    cancel = '已取消'
