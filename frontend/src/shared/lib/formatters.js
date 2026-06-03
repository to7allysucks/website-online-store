export const formatPrice = (price) => {
  return `$${Number(price).toFixed(2)}`
}

export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.quantity * item.variant.product.price), 0)
}
