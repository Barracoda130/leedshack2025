from app.models import *

dao = Dao.get(name="dao_name")
print(dao.get_items())
