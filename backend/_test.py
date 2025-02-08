from app.models import *

# k
# u1 = User("user11234", email="email", password="password", firstname="first", surname="surname")
# print(u1)

# u1.save()

print(User.query.all())