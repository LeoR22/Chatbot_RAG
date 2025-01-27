from app.core.entities.query import Query
from app.infrastructure.services.groq_service import GroqService
from app.infrastructure.db.database import Database
from app.infrastructure.db.mongodb_service import MongoDBService

class ExecuteQuery:
    def __init__(self, groq_service: GroqService, db: Database, mongodb_service: MongoDBService):
        self.groq_service = groq_service
        self.db = db
        self.mongodb_service = mongodb_service

    def handle(self, query: Query):
        # Validar la pregunta
        query.validate()

        # Obtener el esquema de la base de datos MySQL
        schema = self.db.get_schema()

        # Buscar datos relevantes en MongoDB
        mongo_results = self.mongodb_service.search_data(query.question)

        # Generar consulta SQL utilizando Groq y el esquema de MySQL
        sql_query = self.groq_service.generate_sql(query.question, schema, mongo_results)

        # Ejecutar consulta en la base de datos MySQL
        mysql_results = self.db.execute_query(sql_query)

        # Combine los resultados de MySQL y MongoDB
        combined_results = {
            "mysql_results": mysql_results,
            "mongo_results": mongo_results,
            "sql_query": sql_query,
        }

        return combined_results
