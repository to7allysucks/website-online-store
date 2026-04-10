import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Cloth Online Store API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

from api.product import router as product_router
from api.auth import router as auth_router

app.include_router(product_router)
app.include_router(auth_router)

@app.get('/health', summary='Health', tags=['Root'])
def health():
    return {'success': 'OK'}

if __name__ == '__main__':
    uvicorn.run('main:app', port=8000, reload=True)