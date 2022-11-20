import groq from "groq";
import Tag from "../../components/Tag";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";
import Map from "../../components/Map";

const PostComponents = {
  types: {
    image: ({ value }) => {
      return <img className="post-image" alt={value.alt || ""} src={urlFor(value)} />;
    },
  },
};

const Post = ({ post }) => {
  const { title, categories, body, authorImage, username, about, postedAt } = post;
  return (
    <>
      {post && (
        <article className="post-container">
          <h1>{title}</h1>
          <hr />
          <div className="tag-container">
            {categories?.map((category) => (
              <Tag title={category.title} key={category.id} />
            ))}
          </div>
          <PortableText value={body} components={PostComponents} />
          <hr />
          <div className="info-container">
            <div className="author-container">
              <img className="author" alt="authorImage" src={urlFor(authorImage).url()} />
              <h3>Author: {username}</h3>
              <p>{about}</p>
            </div>
            <div className="map-container">
              <Map latitude={postedAt.lat} longitude={postedAt.lng}/>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,
    "username": author->username,
    "about": author-bio,
    "categories": categories[]->{id, title},
    "authorImage": author->avatar,
    body,
    mainImage,
    postedAt,
    publishedAt
  }
`;

export async function getStaticPaths() {
  const paths = await getClient().fetch(groq`*[_type == "post" && defined(slug.current)][].slug.current`);
  return {
    paths: paths.map((slug) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(query, { slug: params.slug });
  return {
    props: {
      post,
    },
  };
}

export default Post;
