"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, memo } from 'react';

const ActiveLink = memo(({ href, children }) => {
    const pathname = usePathname();
    const isActive = useMemo(() => pathname === href, [pathname, href]);
    return (
        <li style={{ fontWeight: isActive ? "bold" : "normal" }}>
            <Link href={href}>{children}</Link>
        </li>
    );
});

export default ActiveLink;