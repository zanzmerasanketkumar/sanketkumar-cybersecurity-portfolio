# SanketKumar Zanzmera Portfolio

Professional Cybersecurity / SOC Analyst portfolio built with Next.js.

## Real contact email

The contact form uses a server-side Next.js API route and Resend. The Resend API key is never exposed to the browser.

1. Create/configure a Resend account and API key.
2. Copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY`.
4. Set `CONTACT_TO_EMAIL=sanketzanzmera@gmail.com`.
5. For production, verify your sending domain in Resend and set `CONTACT_FROM_EMAIL` to an address on that domain.
6. Run `npm install` and `npm run dev`.

Direct contact links use the real email address:
`sanketzanzmera@gmail.com`

The contact form sends visitor email as `Reply-To`, so replying to the received message goes directly back to the visitor.
