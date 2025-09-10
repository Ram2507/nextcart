"use client";
import { useState, useEffect } from "react";
import { getCartItems, updateCartItem, clearCart, cartTotals } from "../lib/cart";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ totalItems: 0, totalPrice: 0 });

  const refreshCart = () => {
    const items = getCartItems();
    setCartItems(items || []);
    setTotals(cartTotals());
  };

  useEffect(() => {
    refreshCart();
    const handler = () => refreshCart();
    window.addEventListener("cart:updated", handler);
    return () => window.removeEventListener("cart:updated", handler);
  }, []);

  const increment = (id) => updateCartItem(id, cartItems.find(item => item.id === id)?.qty + 1);
  const decrement = (id) => updateCartItem(id, cartItems.find(item => item.id === id)?.qty - 1);
  const deleteItem = (id) => updateCartItem(id, 0);
  const empty = () => clearCart();


  return (
    <div>
      <h1>Shopping Cart</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Product</th>
            <th className="border border-gray-200 p-2">Quantity</th>
            <th className="border border-gray-200 p-2">Unit Price</th>
            <th className="border border-gray-200 p-2">Total Price</th>
            <th className="border border-gray-200 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <tr key={item.id} className="text-center border-b">
                <td className="border border-gray-200 p-2">{item.title}</td>
                <td className="border border-gray-200 p-2">
                  <button onClick={() => increment(item.id)} className="bg-sky-500/70 border p-1 rounded">+</button>
                  {item.qty}
                  <button onClick={() => decrement(item.id)} className="bg-sky-500/70 border p-1 rounded">-</button>
                </td>
                <td className="border border-gray-200 p-2">${item.price}</td>
                <td className="border border-gray-200 p-2">${(item.price * item.qty).toFixed(2)}</td>
                <td className="border border-gray-200 p-2">
                  <button onClick={() => deleteItem(item.id)} className="bg-red-500/70 border p-1 rounded">Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Your cart is currently empty.</td>
            </tr>
          )}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="3" className="border border-gray-200 p-2 text-right font-bold">Grand Total:</td>
                <td className="border border-gray-200 p-2">
                  ${totals.totalPrice.toFixed(2)}
                </td>
                <td className="border border-gray-200 p-2">
                    <button onClick={empty} className="bg-red-500/70 border p-1 rounded">Empty Cart</button>
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CartPage;
