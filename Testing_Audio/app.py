# import necessary libraries
import numpy as np
import os
import csv
import pandas as pd
from werkzeug.utils import secure_filename
import json
from flask_cors import CORS
import predict
import tensorflow as tf
from keras.backend.tensorflow_backend import set_session
import librosa
import os as os
from scipy.misc import comb
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
import numpy as np
from tqdm import tqdm
from keras.models import load_model
import pandas as pd

from flask import (
    Flask,
    flash,
    url_for,
    render_template,
    jsonify,
    request,
    redirect)


UPLOAD_FOLDER = 'test_folder'
ALLOWED_EXTENSIONS = set(['wav'])

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # return redirect(url_for('uploaded_file', filename=filename))
        return render_template("index.html")

@app.route("/predict")
def whateverman():
    prediction = predict.makePrediction()
    return jsonify(prediction)    

if __name__ == "__main__":
    app.run()
