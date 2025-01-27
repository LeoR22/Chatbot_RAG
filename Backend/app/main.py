from fastapi import FastAPI
from app.interfaces.controllers.query_controller import router
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI(
    title="DataGenie Chatbot RAG API",
    description="API para generar y ejecutar consultas SQL basadas en lenguaje natural utilizando Groq.",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar rutas
app.include_router(router, prefix="/api", tags=["Queries"])

@app.get("/")
def root():
    return {"message": "Bienvenido a la API de Chat con MySQL y Groq"}