"use client"
import { addToCart } from "../lib/cart";
export default function AddToCartButton({product}) {
    return (
        <button className="bg-sky-500/70 border p-2 rounded" onClick={() => addToCart(product)}>Add To Cart</button>
    );
}
