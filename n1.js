/*
================================================================================
   CI/CD PIPELINE: GitHub Actions + Vercel Deployment
   Run Tests → If Pass → Deploy to Vercel
================================================================================

OVERVIEW
--------
By default, when you import a GitHub repo into Vercel, they sync automatically.
Every push to GitHub triggers an immediate Vercel deployment.

We want to CHANGE this behavior:
  Push to GitHub → Run Tests → Tests Pass? → Deploy to Vercel
                              → Tests Fail? → NO deployment ❌

================================================================================
STEP 1: DISABLE VERCEL AUTO-DEPLOYMENT
================================================================================

Add this to your vercel.json file:

{
  "git": {
    "deploymentEnabled": false
  },
  // ... rest of your config
}

This tells Vercel: "Don't auto-deploy when GitHub receives a push."

================================================================================
STEP 2: CREATE GITHUB ACTIONS WORKFLOW
================================================================================

Create file: .github/workflows/ci.yml

This workflow file defines:
  1. When to run (on push/PR to main/master branch)
  2. Test job: Install dependencies → Run tests
  3. Deploy job: Only runs if test job passes (needs: test)

================================================================================
STEP 3: GET VERCEL CREDENTIALS (3 Secrets Required)
================================================================================

You need to add 3 secrets to GitHub repository settings:

┌─────────────────────┬────────────────────────────────────────────────────────┐
│ Secret Name         │ How to Get It                                          │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ VERCEL_TOKEN        │ https://vercel.com/account/settings/tokens             │
│                     │ My Account → Account Settings → Tokens → Create Token  │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ VERCEL_ORG_ID       │ Run commands below, then check .vercel/project.json    │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ VERCEL_PROJECT_ID   │ Same as above - found in .vercel/project.json          │
└─────────────────────┴────────────────────────────────────────────────────────┘

To get VERCEL_ORG_ID and VERCEL_PROJECT_ID:

  # In your project folder (frontend/), run:
  npx vercel login          # Login to Vercel (one-time)
  npx vercel link           # Link to your Vercel project

  # When prompted:
  # - Select "Yes" to link to existing project
  # - Choose your team/account
  # - Select your project name

  # View the IDs:
  cat .vercel/project.json

  # Output example:
  # {
  #   "orgId": "team_o7BEJpYnqOz7xO3F52dhs6Ti",      ← VERCEL_ORG_ID
  #   "projectId": "prj_zOeZrA15rA155V5PbtpL7GQVroXQ" ← VERCEL_PROJECT_ID
  # }

================================================================================
STEP 4: ADD SECRETS TO GITHUB
================================================================================

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add all 3 secrets:
   - VERCEL_TOKEN
   - VERCEL_ORG_ID
   - VERCEL_PROJECT_ID

================================================================================
STEP 5: PUSH CODE & WATCH IT WORK
================================================================================

  git add .
  git commit -m "Your commit message"
  git push

View pipeline status:
  https://github.com/PUNEETH21/FA_D/actions

View deployments:
  https://github.com/PUNEETH21/FA_D/deployments

================================================================================
HOW THE PIPELINE WORKS
================================================================================

  ┌──────────────────┐
  │   Push to GitHub │
  │   (master/main)  │
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │   Run Tests Job  │
  │   - npm ci       │
  │   - npm test     │
  └────────┬─────────┘
           │
       Tests Pass?
          /  \
        Yes   No
         │     │
         ▼     ▼
  ┌──────────┐  ┌──────────────┐
  │  Deploy  │  │ Pipeline     │
  │ to Vercel│  │ Stops ❌     │
  │    ✅    │  │ No Deploy    │
  └──────────┘  └──────────────┘

================================================================================
IMPORTANT NOTES
================================================================================

1. package-lock.json MUST be committed to GitHub
   - Required for `npm ci` command in CI
   - Do NOT add it to .gitignore

2. .vercel folder should be in .gitignore
   - Contains local project linking info
   - Not needed in repository

3. Workflow triggers on:
   - Push to main/master branch → Runs tests + deploys if pass
   - Pull requests → Runs tests only (no deployment)

================================================================================
FILES INVOLVED
================================================================================

  frontend/
  ├── .github/
  │   └── workflows/
  │       └── ci.yml          ← GitHub Actions workflow
  ├── .vercel/
  │   └── project.json        ← Vercel project IDs (gitignored)
  ├── vercel.json             ← Vercel config (deploymentEnabled: false)
  ├── package.json            ← Project config
  └── package-lock.json       ← Dependencies lock (MUST be committed!)
  └── src/
  │   ├── pages/
  │   │   └── Login.js
  │   └── __tests__/
  │       └── components/
  │           └── Login.test.js
  └── .env
  └── .env.local
  └── .env.development.local
================================================================================
*/
