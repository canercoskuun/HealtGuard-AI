from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Model yükleniyor
model = joblib.load('svc_disease_prediction_model.pkl')

# Description verisi
ds=pd.read_csv('symptom_Description.csv')
ds.index = ds['Disease']
ds = ds.drop('Disease', axis=1)

# Precaution verisi
pr=pd.read_csv('symptom_precaution.csv')
pr = pr.fillna("")
pr['precautions'] = ""

for i in range(1, 5):
    pr['precautions'] += pr[f"Precaution_{i}"] + ", "

# Gereksiz sütunları kaldır
pr = pr.drop([f"Precaution_{i}" for i in range(1, 5)], axis=1)
pr = pr.drop_duplicates()
pr['precautions'] = pr['precautions'].str.rstrip(', ')
pr.index = pr['Disease']
pr = pr.drop('Disease', axis=1)

# Prediction fonksiyonu
def predict_top5_diseases(user_symptoms):
    decision_scores = model.decision_function([user_symptoms])
    top5_indices = np.argsort(decision_scores[0])[-5:][::-1]
    possible_diseases = model.classes_[top5_indices]
    scores = decision_scores[0][top5_indices]

    log_scores = np.log1p(scores)
    exp_scores = np.exp(log_scores - np.max(log_scores))
    probabilities = exp_scores / np.sum(exp_scores)

    results = []
    for disease, probability in zip(possible_diseases, probabilities):
        description = ds.loc[disease, 'Description'] if disease in ds.index else "No description"
        precautions = pr.loc[disease, 'precautions'] if disease in pr.index else "No precautions"
        results.append({
            "disease": disease,
            "probability": round(probability * 100, 2),
            "description": description,
            "precautions": precautions
        })
    return results

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get("symptoms", "")
    result = predict_top5_diseases(symptoms)
    return jsonify({"predictions": result})

if __name__ == "__main__":
    app.run(debug=True)
