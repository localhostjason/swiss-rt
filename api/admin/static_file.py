from flask import redirect
from .. import app


@app.route('/')
def index():
    return redirect('/app/index.html')


@app.route('/app')
def app_():
    return redirect('/app/index.html')


@app.route('/admin')
def admin_():
    return redirect('/admin/index.html')
