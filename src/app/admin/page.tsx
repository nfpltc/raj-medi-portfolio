"use client";

import { useState, useEffect, useCallback } from "react";
import type { Experience } from "@/lib/data";

/* ── types ── */

interface ResumeInfo {
  name: string;
  url?: string;
  size?: number;
  uploaded?: string;
  fallback?: boolean;
}

/* ── login screen ── */

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      onLogin();
    } else {
      setError("Invalid password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
      >
        <h1 className="text-2xl font-semibold text-white">Admin</h1>
        <p className="mt-1 text-sm text-white/40">
          Enter your password to manage this site.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-6 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#4da3ff]/50"
        />

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* ── experience editor ── */

const EMPTY_EXPERIENCE: Experience = {
  role: "",
  company: "",
  location: "",
  period: "",
  description: "",
  highlights: [""],
};

function ExperienceCard({
  item,
  index,
  onChange,
  onDelete,
  onMove,
  total,
}: {
  item: Experience;
  index: number;
  onChange: (updated: Experience) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
  total: number;
}) {
  const [open, setOpen] = useState(false);

  function updateField<K extends keyof Experience>(key: K, val: Experience[K]) {
    onChange({ ...item, [key]: val });
  }

  function updateHighlight(i: number, val: string) {
    const next = [...item.highlights];
    next[i] = val;
    onChange({ ...item, highlights: next });
  }

  function addHighlight() {
    onChange({ ...item, highlights: [...item.highlights, ""] });
  }

  function removeHighlight(i: number) {
    onChange({
      ...item,
      highlights: item.highlights.filter((_, idx) => idx !== i),
    });
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!open); } }}
        className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <p className="font-medium text-white">
            {item.role || "New Entry"}
          </p>
          <p className="text-sm text-white/40">
            {item.company || "Company"} · {item.period || "Period"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {index > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMove(-1); }}
              className="rounded p-1 text-white/30 hover:text-white"
              title="Move up"
            >
              ↑
            </button>
          )}
          {index < total - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onMove(1); }}
              className="rounded p-1 text-white/30 hover:text-white"
              title="Move down"
            >
              ↓
            </button>
          )}
          <span className="text-white/30">{open ? "▾" : "▸"}</span>
        </div>
      </div>

      {open && (
        <div className="space-y-4 border-t border-white/[0.06] px-5 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Role" value={item.role} onChange={(v) => updateField("role", v)} />
            <Field label="Company" value={item.company} onChange={(v) => updateField("company", v)} />
            <Field label="Location" value={item.location} onChange={(v) => updateField("location", v)} />
            <Field label="Period" value={item.period} onChange={(v) => updateField("period", v)} />
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/40">Description</label>
            <textarea
              value={item.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#4da3ff]/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs text-white/40">Highlights</label>
            {item.highlights.map((h, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  value={h}
                  onChange={(e) => updateHighlight(i, e.target.value)}
                  placeholder={`Highlight ${i + 1}`}
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#4da3ff]/50"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(i)}
                  className="rounded px-2 text-sm text-red-400/60 hover:text-red-400"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-sm text-[#4da3ff]/60 hover:text-[#4da3ff]"
            >
              + Add highlight
            </button>
          </div>

          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-red-400/60 hover:text-red-400"
          >
            Delete this entry
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-white/40">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#4da3ff]/50"
      />
    </div>
  );
}

/* ── resume upload ── */

function ResumeSection() {
  const [info, setInfo] = useState<ResumeInfo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadInfo = useCallback(async () => {
    const res = await fetch("/api/admin/resume");
    if (res.ok) setInfo(await res.json());
  }, []);

  useEffect(() => { loadInfo(); }, [loadInfo]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg("");

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/admin/resume", { method: "POST", body: form });
    setUploading(false);

    if (res.ok) {
      setMsg("Resume uploaded successfully.");
      loadInfo();
    } else {
      const data = await res.json();
      setMsg(data.error || "Upload failed.");
    }
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
      <h3 className="text-lg font-medium text-white">Resume</h3>
      <p className="mt-1 text-sm text-white/40">
        Upload a PDF or HTML file. Visitors download it from the public site.
      </p>

      {info && (
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <p className="text-sm text-white/70">
            Current: <span className="text-white">{info.name}</span>
            {info.fallback && (
              <span className="ml-2 text-xs text-white/30">(static file)</span>
            )}
          </p>
          {info.size && (
            <p className="text-xs text-white/30">
              {(info.size / 1024).toFixed(1)} KB
            </p>
          )}
        </div>
      )}

      <label className="mt-4 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/10 px-4 py-8 transition-colors hover:border-[#4da3ff]/30">
        <input
          type="file"
          accept=".pdf,.html,.htm"
          onChange={handleUpload}
          className="hidden"
        />
        <span className="text-sm text-white/40">
          {uploading ? "Uploading…" : "Click to upload new resume"}
        </span>
      </label>

      {msg && (
        <p className={`mt-3 text-sm ${msg.includes("success") ? "text-emerald-400" : "text-red-400"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}

/* ── dashboard ── */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((r) => r.json())
      .then((data) => {
        setExperience(data);
        setLoading(false);
      });
  }, []);

  function updateEntry(index: number, updated: Experience) {
    setExperience((prev) => prev.map((e, i) => (i === index ? updated : e)));
  }

  function deleteEntry(index: number) {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  }

  function moveEntry(index: number, dir: -1 | 1) {
    setExperience((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function addEntry() {
    setExperience((prev) => [{ ...EMPTY_EXPERIENCE, highlights: [""] }, ...prev]);
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg("");
    const res = await fetch("/api/admin/experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experience),
    });
    setSaving(false);
    if (res.ok) {
      setSaveMsg("Saved successfully.");
    } else {
      const data = await res.json();
      setSaveMsg(data.error || "Save failed.");
    }
    setTimeout(() => setSaveMsg(""), 3000);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#050507]">
      <header className="border-b border-white/[0.06] px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-white">Site Admin</h1>
            <p className="text-xs text-white/30">sumanrajmedikondu.com</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="text-sm text-white/40 hover:text-white"
            >
              View site →
            </a>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/50 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
        {/* Resume */}
        <ResumeSection />

        {/* Experience */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-white">Experience</h2>
              <p className="text-sm text-white/40">
                Edit roles, companies, and highlights shown on the public site.
              </p>
            </div>
            <button
              onClick={addEntry}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/60 hover:text-white"
            >
              + Add entry
            </button>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-white/30">Loading…</p>
          ) : (
            <div className="space-y-3">
              {experience.map((item, i) => (
                <ExperienceCard
                  key={i}
                  item={item}
                  index={i}
                  total={experience.length}
                  onChange={(updated) => updateEntry(i, updated)}
                  onDelete={() => deleteEntry(i)}
                  onMove={(dir) => moveEntry(i, dir)}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saveMsg && (
              <p className={`text-sm ${saveMsg.includes("success") ? "text-emerald-400" : "text-red-400"}`}>
                {saveMsg}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── main ── */

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((r) => {
        if (r.ok) setAuthed(true);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050507]">
        <p className="text-sm text-white/30">Loading…</p>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}
