from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required 

from app import app
from app.models import *

bp = Blueprint('dao', __name__, url_prefix='/dao')

@bp.route('/create', methods=['POST',])
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
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 400
        
    dao.save()

    return jsonify({'status': 'success'}), 200
