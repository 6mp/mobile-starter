# Mobile Starter

A monetization-ready React Native starter.

**Stack:** [Convex](https://convex.dev) + [Clerk](https://clerk.dev) + [Expo](https://expo.dev) + [HeroUI Native](https://heroui.org) + [RevenueCat](https://revenuecat.com)

## What You Get

- Clerk auth (Google, Apple, Email) wired to Convex
- RevenueCat SDK with provider for purchases, entitlements, and identity sync
- Webhook endpoint receiving all RevenueCat event types into Convex
- Secure subscription queries (auth-guarded, real-time)
- Subscription status card, paywall, settings with sign-out and account deletion

---

## Getting Started

### 1. Install

Install [Bun](https://bun.sh) if you haven't, then:

```sh
git clone <repo-url>
cd mobile-starter
bun install
```

### 2. Set up Convex

```sh
cd packages/backend
bunx convex dev
```

This will log you into Convex and create a project (free). Leave this running — it watches for changes and deploys automatically.

Copy the deployment URL from the output (looks like `https://something-something-123.convex.cloud`). You'll need it in Step 5.

### 3. Set up Clerk

1. Go to [clerk.com](https://clerk.com) and create an application
2. Enable **Google** and **Apple** as social connection providers
3. Go to **JWT Templates** → create a template using the **Convex** preset
4. Copy the **Issuer URL** from the JWT template (looks like `https://your-instance.clerk.accounts.dev`)
5. Go to your [Convex dashboard](https://dashboard.convex.dev) → your project → **Settings** → **Environment Variables**
6. Add `CLERK_ISSUER_URL` = the issuer URL you copied

Then copy your **Publishable Key** from [Clerk API Keys](https://dashboard.clerk.com/last-active?path=api-keys) (starts with `pk_test_`). You'll need it in Step 5.

### 4. Set up RevenueCat

#### 4.1 Create project

1. Go to [app.revenuecat.com](https://app.revenuecat.com) → **Create New Project**
2. Run through the wizard — create an entitlement (e.g. `pro`) and offering
3. Copy your API key (starts with `test_`)

> Remember your entitlement name exactly — it's case-sensitive.

#### 4.2 Connect webhook to Convex

Generate a webhook secret:

```sh
openssl rand -base64 32
```

Set it in Convex:

```sh
cd packages/backend
bunx convex env set REVENUECAT_WEBHOOK_AUTH <your-generated-secret>
```

Set your entitlement ID in Convex (must match RevenueCat exactly):

```sh
bunx convex env set REVENUECAT_ENTITLEMENT_ID pro
```

Now configure RevenueCat to send webhooks:

1. In RevenueCat → **Integrations** → **Webhooks** → **+ New**
2. Fill in:

| Field | Value |
|-------|-------|
| **Name** | `Convex` |
| **Webhook URL** | `https://your-deployment.convex.site/webhooks/revenuecat` |
| **Authorization header** | The secret you generated above |

> The webhook URL uses `.site` (not `.cloud`). You can find it in the Convex dashboard or in `packages/backend/.env.local`.

3. Save, then click **Send Test Event** — you should see a green checkmark
4. Verify in [Convex dashboard](https://dashboard.convex.dev) → **Data** → **revenuecat** → **webhookEvents** table — you should see a `TEST` event

### 5. Configure environment

Edit `apps/native/.env`:

```sh
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# RevenueCat
EXPO_PUBLIC_REVENUECAT_IOS_KEY=test_your_key_here
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=test_your_key_here
EXPO_PUBLIC_REVENUECAT_ENTITLEMENT_ID=pro
EXPO_PUBLIC_REVENUECAT_OFFERING_ID=default
```

### 6. Run

Make sure Convex is still running from Step 2, then in a new terminal:

```sh
cd apps/native
bun start
```

Press `i` for iOS simulator or `a` for Android emulator.

---

## Architecture

```
┌─────────────────┐
│  React Native   │  User makes purchase
│      App        │  (RevenueCat SDK)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ RevenueCat API  │  Processes purchase
└────────┬────────┘
         │ Webhook
         ▼
┌─────────────────┐
│ Convex Backend  │  Stores subscription
└────────┬────────┘
         │ Reactive query
         ▼
┌─────────────────┐
│  React Native   │  UI auto-updates
│      App        │  (no refresh needed)
└─────────────────┘
```

---

## Going to Production (iOS)

See [docs/APP-STORE-SETUP.md](./docs/APP-STORE-SETUP.md) for connecting App Store Connect, creating subscriptions, and testing with sandbox.

---

## Troubleshooting

**401 Unauthorized on webhook?**
- `REVENUECAT_WEBHOOK_AUTH` in Convex must match the Authorization header in RevenueCat exactly.

**404 Not Found on webhook?**
- URL must end with `/webhooks/revenuecat` and use `.site` not `.cloud`.

**Purchase succeeded but no entitlement?**
- Entitlement ID must match exactly in RevenueCat, client `.env`, and Convex env var. Case-sensitive, spaces matter.

**Types not found?**
- Restart `bunx convex dev` and wait for "Convex functions ready!"

**Auth redirect not working?**
- Make sure Clerk has Google/Apple social connections enabled and the JWT template uses the Convex preset.

---

## License

MIT
