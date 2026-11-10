import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, CircleHelp, ClipboardList, LockKeyhole, Mail, Monitor, RotateCcw, Search, ShieldCheck, Terminal, UserRound } from "lucide-react";

export const Route = createFileRoute("/simulator")({
  component: Simulator,
});

type Stage = "welcome" | "office" | "complete";
type Tool = "account" | "logs" | "knowledge";
const storageKey = "forgeline-novatech-alpha-v1";

function Simulator() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [inspected, setInspected] = useState<Tool[]>([]);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [tab, setTab] = useState<"tickets" | "inbox" | "team">("tickets");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (saved.stage === "office" || saved.stage === "complete") setStage(saved.stage);
      if (Array.isArray(saved.inspected)) setInspected(saved.inspected.filter((t: string) => ["account", "logs", "knowledge"].includes(t)));
    } catch { /* optional local progress */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify({ stage, inspected }));
  }, [stage, inspected, ready]);

  function inspect(tool: Tool) {
    setInspected(prev => prev.includes(tool) ? prev : [...prev, tool]);
    setFeedback("");
  }
  function resolve() {
    if (!selected) return setFeedback("Choose a resolution before submitting.");
    if (inspected.length < 2) return setFeedback("Investigate at least two resources before deciding. Evidence matters.");
    if (selected === "unlock") {
      setFeedback("");
      setStage("complete");
    } else {
      setFeedback(selected === "reset" ? "Not quite. The logs show the password is correct. Check the account status before resetting credentials." : "Escalation is available, but the evidence suggests you can safely resolve this issue using the documented procedure.");
    }
  }
  function reset() {
    setStage("welcome"); setInspected([]); setSelected(""); setFeedback(""); setTab("tickets");
    localStorage.removeItem(storageKey);
  }

  const toolContent: Record<Tool, {title: string; lines: string[]}> = {
    account: { title: "Identity console · Maya Chen", lines: ["Account: maya.chen@novatech.example", "Identity verified: YES · simulated", "Account status: LOCKED", "Lock reason: 5 unsuccessful attempts", "Password status: VALID · no reset required"] },
    logs: { title: "Authentication events", lines: ["09:11 · Failed sign-in · incorrect password", "09:12 · Failed sign-in · incorrect password", "09:14 · Failed sign-in · incorrect password", "09:16 · Failed sign-in · incorrect password", "09:17 · Account locked by security policy", "09:23 · Correct password rejected: ACCOUNT_LOCKED"] },
    knowledge: { title: "KB-104 · Locked accounts", lines: ["1. Verify the user's identity using the approved workflow.", "2. Confirm the lock reason and review recent authentication events.", "3. If no suspicious activity is indicated, unlock the account.", "4. Ask the user to sign in and confirm access.", "5. Document the action in the ticket."] },
  };

  return (
    <div className="min-h-[75vh] bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div><p className="font-mono text-xs uppercase tracking-[.22em] text-primary">Forgeline / Career simulator</p><h1 className="mt-2 font-display text-3xl font-bold">NovaTech <span className="text-primary">Workspace</span></h1></div>
          <button onClick={reset} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs hover:bg-secondary"><RotateCcw size={14}/> Reset simulation</button>
        </div>
        {stage === "welcome" ? (
          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-2xl border bg-card p-8 md:p-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"><Mail size={13}/> New offer · Fictional simulation</div>
              <p className="text-sm text-muted-foreground">FROM: Alex Rivera · IT Operations Lead</p>
              <h2 className="mt-5 font-display text-4xl font-bold leading-tight">Welcome to your <span className="text-primary">first day.</span></h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">You've joined NovaTech as a Junior IT Support Specialist. Your teammates are counting on you to investigate real-world-style problems in a safe, simulated workplace.</p>
              <div className="mt-7 rounded-xl border bg-background p-5"><p className="font-mono text-xs text-primary">YOUR ROLE</p><p className="mt-2 font-semibold">Junior IT Support Specialist</p><p className="mt-1 text-sm text-muted-foreground">Team: Service Desk · Day 01 · Training environment</p></div>
              <button onClick={() => setStage("office")} className="mt-7 flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">Accept offer & enter workspace <ArrowRight size={17}/></button>
              <p className="mt-4 text-xs text-muted-foreground">This is a fictional training experience, not an employment offer.</p>
            </div>
            <div className="space-y-4">
              {[["01", "Open your first ticket", "Read the user's request and identify the problem."], ["02", "Investigate the evidence", "Explore simulated tools, logs and knowledge articles."], ["03", "Resolve & learn", "Choose a resolution and get actionable feedback."]].map(([n,t,d]) => <div key={n} className="rounded-xl border bg-card p-5"><p className="font-mono text-sm text-primary">{n} / ONBOARDING</p><h3 className="mt-2 font-display text-lg font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>)}
            </div>
          </div>
        ) : stage === "complete" ? (
          <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center md:p-12">
            <CheckCircle2 className="mx-auto text-primary" size={54}/>
            <p className="mt-5 font-mono text-xs tracking-widest text-primary">TICKET #001 · RESOLVED</p>
            <h2 className="mt-3 font-display text-4xl font-bold">First ticket, done.</h2>
            <p className="mt-4 text-muted-foreground">You investigated the account lock, checked the evidence, and selected the documented resolution. That's how good support work begins.</p>
            <div className="mt-7 grid grid-cols-3 gap-2 text-sm">{["Troubleshooting", "Security awareness", "Documentation"].map(x => <div key={x} className="rounded-lg border bg-background p-3"><ShieldCheck className="mx-auto mb-2 text-primary" size={19}/>{x}</div>)}</div>
            <p className="mt-6 text-xs text-muted-foreground">Alpha mission complete. More workplace scenarios are coming soon.</p>
            <button onClick={reset} className="mt-6 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Play again</button>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="rounded-xl border bg-card p-4">
              <p className="mb-5 font-mono text-xs text-muted-foreground">NOVATECH · SERVICE DESK</p>
              {[{id:"tickets",icon:ClipboardList,label:"Tickets"},{id:"inbox",icon:Mail,label:"Inbox"},{id:"team",icon:UserRound,label:"Team chat"}].map(item => <button key={item.id} onClick={() => setTab(item.id as typeof tab)} className={`mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm ${tab===item.id?"bg-primary/15 text-primary":"hover:bg-secondary"}`}><item.icon size={17}/>{item.label}</button>)}
              <div className="mt-8 rounded-lg border bg-background p-3"><p className="font-mono text-xs text-muted-foreground">DAY 01 PROGRESS</p><p className="mt-2 text-sm">{inspected.length}/3 resources explored</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-primary transition-all" style={{width:`${inspected.length/3*100}%`}}/></div></div>
            </aside>
            <div className="space-y-5">
              {tab !== "tickets" ? <div className="rounded-xl border bg-card p-7"><p className="font-mono text-xs text-primary">{tab === "inbox" ? "INBOX · 1 MESSAGE" : "TEAM CHAT · NOVATECH"}</p><h2 className="mt-3 text-xl font-semibold">{tab === "inbox" ? "Welcome to the team!" : "Alex Rivera · IT Lead"}</h2><p className="mt-3 text-muted-foreground">{tab === "inbox" ? "Hi! Your first support ticket is ready. Remember: investigate before making changes. — Alex" : "Hey, welcome aboard! Our knowledge base has the procedure for account lockouts. Let me know once you have a resolution."}</p><button onClick={()=>setTab("tickets")} className="mt-5 flex items-center gap-2 text-sm text-primary">Go to ticket <ArrowRight size={15}/></button></div> : <>
                <div className="rounded-xl border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-xs text-primary">TICKET #001 · ACCESS MANAGEMENT</p><span className="rounded-full border px-3 py-1 text-xs">Open · Medium priority</span></div>
                  <h2 className="mt-3 font-display text-2xl font-bold">I can't sign in to my account</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Submitted by Maya Chen · Marketing · 09:25 AM</p>
                  <div className="mt-5 rounded-lg border bg-background p-4 text-sm leading-relaxed"><p className="mb-2 font-semibold">Maya Chen</p>“Hi! I tried signing in a few times this morning and now it says my account is locked. I think I remember my password. Can you help? I have a meeting in 20 minutes.”</div>
                </div>
                <div className="rounded-xl border bg-card p-6"><h3 className="flex items-center gap-2 font-display text-xl font-semibold"><Search size={20} className="text-primary"/> Investigate</h3><p className="mt-1 text-sm text-muted-foreground">Explore at least two resources before submitting your resolution.</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {([{id:"account",label:"Account console",icon:LockKeyhole},{id:"logs",label:"Sign-in logs",icon:Terminal},{id:"knowledge",label:"Knowledge base",icon:CircleHelp}] as const).map(t => <button key={t.id} onClick={()=>inspect(t.id)} className={`flex items-center justify-between gap-2 rounded-lg border p-3 text-left text-sm hover:border-primary ${inspected.includes(t.id)?"border-primary/50 bg-primary/5":""}`}><span className="flex items-center gap-2"><t.icon size={16}/>{t.label}</span>{inspected.includes(t.id) && <CheckCircle2 size={14} className="text-primary"/>}</button>)}
                  </div>
                  {inspected.length > 0 && <div className="mt-4 space-y-3">{inspected.map(t => <div key={t} className="rounded-lg border bg-background p-4"><p className="mb-3 font-mono text-xs text-primary">{toolContent[t].title}</p>{toolContent[t].lines.map(line => <p key={line} className="py-1 font-mono text-xs text-muted-foreground">{line}</p>)}</div>)}</div>}
                </div>
                <div className="rounded-xl border bg-card p-6"><h3 className="font-display text-xl font-semibold">Resolve the ticket</h3><p className="mt-1 text-sm text-muted-foreground">Choose the action best supported by your investigation.</p>
                  <div className="mt-4 space-y-2">{[{id:"reset",label:"Reset Maya's password immediately"},{id:"unlock",label:"Verify identity, unlock account, and confirm sign-in"},{id:"escalate",label:"Escalate without further action"}].map(x=><label key={x.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm ${selected===x.id?"border-primary bg-primary/5":"hover:bg-secondary"}`}><input type="radio" name="resolution" value={x.id} checked={selected===x.id} onChange={()=>{setSelected(x.id);setFeedback("");}} className="accent-amber-400"/>{x.label}</label>)}</div>
                  {feedback && <p role="alert" className="mt-4 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">{feedback}</p>}
                  <button onClick={resolve} className="mt-5 flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground">Submit resolution <ArrowRight size={17}/></button>
                </div>
              </>}
            </div>
          </div>
        )}
        <div className="mt-10 flex items-center justify-between border-t pt-5 text-xs text-muted-foreground"><Link to="/" className="flex items-center gap-1 hover:text-primary"><ChevronLeft size={14}/> Back to Forgeline</Link><span className="flex items-center gap-1"><Monitor size={13}/> Fictional training · Alpha v0.1</span></div>
      </div>
    </div>
  );
}
