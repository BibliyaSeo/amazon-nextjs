import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import SEO from "../components/SEO";

export default function Home({ products }: any) {
  return (
    <div className="bg-gray-100">
      <SEO title="HOME" />
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
  return {
    props: { products },
  };
}
