import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Agent Studio",
  description:
    "How Agent Studio, a personal self-hosted assistant, uses Google Calendar and Gmail data.",
};

const updated = "November 26, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight text-ivory">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-accent underline-offset-4 hover:underline">
      {children}
    </a>
  );
}

export default function Privacy() {
  return (
    <main className="px-6 py-20 sm:py-28">
      <article className="mx-auto max-w-2xl">
        <a href="/" className="font-mono text-sm text-muted hover:text-ivory">
          ← Chhuong Le
        </a>

        <h1 className="mt-10 text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tight text-ivory">
          Agent Studio Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-sm text-muted">Last updated {updated}</p>

        <Section title="What Agent Studio is">
          <p>
            Agent Studio is a personal assistant that Chhuong Le runs on a home server for
            personal use. It is not a public service: there is no sign-up, and it can only be
            reached from a private network. The only Google account connected to it is the
            owner&apos;s own.
          </p>
        </Section>

        <Section title="Google data it accesses">
          <p>When the account owner connects a Google account, Agent Studio asks for:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-ivory">Google Calendar events</span> on the primary calendar,
              to answer questions about the schedule and to create, change or delete events.
            </li>
            <li>
              <span className="text-ivory">Gmail</span>, to search and read messages, to send
              email, and to move messages to the trash.
            </li>
          </ul>
        </Section>

        <Section title="How the data is used">
          <p>
            Google data is used only to answer the account owner&apos;s own requests. Every action
            that changes something (creating, editing or deleting an event, sending an email,
            trashing messages, or unsubscribing from a mailing list) is shown to the owner first
            and happens only after the owner approves it.
          </p>
          <p>
            To answer a request, the relevant calendar or email content is sent to the AI model
            provider that powers the assistant (currently Anthropic and OpenAI), for that request
            only. Agent Studio does not use Google data for advertising, does not sell it, and
            does not use it to develop, improve or train AI or machine-learning models.
          </p>
        </Section>

        <Section title="Storage and security">
          <p>
            The Google sign-in token is stored on the owner&apos;s private server in a file that only
            the server administrator can read. Calendar and email content is fetched from Google
            when it is needed rather than copied into a separate database. Content the assistant
            reads can remain in the conversation history on that same server until the owner
            deletes it. Nothing is stored anywhere else.
          </p>
        </Section>

        <Section title="Sharing">
          <p>
            Google data is not shared with anyone apart from the AI model provider described
            above, which processes it only to carry out the owner&apos;s request. It is never sold
            or transferred to data brokers or advertisers.
          </p>
        </Section>

        <Section title="Revoking access">
          <p>
            Access can be removed at any time from{" "}
            <Ext href="https://myaccount.google.com/permissions">Google Account permissions</Ext>.
            The server stops being able to read the account as soon as access is removed.
          </p>
        </Section>

        <Section title="Google API Services User Data Policy">
          <p>
            Agent Studio&apos;s use and transfer of information received from Google APIs adheres to
            the{" "}
            <Ext href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </Ext>
            , including the Limited Use requirements.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy:{" "}
            <Ext href="mailto:chhuongcle@gmail.com">chhuongcle@gmail.com</Ext>
          </p>
        </Section>
      </article>
    </main>
  );
}
