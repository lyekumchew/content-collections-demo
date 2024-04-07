import { MDXContent } from "@content-collections/mdx/react";
import { allPosts } from "content-collections";
import { Tweet } from "react-tweet";

export default function Home() {
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post._meta.path}>
          <a href={`/posts/${post._meta.path}`}>
            <h3>{post.title}</h3>
            <MDXContent code={post.body} components={{
              Tweet
            }} />
          </a>
        </li>
      ))}
    </ul>
  );
}
