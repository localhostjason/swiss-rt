from enum import Enum


class UserType(Enum):
    front = '前端用户'
    admin = '后端用户'


class StoryType(Enum):
    food = '餐厅故事'
    room = '房间故事'
