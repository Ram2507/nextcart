"use client";


import ActiveLink from './ActiveLink';

export default function AuthNav() {
    return (
        <nav style={{ background: "#f0f0f0", padding: "10px" }}>
            <ul style={{ listStyleType: "none", margin: 0, padding: 0, display: "flex", gap: "10px" }}>
                
                    <ActiveLink href="/">Home</ActiveLink>
                
                    <ActiveLink href="/login">Login</ActiveLink>
                
                    <ActiveLink href="/register">Register</ActiveLink>
                
                    <ActiveLink href="/contact">Contact</ActiveLink>
                
                    

            </ul>
        </nav>
    );
}
