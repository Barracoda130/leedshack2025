from app.endpoints import user

from app import app

app.register_blueprint(user.bp)

print("Registered blueprints")