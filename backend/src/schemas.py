from typing import List, Optional
import datetime
from pydantic import BaseModel
import uuid

# Existing RAG Chatbot related Pydantic models (assuming they are Pydantic, not SQLAlchemy)
# If these were SQLAlchemy models, they should be moved to models.py
class QueryResponseSource(BaseModel):
    source_location: str

class GeneralQueryResponse(BaseModel):
    answer: str
    sources: List[QueryResponseSource]

class SelectedTextQueryResponse(BaseModel):
    answer: str
    sources: List[QueryResponseSource]

class GeneralQueryRequest(BaseModel):
    question: str

class SelectedTextQueryRequest(BaseModel):
    question: str
    selected_text: str

# New Pydantic schemas for the Book Auth and Translation feature
class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    provider: str
    provider_id: str

class UserCreate(UserBase):
    pass # No additional fields needed for creation beyond base

class User(UserBase):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class BookBase(BaseModel):
    title: str
    content: str # This will be the initial content when creating a book

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int
    author_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class BookContentBase(BaseModel):
    content: str

class BookContentCreate(BookContentBase):
    pass

class BookContent(BookContentBase):
    id: int
    book_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class TranslationBase(BaseModel):
    language: str
    translated_content: str # This will be the content for the translation

class TranslationCreate(TranslationBase):
    pass

class Translation(TranslationBase):
    id: int
    book_id: int
    translated_content_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    class Config:
        from_attributes = True

class ContentChunk(BaseModel):
    content: str
    source_location: str

class ChatHistory(BaseModel):
    id: int
    user_id: int
    question: str
    answer: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True