import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { courses } from "@/lib/content";
import { seo } from "@/components/site";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Forgeline — Your first tech job starts here";
const DESC = "Experience your first day in tech. Solve realistic IT support tickets in a fictional workplace simulation.";

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const base = seo(TITLE, DESC, "/");
    const img = loaderData ? `${loaderData.origin}/og.jpg` : null;
    return {
      ...base,
      meta: img
        ? [...base.meta, { property: "og:image", content: img }, { name: "twitter:image", content: img }]
        : base.meta,
    };
  },
  component: Index,
});

const langs = ["JavaScript", "TypeScript", "Python", "Go", "SQL", "Rust", "React", "Node.js", "Docker", "Git"];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="animate-fade-up font-mono text-sm text-primary">// learn by doing</p>
            <h1 className="animate-fade-up mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl" style={{ animationDelay: "80ms" }}>
              Your first tech job <span className="text-primary">starts here</span>.
            </h1>
            <p className="animate-fade-up mt-6 max-w-md text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
              Step into a fictional tech company, investigate real-world-style problems, and build confidence before your first day on the job.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Link to="/courses" className="rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                Browse courses
              </Link>
              <Link to="/blog" className="rounded-md border px-5 py-3 font-medium transition-colors hover:border-primary">
                Read the blog
              </Link>
            </div>
          </div>
          <div className="animate-fade-up relative" style={{ animationDelay: "200ms" }}>
            <img src={hero} alt="Laptop with a code editor on a desk at night" width={1600} height={1008} fetchPriority="high" className="rounded-xl border object-cover shadow-2xl" />
            <pre className="absolute -bottom-6 -left-4 rounded-lg border bg-code p-4 font-mono text-xs leading-relaxed text-code-foreground shadow-xl md:-left-10 md:text-sm">
              <span className="text-accent">const</span> you = <span className="text-primary">new</span> Developer();{"\n"}
              you.<span className="text-primary">build</span>(<span className="text-accent">"first app"</span>);<span className="animate-blink">▋</span>
            </pre>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y py-4" aria-hidden>
        <div className="animate-marquee flex w-max gap-12 font-mono text-sm text-muted-foreground">
          {[...langs, ...langs].map((l, i) => (
            <span key={i}><span className="text-primary">#</span> {l}</span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-8">
          <p className="font-mono text-sm text-primary">// career pathways</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Choose a career. Experience the work.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Explore a path, learn essential skills, and step into a fictional workplace to solve realistic challenges.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <Link to="/simulator" className="rounded-xl border bg-card p-6 transition-colors hover:border-primary">
            <span className="font-mono text-xs text-primary">AVAILABLE NOW</span>
            <h3 className="mt-3 font-display text-xl font-semibold">IT Support Specialist</h3>
            <p className="mt-2 text-sm text-muted-foreground">Join NovaTech, investigate account issues and resolve your first service desk ticket.</p>
            <p className="mt-5 font-mono text-sm text-primary">Start simulation →</p>
          </Link>
          {[
            ["Software Development", "Debug applications, review code and ship features."],
            ["Cybersecurity", "Investigate security alerts and respond to incidents."],
            ["Data Analytics & QA", "Analyze data and test software quality."],
          ].map(([name, description]) => (
            <div key={name} className="rounded-xl border bg-card p-6 opacity-75">
              <span className="font-mono text-xs text-muted-foreground">COMING SOON</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["01", "Build, don't watch", "Every module is a working project. You write the code; we review it."],
            ["02", "Real tools", "Git, the terminal, a real editor and real deployments from week one."],
            ["03", "Mentor feedback", "Working engineers review your pull requests within 48 hours."],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-xl border bg-card p-6 transition-colors hover:border-primary">
              <p className="font-mono text-sm text-primary">{n}</p>
              <h2 className="mt-3 font-display text-xl font-semibold">{t}</h2>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">Popular courses</h2>
          <Link to="/courses" className="font-mono text-sm text-primary hover:underline">all courses →</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <div key={c.slug} className="rounded-xl border bg-card p-6 transition-transform hover:-translate-y-1">
              <p className="font-mono text-xs text-accent">{c.lang} · {c.level}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
