from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, get_current_user

from app import app
from app.models import *

bp = Blueprint('dao', __name__, url_prefix='/dao')

@bp.route('/create', methods=['POST',])
@jwt_required()
def create():
    """
    format of data:
    {
        'name': 'dao_name'
    }
    """
    data = request.get_json()
    name = data['name']
    
    try:
        dao = Dao(name)
        dao.save()
        dao.add_member(get_current_user().id)
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 400
        
    return jsonify({'status': 'success'}), 200


@bp.route('/get-items', methods=['POST',])
def get_items():
    """
    format of data:
    {
        'dao_id': 3
    }
    """
    data = request.get_json()
    dao = Dao.get(id=data['dao_id'])
    
    return jsonify({
        'status': 'success',
        'items': dao.get_items()
    }), 200

@bp.route('/get-info', methods=['POST',])
def get_info():
    """
    format of data:
    {
        'dao_id': 3
    }
    """
    data = request.get_json()
    dao = Dao.get(id=data['dao_id'])
    
    return jsonify({
        'status': 'success',
        'dao_info': dao.get_info()
    }), 200
