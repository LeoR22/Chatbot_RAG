import os
import mysql.connector
from mysql.connector import Error

class Database:
    def __init__(self):
        self.connection = self._connect()

    def _connect(self):
        try:
            return mysql.connector.connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME")
            )
        except Error as e:
            raise ConnectionError(f"Error al conectar a la base de datos: {e}")

    def get_schema(self):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            schema = {}
            for table in tables:
                cursor.execute(f"DESCRIBE {table[0]}")
                columns = cursor.fetchall()
                schema[table[0]] = [{"name": col[0], "type": col[1]} for col in columns]
            return schema
        finally:
            cursor.close()

    def execute_query(self, sql_query):
        cursor = self.connection.cursor()
        try:
            cursor.execute(sql_query)
            results = cursor.fetchall()
            columns = [desc[0] for desc in cursor.description]
            return [dict(zip(columns, row)) for row in results]
        finally:
            cursor.close()
