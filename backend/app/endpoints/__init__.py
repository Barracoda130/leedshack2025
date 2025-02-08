from app.endpoints import user, dao, item

from app import app

app.register_blueprint(user.bp)
app.register_blueprint(dao.bp)
app.register_blueprint(item.bp)


print("Registered blueprints")