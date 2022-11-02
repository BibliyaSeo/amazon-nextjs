import Head from "next/head";

interface SEOProps {
  title: string;
}

export default function SEO({ title }: SEOProps) {
  const myTitle = `${title} | Amazon`;

  return (
    <Head>
      <title>{myTitle}</title>
      <meta name="description" content="Amazon" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
