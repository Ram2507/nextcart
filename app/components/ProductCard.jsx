
import Link from "next/link"
import Image from "next/image"
import AddToCartButton from "./AddToCartButton"


export default function ProductCard({product}){
    return(<div className="border rounded-xl p-4 transition">
        <Link href={`products/${product.id}`}>
            <div className="w-full relative mb-3">
                <Image className="object-contain" alt={product.title} src={product.image} width={200} height={200} />
            </div>
        </Link>
        <Link href={`products/${product.id}`}>
            <h2 className="font-semibold">{product.title}</h2>
        </Link>
        <p className="font-medium">$ {product.price}</p>
        <AddToCartButton product={product} />
    </div>)
}