export default function Contact() {
  return (
    <div className="surface-card p-6">
      <p className="text-[var(--fg)]/80">
        Prefer email? Reach me at{" "}
        <a
          href="mailto:rbocchichio@gmail.com"
          className="text-[var(--accent-fg)] hover:underline"
        >
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
        <input name="name" placeholder="Your name" className="input sm:col-start-1 sm:col-end-3" required />
        <input name="email" type="email" placeholder="Your email (optional)" className="input sm:col-start-1 sm:col-end-3" />
        <textarea name="message" placeholder="Message" rows={4} className="textarea sm:col-start-1 sm:col-end-3" required />
        <div className="sm:col-start-1 sm:col-end-3">
          <button className="btn btn-accent">Send</button>
        </div>
      </form>
    </div>
  );
}
