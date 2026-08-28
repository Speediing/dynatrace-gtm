# Dynatrace x SpaceXAI

Password-protected Next.js site with three illustrative Grok Bot workflows for Dynatrace GTM:

- A source-backed target account brief.
- A post-call follow-up draft from approved meeting notes.
- A sourced response to a technical or procurement question.

Each detailed demo keeps the chat beside the agent computer. Every customer-facing action remains a draft until a person approves it.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default password is `land2expand`. Set `SITE_PASSWORD` to override it.

The lockup uses the official Dynatrace wordmark from
`https://assets.dynatrace.com/content/dam/dynatrace/misc/dynatrace_web.png`.
`public/brand/dynatrace-wordmark.png` crops only the source file's empty border.
The mark's colors and proportions are unchanged.

## Optional demo clips

Place the Krista Letz demo clips in `private/media/krista-clips/`. The password-protected `/api/media/...` route serves them.

## Check the site

```bash
npm run lint
npm run build
```
