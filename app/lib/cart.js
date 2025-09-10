

function readCart(){
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
}

function writeToCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart:updated"));
    }
}   

export function addToCart(product, qty=1) {
    const cart = readCart();
    console.log(cart);
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartItems() {
    return readCart();
}

export function updateCartItem(id, qty) {
    
  const cart = readCart();
  const product = cart.find((item) => item.id === id);
  if (!product) return;

  if (qty <= 0) {
    const newCart = cart.filter((item) => item.id !== id);
    writeToCart(newCart);
  } else {
    product.qty = qty;
    writeToCart(cart);
  }
}

export function clearCart() {
  writeToCart([]);
}

export function cartTotals() {
  const cart = readCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { totalItems, totalPrice };
}