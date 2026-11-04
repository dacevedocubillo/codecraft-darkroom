import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, seo } from "@/components/site";
import { posts } from "@/lib/content";

export const Route = createFileRoute("/blog")({
  head: () => seo("Programming Blog — Forgeline", "Practical articles on JavaScript, Python, SQL, Git and growing as a developer.", "/blog"),
  component: Blog,
});

function Blog() {
  return (
    <>
      <PageIntro eyebrow="blog" title="Notes from the editor.">
        Short, practical explanations of the ideas that trip people up.
      </PageIntro>
      <section className="mx-auto max-w-3xl divide-y px-5">
        {posts.map((p, i) => (
          <article key={p.title} className="animate-fade-up group py-8" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="font-mono text-xs text-muted-foreground">
              {p.date} · <span className="text-accent">{p.tag}</span> · {p.read}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-primary">{p.title}</h2>
            <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
          </article>
        ))}
      </section>
    </>
  );
}
