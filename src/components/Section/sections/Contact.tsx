export default function Contact() {
  return (
    <div className="rounded-2xl border border-[color:var(--ring)]/10 bg-[color:var(--surface)]/40 p-6">
      <p className="text-[var(--fg)]/80">
        Prefer email? Reach me at{" "}
        <a href="mailto:rbocchichio@gmail.com" className="text-[var(--accent-fg)] hover:underline">
          rbocchichio@gmail.com
        </a>.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget as HTMLFormElement);
          const subject = encodeURIComponent(`[Portfolio] ${data.get("name")}`);
          const body = encodeURIComponent(String(data.get("message") || ""));
          window.location.href = `mailto:rbocchichio@gmail.com?subject=${subject}&body=${body}`;
        }}
        className="mt-4 grid gap-3 sm:grid-cols-2"
      >
        <input name="name" placeholder="Your name" className="rounded-xl bg-[color:var(--surface)]/80 px-4 py-2 outline-none placeholder:text-[var(--fg)]/40" required />
        <input name="email" type="email" placeholder="Your email (optional)" className="rounded-xl bg-[color:var(--surface)]/80 px-4 py-2 outline-none placeholder:text-[var(--fg)]/40 sm:col-start-1 sm:col-end-3" />
        <textarea name="message" placeholder="Message" rows={4} className="rounded-xl bg-[color:var(--surface)]/80 px-4 py-2 outline-none placeholder:text-[var(--fg)]/40 sm:col-start-1 sm:col-end-3" required />
        <div className="sm:col-start-1 sm:col-end-3">
          <button className="rounded-2xl bg-[color:var(--accent)]/90 px-5 py-2 font-medium text-black hover:bg-[color:var(--accent)] transition-colors">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
