from flask import Flask
from api import words_api

app = Flask(__name__)

app.register_blueprint(words_api, url_prefix='/api/words')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')