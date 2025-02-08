from app.endpoints import demo

from app import app

app.register_blueprint(demo.bp)