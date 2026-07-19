import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import BlogHero from "@/components/Blog/BlogHero";
import PostGrid from "@/components/Blog/PostGrid";

export const metadata: Metadata = {
  title: "Blog — CircEats",
  description:
    "Notes from the circle: food waste, rescued groceries, and the system keeping Singapore's dinners out of the landfill.",
};

export default function BlogPage() {
  return (
    <main>
      <Nav />
      <BlogHero />
      <PostGrid />
      <Footer />
    </main>
  );
}
