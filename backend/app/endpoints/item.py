from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required 

from app import app
from app.models import *

bp = Blueprint('item', __name__, url_prefix='/item')

@bp.route('/create', methods=['POST',])
def create():
    """
    format of data:
    {
        "name": "item1",
        "new_price": 1.0,
        "base_policy": {
            "excess": 1.0,
            "premium": 1.0    
        },
        "dao_id": 1
    }
            
    """
    data = request.get_json()
    
    try:
        item = Item(data['name'], data['new_price'],  data['base_policy_id'], data['dao_id'])
    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 400
        
    item.save()

    return jsonify({'status': 'success'}), 200

    
@bp.route('/create-multiple', methods=['POST',])
def create_multiple():
    """
    format of data:
    {
        "items": [
            {
                "name": "item1",
                "new_price": 1.0,
                "base_policy": {
                    "excess": 1.0,
                    "premium": 1.0    
                },
                "dao_id": 1
            },
            ...
        ]
    }

    """
    data = request.get_json()
    items = data['items']
    
    for item in items:
        try:
            new_item = Item(item['name'], item['new_price'],  item['base_policy_id'], item['dao_id'])
        except Exception as e:
            return jsonify({
                'message': str(e),
                'status': 'error'
            }), 400
            
        new_item.save()

    return jsonify({'status': 'success'}), 200