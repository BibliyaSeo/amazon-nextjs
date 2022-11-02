import Head from "next/head";

interface SEOProps {
  title: string;
}

export default function SEO({ title }: SEOProps) {
  return (
    <Head>
      <title>{title} | Amazon</title>
      <meta name="description" content="Amazon" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
