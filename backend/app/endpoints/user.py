from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, get_current_user, get_jwt_identity

from app import app
from app.models import *

bp = Blueprint('user', __name__, url_prefix='/user')

# @bp.route('/register', methods=['POST',])
# def register():
#     """
#     format of data:
#     {
#         "username": "username",
#         "password": "password",
#         "email": "email",
#         "firstname": "firstname",
#         "surname": "surname"
#     }
#     """
#     data = request.get_json()
#     password = data['password']
#     username = data['username']
#     email = data['email']
#     firstname = data['firstname']
#     surname = data['surname']

#     try:
#         user = User(username=username, email=email, password=password, firstname=firstname, surname=surname)
#         user.save()
#     except Exception as e:
#         return jsonify({
#             'message': str(e),
#             'status': 'error'
#         }), 400
        
#     access_token = create_access_token(identity=user)
#     response = jsonify({'status': 'success', 'token': access_token})

#     return response, 201
        
    
# @bp.route('/login', methods=['POST',])
# def login():
#     """
#     format of data:
#     {
#         "username": "username",
#         "password": "password"
#     }
#     """
#     data = request.get_json()
#     username = data['username']
#     password = data['password']
#     user = User.authenticate(username, password)
#     if user:
#         access_token = create_access_token(identity=user)

#         response = jsonify({'status': 'success', 'token': access_token})
#         return response, 201
#     else:
#         return jsonify({'status': 'error', 'message': 'Incorrect username or password'}), 401
    
# @bp.route('/logout', methods=['POST',], endpoint='logout')
# @jwt_required()
# def logout():
#   response = jsonify({"status": "success", "message": "Successfully logged out"})
#   unset_jwt_cookies(response)
#   return response, 200

# @bp.route('/verify-token', methods=['POST',], endpoint='verify-token')
# @jwt_required()
# def verify_token():
#     return jsonify({'success': True}), 200

@bp.route('/create-user', methods=['POST',])
def create_user():
    """
    format of data:
    {
        "firstname": "firstname",
        "surname": "surname"
        "item_ids": ["item_id1", "item_id2"]
    }
    """
    data = request.get_json()
    firstname = data['firstname']
    surname = data['surname']
    item_ids = data['item_ids']

    try:
        user = User(username=None, email=None, password=None, firstname=firstname, surname=surname)
        user.save()

        for item_id in item_ids:
            user.insure_item(item_id)
            user.update()
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 400
        
    response = jsonify({'status': 'success'})

    return jsonify(response)


@bp.route('/make-claim', methods=['POST'])
@jwt_required()
def make_claim():
    """
    format of data:
    {
        "item_id": "item_id"
    }
    """
    data = request.get_json()
    
    user = get_current_user()
    try:
        user.make_claim(data['item_id'])
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 400
        
    response = jsonify({'status': 'success'})

    return jsonify(response)

@bp.route('/get-claims', methods=['GET'])
@jwt_required()
def get_claims():
    user = get_current_user()
    claims = user.get_claims()
    return jsonify({'claims': claims}), 200

@bp.route('/get-info', methods=['GET'])
@jwt_required()
def get_info():
    user = get_current_user()
    return jsonify({'user_info': user.get_info()}), 200