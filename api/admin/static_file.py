from flask import redirect
from .. import app


@app.route('/')
def index():
    return redirect('/admin/index.html')
