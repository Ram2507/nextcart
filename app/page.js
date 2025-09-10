import Image from "next/image";
import Nav from "./header/Nav";

export default function Home() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
      </main>
      <footer>
        <p>© 2023 My Website. All rights reserved.</p>
      </footer>
    </>
  );
}

           
