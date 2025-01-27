from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.entities.query import Query
from app.core.usecases.execute_query import ExecuteQuery
from app.infrastructure.services.groq_service import GroqService
from app.infrastructure.db.database import Database

router = APIRouter()

# Modelo de solicitud
class QueryRequest(BaseModel):
    question: str

@router.post("/query")
def query_database(request: QueryRequest):
    try:
        # Instanciar dependencias
        db = Database()
        groq_service = GroqService()
        use_case = ExecuteQuery(groq_service, db)

        # Ejecutar caso de uso
        query = Query(request.question)
        result = use_case.handle(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
