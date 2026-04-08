from sqlalchemy import Column, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from core.database import Base
import uuid
from datetime import datetime

class Favorite(Base):
    __tablename__ = 'favorites'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    product_id = Column(UUID(as_uuid=True), ForeignKey('products.id'))
    added_at = Column(DateTime, default=datetime.utcnow)