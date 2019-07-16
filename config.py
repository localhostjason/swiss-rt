# -*- coding:utf8 -*-
import os
import json

MY_ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
MY_UPLOAD_DASH_DIR = os.path.join(MY_ROOT_DIR, 'static', 'upload', 'dash')
MY_UPLOAD_ROOM_DIR = os.path.join(MY_ROOT_DIR, 'static', 'upload', 'room')

if not os.path.exists(MY_UPLOAD_DASH_DIR):
    os.makedirs(MY_UPLOAD_DASH_DIR)

if not os.path.exists(MY_UPLOAD_ROOM_DIR):
    os.makedirs(MY_UPLOAD_ROOM_DIR)


class ReadConfigJson(object):

    @staticmethod
    def __read_db_json():
        db_config = os.path.join(MY_ROOT_DIR, 'config.json')

        with open(db_config, encoding='utf-8') as f:
            data = f.read()
            data = json.loads(data)
        return data

    def get_mysql_config(self):
        mysql_dict = self.__read_db_json()['mysql']
        mysql_url = 'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8'.format(
            user=mysql_dict['user'],
            password=mysql_dict['password'],
            host=mysql_dict['host'],
            port=mysql_dict['port'],
            database=mysql_dict['database'])

        return mysql_url

    @staticmethod
    def get_sqlite_config():
        sqlite_db_dir = os.path.join(MY_ROOT_DIR, 'db')
        try:
            os.makedirs(sqlite_db_dir)
        except:
            pass

        return 'sqlite:///{}'.format(os.path.join(sqlite_db_dir, 'data.db'))


class Config:
    SECRET_KEY = 'Swiss Rt'

    SQLALCHEMY_DATABASE_URI = ReadConfigJson().get_sqlite_config()
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    MY_UPLOAD_DASH_DIR = MY_UPLOAD_DASH_DIR
    MY_UPLOAD_ROOM_DIR = MY_UPLOAD_ROOM_DIR
    PRE_UPLOAD_PATH = '/upload'
