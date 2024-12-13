from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.models import Sequential
from numpy.linalg import norm
from sklearn.neighbors import NearestNeighbors
import numpy as np
import pickle
import os

# Load precomputed features and file list
features_list = pickle.load(open("image_features_embedding.pkl", "rb"))
img_files_list = pickle.load(open("img_files.pkl", "rb"))

# Initialize the model
model = ResNet50(weights="imagenet", include_top=False, input_shape=(224, 224, 3))
model.trainable = False
model = Sequential([model, GlobalMaxPooling2D()])

# Create the FastAPI app
app = FastAPI()

# Allow CORS (useful for front-end integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a directory to store uploaded files
UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Utility functions
def save_file(uploaded_file: UploadFile):
    file_path = os.path.join(UPLOAD_DIR, uploaded_file.filename)
    with open(file_path, "wb") as f:
        f.write(uploaded_file.file.read())
    return file_path

def extract_img_features(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    expand_img = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(expand_img)
    result_to_resnet = model.predict(preprocessed_img)
    flatten_result = result_to_resnet.flatten()
    # Normalize
    result_normalized = flatten_result / norm(flatten_result)
    return result_normalized

def recommend(features, features_list):
    neighbors = NearestNeighbors(n_neighbors=6, algorithm='brute', metric='euclidean')
    neighbors.fit(features_list)
    distances, indices = neighbors.kneighbors([features])
    return indices

@app.post("/upload/", response_model=dict)
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded file
        file_path = save_file(file)

        # Extract features from the uploaded image
        features = extract_img_features(file_path, model)

        # Find recommended images
        img_indices = recommend(features, features_list)

        # Retrieve file paths for recommendations
        recommended_images = [img_files_list[idx] for idx in img_indices[0]]

        return {
            "uploaded_image": file.filename,
            "recommended_images": recommended_images
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# Serve uploaded files (for testing or front-end integration)
app.mount("/uploaded_files", StaticFiles(directory=UPLOAD_DIR), name="uploaded_files")

@app.get("/")
def root():
    return {"message": "Welcome to the Clothing Recommender System API!"}
