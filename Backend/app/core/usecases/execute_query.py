from app.core.entities.query import Query
from app.infrastructure.services.groq_service import GroqService
from app.infrastructure.db.database import Database

class ExecuteQuery:
    def __init__(self, groq_service: GroqService, db: Database):
        self.groq_service = groq_service
        self.db = db

    def handle(self, query: Query):
        # Validar la pregunta
        query.validate()

        # Obtener el esquema de la base de datos
        schema = self.db.get_schema()

        # Generar consulta SQL utilizando Groq
        sql_query = self.groq_service.generate_sql(query.question, schema)

        # Ejecutar consulta en la base de datos
        results = self.db.execute_query(sql_query)

        return {"sql_query": sql_query, "results": results}
