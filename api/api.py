from flask import Blueprint, jsonify, request

words_api = Blueprint('words', __name__)


@words_api.route('/words', methods=['POST'])
def get_words():
    return {
        "ok": True,
        "data": "Hello Flask"
    }
