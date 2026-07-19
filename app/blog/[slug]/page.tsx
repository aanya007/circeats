import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import { posts, getPost, formatPostDate } from "@/lib/data/posts";
import styles from "./article.module.css";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Blog — CircEats" };
  return {
    title: `${post.title} — CircEats`,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: Params) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main>
      <Nav />
      <article>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.meta}>
              <span className={styles.tag}>{post.tag}</span>
              <span>
                {formatPostDate(post.date)} · {post.readTime}
              </span>
            </div>
            <h1 className={`display ${styles.title}`}>{post.title}</h1>
          </div>
        </header>
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <a href="/blog" className={styles.backLink}>
              ← All posts
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
