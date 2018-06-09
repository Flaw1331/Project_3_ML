import json
from flask import Flask, jsonify, redirect, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/getData")
def whateverman():
    filez = predict.get_file()
    model = load_model('good_model.h5')
    prediction = predict.predict('test_folder/' + filez, model=model)
    return jsonify(prediction)  

if __name__ == "__main__":
    app.run(debug=True)
