from enum import Enum


class StoryType(Enum):
    food = '餐厅故事'
    room = '房间故事'


class SpicyType(Enum):
    low = '微辣'
    normal = '中辣'
    high = '非常辣'


class LanguageType(Enum):
    zh = '中文'
    en = '英文'
    gm = '德语'


class FoodType(Enum):
    chives = '荤菜'
    vegetarian = '素菜'


class OrderType(Enum):
    completed = '已完成'
    confirmed = '待确认'
    cancel = '已取消'
