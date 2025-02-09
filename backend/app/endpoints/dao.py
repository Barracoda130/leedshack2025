from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required, get_current_user

from app import app
from app.models import *

bp = Blueprint('dao', __name__, url_prefix='/dao')

@bp.route('/create', methods=['POST',])
def create():
    """
    format of data:
    {
        'name': 'dao_name'
        'joining_fee': 1.0,
        'termination_period': 1,
        'items': [{name: 'item1', premium: 1.0, excess: 1.0}]
    }
    """
    data = request.get_json()
    name = data['name']
    joining_fee = data['joining_fee']
    termination_period = data['termination_period']
    items = data['items']
    
    try:
        dao = Dao(name, money=0, termination_period=termination_period, joining_fee=joining_fee)
        dao.save()

        for item in items:
            base_policy = Policy(item['premium'], item['excess'])
            base_policy.save()

            new_item = Item(item['name'], 0, base_policy.id, dao.id)
            new_item.save()

            dao.add_item(new_item.id)
            dao.update()
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
