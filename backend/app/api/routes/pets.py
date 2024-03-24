from fastapi import APIRouter, HTTPException
from typing import List
import httpx
from pydantic import BaseModel

router = APIRouter()

class Category(BaseModel):
    id: int
    name: str

class Tag(BaseModel):
    id: int
    name: str

class Pet(BaseModel):
    id: int
    category: Category
    name: str
    photoUrls: List[str]
    tags: List[Tag]
    status: str

@router.get("/pets", response_model=Pet)
async def get_pets():
    try:
        async with httpx.AsyncClient() as client:            
            response = await client.get(f"https://petstore.swagger.io/v2/pet/1")
            response.raise_for_status()  
            pet_data = response.json()
            pet = Pet(**pet_data)                
        return pet  
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Erro ao obter detalhes dos pets")
    