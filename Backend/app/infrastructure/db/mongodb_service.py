import os
from pymongo import MongoClient

class MongoDBService:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO_URI"))
        self.db = self.client['rag']
        self.collection = self.db['chatbot']

    def search_data(self, query):
        # Realiza una búsqueda en MongoDB usando un término clave
        result = self.collection.find({"campo": {"$regex": query, "$options": "i"}})
        return list(result)
