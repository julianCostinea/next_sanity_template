import { forwardRef } from "react";
import { urlFor } from "../lib/sanity";
import Tag from "./Tag";

const Card = forwardRef(({onClick, href,  post }, ref) => {
  return (
    <div className="card-container" href={href} onClick={onClick} ref={ref}>
      <h2>{post.title}</h2>
      <p>Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
      <img src={urlFor(post.mainImage)} alt={post.title} className="main-Image" />

      <hr />

      <div className="info-container">
        <p>Posted by: {post.username}</p>
        <img src={urlFor(post.authorImage)} alt={post.username} className="avatar" />
      </div>

      <div className="tag-container">
        {post.categories.map((category)=>(
            <Tag title={category.title} key={category.id}/>
        ))}
      </div>
    </div>
  );
});

export default Card;
