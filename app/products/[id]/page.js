import Image from "next/image";
import Link from "next/link";

async function getProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  }
 

export default async function ProductDetails({ params }) {
  const { id } = params;

  const product = await getProduct(id);

  return (
    <main className="p-8 mx-auto max-w-2xl">
        <div className="grid gap-8 grid-cols-1">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <Image src={product.image} alt={product.title} width={200} height={200} className="mb-4 object-contain" />
          <p className="mb-4">{product.description}</p>
          <p className="font-semibold">${product.price}</p>
          <button className="bg-sky-500/70 border p-2 rounded">Add To Cart</button>
          <Link href="/cart" className="text-blue-500">Go to Cart</Link>
          <Link href="/products" className="text-blue-500">Go to Products</Link>
        </div>
    </main>
  );
}
