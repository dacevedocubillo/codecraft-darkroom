import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, seo } from "@/components/site";
import { courses } from "@/lib/content";

export const Route = createFileRoute("/careers")({
  head: () => seo("Tech careers | Forgeline", "Explore tech careers, learn the skills, and practice in realistic workplace simulations.", "/careers"),
  component: Careers,
});

const pathways = [
  { name: "IT Support Specialist", status: "Available", description: "Troubleshoot user issues, investigate sign-in logs, and resolve support tickets in NovaTech.", skills: ["Troubleshooting", "Identity & access", "Customer communication"], simulator: true, courseSlugs: ["py"] },
  { name: "Software Developer", status: "Coming soon", description: "Work in a product team, investigate bugs, review code, and deliver features.", skills: ["JavaScript", "TypeScript", "Git"], simulator: false, courseSlugs: ["js", "ts", "algo"] },
  { name: "Cybersecurity Analyst", status: "Coming soon", description: "Investigate alerts, assess risks, and document incidents in a safe simulated environment.", skills: ["Security fundamentals", "Incident response", "Investigation"], simulator: false, courseSlugs: ["py"] },
  { name: "Data Analyst", status: "Coming soon", description: "Clean data, answer business questions, and explain findings.", skills: ["SQL", "Python", "Data storytelling"], simulator: false, courseSlugs: ["sql", "py"] },
  { name: "QA Engineer", status: "Coming soon", description: "Test applications, reproduce bugs, and report quality issues.", skills: ["Test cases", "Bug reports", "Automation"], simulator: false, courseSlugs: ["js", "ts"] },
  { name: "Cloud & DevOps", status: "Coming soon", description: "Explore deployments, system monitoring, and infrastructure operations.", skills: ["Linux", "Automation", "Deployment"], simulator: false, courseSlugs: ["go", "py"] },
];

function Careers() {
  return (
    <>
      <PageIntro eyebrow="choose your path" title="Find your place in tech.">
        Learn essential skills, then experience what the job actually feels like in a fictional workplace.
      </PageIntro>
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pathways.map((path) => (
            <article key={path.name} className="flex flex-col rounded-xl border bg-card p-6 transition-colors hover:border-primary">
              <p className="font-mono text-xs text-primary">{path.status.toUpperCase()}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold">{path.name}</h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{path.description}</p>
              <p className="mt-5 font-mono text-xs text-muted-foreground">SKILLS YOU'LL PRACTICE</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {path.skills.map((skill) => <span key={skill} className="rounded-md border px-2 py-1 text-xs">{skill}</span>)}
              </div>
              <div className="mt-6 border-t pt-4">
                <p className="mb-3 text-xs text-muted-foreground">Suggested learning</p>
                <div className="mb-5 flex flex-wrap gap-3">
                  {path.courseSlugs.map((slug) => {
                    const course = courses.find((item) => item.slug === slug);
                    return course ? <Link key={slug} to="/courses" className="text-sm text-primary hover:underline">{course.lang} ↗</Link> : null;
                  })}
                </div>
                {path.simulator ? (
                  <Link to="/simulator" className="inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Enter NovaTech simulation →</Link>
                ) : (
                  <span className="inline-flex rounded-md border px-4 py-2.5 text-sm text-muted-foreground">Simulator in development</span>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-xl border bg-card p-7">
          <h2 className="font-display text-2xl font-semibold">Learn → Practice → Demonstrate</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Courses build foundations. Career simulations help you practice workplace decisions. Your completed missions will form a record of skills as Forgeline evolves.</p>
          <Link to="/courses" className="mt-5 inline-block text-primary hover:underline">Explore all courses →</Link>
        </div>
      </section>
    </>
  );
}
