# My Budget app

## How to start

1. Create Firebase project with [phone auth](https://firebase.google.com/docs/auth/web/phone-auth) and [firestore](https://firebase.google.com/docs/firestore/quickstart) active
2. [setup environment](#setup-environment)
3. Install dependencies with `npm i`
4. Start dev server with `npm run dev`
5. Open browser `http://localhost:3000`

## Setup environment

Create file `.env.local` and copy content of `.env.local.example`

```bash
cp ./.env.local.example ./.env.local
```

### Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Select your project
3. Open "Project Settings" (cog icon)
4. On "General" tab scroll down to "Your apps" section
5. Select web app

* apiKey => `NEXT_PUBLIC_FIREBASE_API_KEY`
* projectId => `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
* appId => `NEXT_PUBLIC_FIREBASE_ADD_ID`
* messagingSenderId => `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`

## Technical details

1. Firebase for client auth and data storage
2. Based on Next JS (at the moment - only client side)
3. Feature-slice project structure
4. Zero-trust policy for data from API - check structure when getting data
5. Either monad for passing errors through data flows
