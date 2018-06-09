
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
# import necessary libraries
import numpy as np
import os
import csv
import pandas as pd
from werkzeug.utils import secure_filename
import json
from flask_cors import CORS
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

# config = tf.ConfigProto()
# config.gpu_options.allow_growth = True 
# config.log_device_placement = True                   
# sess = tf.Session(config=config)
# set_session(sess) 


# variables

# Second dimension of the feature is dim2
feature_dim_2 = 11

# # Feature dimension
feature_dim_1 = 20
channel = 1


DATA_PATH = "../large_files/audio/"  

def predict(filepath, model):
    sample = wav2mfcc(filepath)
    sample_reshaped = sample.reshape(1, feature_dim_1, feature_dim_2, channel)
    return get_labels()[0][
            np.argmax(model.predict(sample_reshaped))
    ]

def okpredict(filepath):
   sample = wav2mfcc(filepath)
   sample_reshaped = sample.reshape(1, feature_dim_1, feature_dim_2, channel)
   return sample_reshaped
   
def wav2mfcc(file_path, max_len=11):
    wave, sr = librosa.load(file_path, mono=True, sr=None)
    wave = wave[::3]
    mfcc = librosa.feature.mfcc(wave, sr=16000)

    # If maximum length exceeds mfcc lengths then pad the remaining ones
    if (max_len > mfcc.shape[1]):
        pad_width = max_len - mfcc.shape[1]
        mfcc = np.pad(mfcc, pad_width=((0, 0), (0, pad_width)), mode='constant')

    # Else cutoff the remaining parts
    else:
        mfcc = mfcc[:, :max_len]
    return mfcc

# Output: Tuple (Label, Indices of the labels, one-hot encoded labels)
def get_labels(path=DATA_PATH):
    labels = os.listdir(path)
    label_indices = np.arange(0, len(labels))
    return labels, label_indices, to_categorical(label_indices)


def get_file():
    path = './test_folder'
    fnames = os.listdir(path)
    return (fnames[0])    

def makePrediction(): 
    model = load_model('good_model.h5')
    filez = get_file()
    test = model.predict(okpredict('./test_folder/' + filez))
    ok = test.tolist()
    names = get_labels()
    labels = list(names)
    dictionary = dict(zip(labels[0],ok[0]))
    return dictionary

# variables

# Second dimension of the feature is dim2
feature_dim_2 = 11

# # Feature dimension
feature_dim_1 = 20
channel = 1



