from database import Base
from sqlalchemy import Column,Integer,String

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True,index=True)
    name=Column(String(100),nullable=False)
    answer = Column(String(50),nullable=False)
