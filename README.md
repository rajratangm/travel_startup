# travel_startup 
+------------------------+
|     React Frontend     |
|  (User inputs question)|
+-----------+------------+
            |
            v
+------------------------+
|      FastAPI Backend   |  <-- /chat endpoint
+-----------+------------+
            |
            v
+----------------------------+
|      handle_query()        |  <-- rag_engine.py
|----------------------------|
| decide_retrieval_plan()    |
| --> ["sql", "vector", "web"]|
+-----------+----------------+
            |
            |  (Based on plan)
            |
+-----------+------------+-----------+-------------+
|                        |                       |
v                        v                       v
+----------------+   +----------------+   +------------------+
| retrieve_from_ |   | retrieve_from_ |   | fetch_from_web() |
|    sql()       |   |  vector_db()   |   | (optional APIs)  |
| (MySQL/PSQL)   |   | (FAISS/Chroma) |   +------------------+
+----------------+   +----------------+           
            \            |             /
             \           |            /
              \          v           /
             +------------------------+
             |  Aggregated Context    |
             +------------------------+
                        |
                        v
            +------------------------+
            |   generate_response()  |
            |    (LLM: OpenAI/Groq)  |
            +------------------------+
                        |
                        v
           +-------------------------+
           |  Final Response to User |
           +-------------------------+
