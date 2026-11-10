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

      <section className="mx-auto max-w-6xl px-5 py-20" id="careers">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-primary">// explore careers</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Choose your path in tech.</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Discover a career, build the skills, and experience the work in a fictional company.</p>
          </div>
          <Link to="/careers" className="font-mono text-sm text-primary hover:underline">Explore all careers →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "IT Support", detail: "Troubleshoot real-world-style tickets at NovaTech.", skills: "Troubleshooting · Identity · Service Desk", available: true },
            { name: "Software Development", detail: "Debug applications, review code and build features.", skills: "JavaScript · TypeScript · Git", available: false },
            { name: "Cybersecurity", detail: "Investigate alerts and respond to security incidents.", skills: "Security · Investigation · Response", available: false },
            { name: "Data Analytics", detail: "Turn messy data into meaningful decisions.", skills: "SQL · Python · Reporting", available: false },
            { name: "QA Testing", detail: "Find defects, test releases and improve quality.", skills: "Testing · Bug reports · Automation", available: false },
            { name: "Cloud & DevOps", detail: "Understand deployments and infrastructure.", skills: "Cloud · Linux · CI/CD", available: false },
          ].map((career) => (
            <article key={career.name} className="flex flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary">
              <span className={career.available ? "font-mono text-xs text-primary" : "font-mono text-xs text-muted-foreground"}>{career.available ? "SIMULATOR AVAILABLE" : "COMING SOON"}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{career.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{career.detail}</p>
              <p className="mt-5 text-xs text-muted-foreground">{career.skills}</p>
              <Link to={career.available ? "/simulator" : "/careers"} className="mt-5 inline-block text-sm font-medium text-primary hover:underline">
                {career.available ? "Start simulation →" : "Explore career →"}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-xl border bg-card p-7 md:p-10">
          <p className="font-mono text-sm text-primary">// how it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Learn. Practice. Experience.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Learn", "Build a foundation with practical courses and resources."],
              ["02", "Practice", "Investigate realistic workplace tasks and make decisions."],
              ["03", "Experience", "Complete missions and build confidence in your chosen career."],
            ].map(([number, title, detail]) => (
              <div key={number}>
                <p className="font-mono text-sm text-primary">{number}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
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
