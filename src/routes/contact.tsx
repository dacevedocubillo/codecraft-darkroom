import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageIntro, seo } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Forgeline", "Questions about courses, mentoring or teams? Send us a message and we'll reply within a day.", "/contact"),
  component: Contact,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name || name.length > 100) next.name = "Please enter your name (max 100 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) next.email = "Please enter a valid email.";
    if (message.length < 10 || message.length > 1000) next.message = "Message must be 10–1000 characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      e.currentTarget.reset();
    }
  };

  const field = "w-full rounded-md border bg-card px-4 py-3 outline-none transition-colors focus:border-primary";

  return (
    <>
      <PageIntro eyebrow="contact" title="Say hello.">
        Questions about a course, team plans or mentoring? We reply within one business day.
      </PageIntro>
      <section className="mx-auto max-w-xl px-5">
        {sent ? (
          <div className="animate-fade-up rounded-xl border border-primary bg-card p-8 text-center">
            <p className="font-mono text-primary">200 OK</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Thanks — message received.</h2>
            <button onClick={() => setSent(false)} className="mt-6 font-mono text-sm text-muted-foreground hover:text-foreground">send another →</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            {(["name", "email"] as const).map((k) => (
              <div key={k}>
                <label htmlFor={k} className="mb-1.5 block font-mono text-sm capitalize">{k}</label>
                <input id={k} name={k} type={k === "email" ? "email" : "text"} maxLength={k === "email" ? 255 : 100} className={field} />
                {errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block font-mono text-sm">Message</label>
              <textarea id="message" name="message" rows={6} maxLength={1000} className={field} />
              {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
            </div>
            <button type="submit" className="w-full rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
              Send message
            </button>
          </form>
        )}
      </section>
    </>
  );
}
