<div align="center">

# Online Store

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![Alembic](https://img.shields.io/badge/Alembic-6BA539?style=flat-square)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

A full-stack e-commerce application for a clothing store with a clean, minimalist design.
Features a RESTful API with JWT authentication, product browsing, cart management, and order placement.

*In development.*

</div>

---

## Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend

```bash
git clone https://github.com/to7allysucks/website-online-store.git
cd website-online-store/backend

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/online_store
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

```bash
alembic upgrade head

fastapi dev main.py             # or: uvicorn main:app --reload
```

API runs at `http://localhost:8000` — docs at `/docs`.

### Frontend

```bash
cd website-online-store/frontend

npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## API

**Auth** — `/api/auth/register` · `/api/auth/login` · `/api/auth/me`

**Products** — `/api/products/` · `/api/products/{id}`

**Cart** — `/api/cart/` · `/api/cart/items` · `/api/cart/items/{id}`

**Orders** — `/api/orders/`

Protected routes require `Authorization: Bearer <token>`.

---

## Authors

[@to7allysucks](https://github.com/to7allysucks) — backend &nbsp;·&nbsp; [@Kwinxxx](https://github.com/Kwinxxx) — frontend

---

## License

[WTFPL](http://www.wtfpl.net/) — do what the fuck you want. Enjoy.
