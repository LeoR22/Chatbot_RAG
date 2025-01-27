import os
import requests

class GroqService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.base_url = "https://api.groq.com/openai/v1/chat/completions"

    def generate_sql(self, question, schema, mongo_results):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        # Incluir resultados de MongoDB como contexto adicional
        mongo_context = "\n".join([str(result) for result in mongo_results])
        
        data = {
            "model": "llama3-8b-8192",
            "messages": [
                {
                    "role": "user",
                    "content": f"""
                    Eres un analista de datos en una empresa. Basado en el esquema a continuación, 
                    por favor genera una consulta SQL para responder la pregunta del usuario.

                    ESQUEMA:
                    {schema}

                    RESULTADOS DE MONGODB:
                    {mongo_context}

                    Pregunta del Usuario: {question}
                    """,
                }
            ],
        }
        
        response = requests.post(self.base_url, json=data, headers=headers)
        response.raise_for_status()
        result = response.json()
        return self._extract_sql(result)


    def _extract_sql(self, response):
        content = response.get("choices", [{}])[0].get("message", {}).get("content", "")
        start_index = content.find("SELECT")
        if start_index == -1:
            raise ValueError("No se encontró una consulta SQL válida en la respuesta de Groq.")
        return content[start_index:].strip().split(";")[0] + ";"