import Head from "next/head";
import { getClient } from "../lib/sanity.server";
import Card from "../components/Card";
import groq from "groq";
import Link from "next/link";

export async function getStaticProps({ preview = false }) {
  const posts = await getClient(preview).fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
      _id,
      title,
      "username": author->username,
      "categories": categories[]->{id, title},
      "authorImage": author->avatar,
      body,
      mainImage,
      slug,
      publishedAt
    }
  `);
  return {
    props: {
      posts,
    },
  };
}

export default function Home({posts}) {
  return (
    <div className="dashboard">
      <Head>
        <title>Travel blog</title>
        <meta name="description" content="Travel blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="posts-container">
        {posts?.map(post=>(
          <Link key={post._id} href="/posts/[slug]" as={`/posts/${post.slug.current}`} passHref>
            <Card post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
