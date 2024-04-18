from database import Base,SessionLocal,engine
from fastapi import FastAPI, HTTPException,Depends,Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import mysql.connector
from models import User


Base.metadata.create_all(bind=engine)
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
db_config = {
    'host': 'localhost',
    'port': 3305,
    'username': 'root',
    'password': 'India@11',
    'database': 'test-server'
}
class UserResponse(BaseModel):
    name:str
    answer: str


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()  


@app.post("/submit/")
async def submit_quiz_response(response: UserResponse, db:Session=Depends(get_db)):
    try:
        u=User(name=response.name,answer=response.answer)
        print(u)
        #sql = "INSERT INTO user (answer) VALUES (%s)"
        #print(sql,(response.answer))
        #cursor.execute(sql, (response.answer))
        db.add(u)
        db.commit()
    except mysql.connector.Error as error:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error inserting response")
    finally:
        db.close()
    return {"message": "Answer submitted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)