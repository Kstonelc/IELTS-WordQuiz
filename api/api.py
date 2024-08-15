from flask import Blueprint, jsonify, request

words_api = Blueprint('words', __name__)


@words_api.route('/words-analysis', methods=['POST'])
def words_analysis():
    return {
        "ok": True,
        "data": "Hello Flask"
    }


@words_api.route('/upload-file', methods=['POST'])
def upload_file():
    return {
        "ok": True,
        "data": "Hello Flask"
    }
