import { createFileRoute } from "@tanstack/react-router";
import team from "@/assets/team.jpg";
import { PageIntro, seo } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => seo("About Forgeline — Who we are", "Forgeline is a small team of engineers teaching programming through real, reviewed projects.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro eyebrow="about" title="Engineers who like teaching.">
        We started Forgeline because most tutorials stop right before things get real.
      </PageIntro>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <img src={team} alt="Developers pair programming at a shared table" width={1000} height={716} loading="lazy" className="rounded-xl border object-cover" />
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>Our mentors have built payment systems, search engines and mobile apps used by millions. Now they review your code.</p>
          <p>Every course is project-first: you learn a concept, use it immediately, and get feedback from someone who does it for a living.</p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[["12k+", "students"], ["40", "mentors"], ["94%", "finish rate"]].map(([n, l]) => (
              <div key={l} className="rounded-lg border bg-card p-4 text-center">
                <p className="font-display text-2xl font-bold text-primary">{n}</p>
                <p className="font-mono text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
