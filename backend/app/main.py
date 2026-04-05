import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter
from api.product import router as product
from api.user import router as user
from api.cart import router as cart

api_router = APIRouter(prefix="/api")
api_router.include_router(product)
api_router.include_router(user)
api_router.include_router(cart)

app = FastAPI(title="Cloth Online Store API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/health', summary='Health')
def health():
    return {"success": "OK"}

if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', reload=True)