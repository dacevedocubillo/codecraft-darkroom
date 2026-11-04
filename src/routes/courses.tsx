import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, seo } from "@/components/site";
import { courses } from "@/lib/content";

export const Route = createFileRoute("/courses")({
  head: () => seo("Programming Courses — Forgeline", "Project-based courses in JavaScript, TypeScript, Python, SQL, Go and algorithms, from beginner to advanced.", "/courses"),
  component: Courses,
});

function Courses() {
  return (
    <>
      <PageIntro eyebrow="courses" title="Pick a language. Ship a project.">
        Six tracks, each ending in a portfolio-ready project reviewed by a mentor.
      </PageIntro>
      <section className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => (
          <article key={c.slug} className="animate-fade-up flex flex-col rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="rounded bg-secondary px-2 py-1 text-accent">{c.lang}</span>
              <span className="text-muted-foreground">{c.weeks} weeks</span>
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">{c.title}</h2>
            <p className="mt-2 flex-1 text-muted-foreground">{c.desc}</p>
            <p className="mt-5 font-mono text-xs text-primary">level: {c.level.toLowerCase()}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="rounded-xl border bg-code p-8 text-code-foreground md:p-12">
          <h2 className="font-display text-2xl font-bold">Not sure where to start?</h2>
          <p className="mt-2 opacity-80">Tell us your goal and we'll suggest a learning path.</p>
          <Link to="/contact" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground">Ask us</Link>
        </div>
      </section>
    </>
  );
}
