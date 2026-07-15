import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { BlogDetailClient } from "@/components/blog/BlogDetailClient";

export function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = blogs.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | FirstMed Blog`,
    description: post.excerpt,
  };
}

export default function BlogDetail({ params }) {
  const post = blogs.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // Get next posts for the "Read Next" section
  const relatedPosts = blogs.filter((p) => p.slug !== params.slug).slice(0, 2);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
