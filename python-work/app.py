import pickle
from flask import Flask,request,jsonify
import nltk
from  nltk.corpus import stopwords
import string
from nltk.stem.porter import PorterStemmer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
ps = PorterStemmer()
model = pickle.load(open("model1.pkl","rb"))
tfidf = pickle.load(open("vectorizer1.pkl","rb"))

def transform_text(text):
  text = text.lower()
  text = nltk.word_tokenize(text)
  y = []
  for i in text:
    if i.isalnum():
      y.append(i)

  text = y[:]
  y.clear()

  for i in text:
    if i not in stopwords.words('english') and i not in string.punctuation:
      y.append(ps.stem(i))
  return " ".join(y)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        # input_data = data
        transformed_input_data = transform_text(input_data)
        
        
        text = tfidf.transform([transformed_input_data])
        
        
        # Make predictions using the ML model
        predictions = model.predict(text)[0]
        # Return the predictions as JSON
        predictions = int(predictions)
        return jsonify({'predictions': predictions})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000,debug=True)