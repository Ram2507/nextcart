"use client";


import ActiveLink from './ActiveLink';
import CartLink from './CartLink';

export default function Nav() {
    return (
        <nav style={{ background: "#f0f0f0", padding: "10px" }}>
            <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "flex", gap: "10px" }}>
                
                    <ActiveLink href="/">Home</ActiveLink>
                
                    <ActiveLink href="/about">About</ActiveLink>
                
                    <ActiveLink href="/services">Services</ActiveLink>
                
                    <ActiveLink href="/login">Login</ActiveLink>
                
                    <ActiveLink href="/register">Register</ActiveLink>
                
                    <ActiveLink href="/contact">Contact</ActiveLink>
                
                    <ActiveLink href="/blog">Blog</ActiveLink>

                    <ActiveLink href="/products">Products</ActiveLink>
                    <ActiveLink href="/register">Register</ActiveLink>
                    <ActiveLink href="/employees">Employees</ActiveLink>

                    <CartLink />

            </ul>
        </nav>
    );
}
