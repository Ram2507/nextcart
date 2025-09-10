"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { cartTotals } from "../lib/cart";

export default function CartLink() {
    const[count, setCount] = useState(0);

    useEffect(() => {
        const totals = cartTotals();
        setCount(totals.totalItems);

        const handler = () => {
            const updatedTotals = cartTotals();
            setCount(updatedTotals.totalItems);
        };
        window.addEventListener("cart:updated", handler);
        return () => window.removeEventListener("cart:updated", handler);
    }, []);

    return(
        <li>
            <Link href="/cart">
                <span>🛒 Cart</span>
                <span>({count})</span>
            </Link>
        </li>
    )
}