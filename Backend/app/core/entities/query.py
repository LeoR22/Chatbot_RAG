class Query:
    def __init__(self, question: str):
        self.question = question

    def validate(self):
        if not self.question or len(self.question.strip()) == 0:
            raise ValueError("La pregunta no puede estar vacía.")
