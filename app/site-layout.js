"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Nav from "./header/Nav";
import AuthNav from "./header/AuthNav";

export default function SiteLayout({ children }) {

    const segments = useSelectedLayoutSegment();
    if(segments !== null){
        const isAuth = segments.includes("auth") || segments.includes("login");
        if(isAuth){
            return <>
            <AuthNav />
            {children}
            </>;
        }
    }

  return (
    <>

      <header>
        <Nav />
      </header>
      <main style={{ padding: "20px" }}>{children}</main>
      <footer>Site Footer</footer>
    </>
  );
}
