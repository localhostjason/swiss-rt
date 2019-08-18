from flask import redirect
from .. import app


@app.route('/')
def index():
    return redirect('/dist/index.html')
