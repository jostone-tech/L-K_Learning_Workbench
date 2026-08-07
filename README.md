# L&K Prompt Library

A searchable, filterable prompt library for IBM Consulting Learning & Knowledge teams. Covers all five ADDIE phases (Analysis, Design, Development, Implementation, Evaluation) across five roles: Instructional Designer, Iteration Manager, Programmer, Visual Designer, and QA.

Built with Next.js, Tailwind CSS, and deployed to Vercel. All prompts live in a single JSON file — no database, no backend.

---

## For Teammates — Using the Library

1. Open the library URL (shared by your team lead)
2. Use the **ADDIE Phase** dropdown to filter by phase
3. Use the **Role** dropdown to filter by your role
4. Use the **Learning Type** dropdown to filter by learning modality
5. Use the **Delivery Type** dropdown to filter by delivery format
6. Use the **Search** box to find prompts by keyword
7. Click **Show more** on a card to read the full prompt
8. Click **Copy prompt** to copy it directly to your clipboard
9. Paste into your AI tool of choice (ChatGPT, Claude, Gemini, etc.)
10. Replace the `[bracketed placeholders]` with your specific project details

---

## For Admins — Adding or Editing Prompts

All prompts are stored in one file: **`data/prompts.json`**

### Option A — Edit directly on GitHub (recommended for non-developers)

1. Go to the GitHub repository for this project
2. Navigate to `data/prompts.json`
3. Click the **pencil icon** (Edit this file) in the top right of the file view
4. Make your changes (see schema below)
5. Scroll down, write a short commit message (e.g. `Add 3 new ID prompts for Analysis phase`)
6. Click **Commit changes**
7. Vercel will automatically detect the change and rebuild the site — changes are live within ~1 minute

### Option B — Use the Admin Import tool

1. Open the library URL and navigate to `/admin`
2. Prepare your prompts in a spreadsheet with columns in this order:
   `id | title | phase | role | learningType | deliveryType | contributor | prompt`
3. Select all data rows (not the header), copy, and paste into the tool
4. Click **Parse rows** to validate — fix any errors flagged in red
5. Click **Generate JSON** then **Copy JSON**
6. Paste into `data/prompts.json` on GitHub inside the `[ ]` array

### Option C — Edit locally and push

1. Clone the repo: `git clone https://github.com/YOUR-ORG/lk-prompt-library.git`
2. Open `data/prompts.json` in any text editor (VS Code recommended)
3. Make your changes
4. Run `npm run dev` to preview changes locally at `http://localhost:3000`
5. Commit and push to `main`: `git add . && git commit -m "your message" && git push`
Example: 
cd C:\Users\JOANNASTONE\lk-prompt-library
git add -A
git commit -m "Add learning updated analysis learning prompts and README file"
git push origin main

6. Vercel rebuilds automatically
---

## Prompt Schema

Each prompt in `data/prompts.json` is an object with the following fields:

```json
{
  "id": "unique-slug",
  "title": "Short descriptive title",
  "phase": "Analysis",
  "role": "Instructional Designer",
  "learningType": "Blended Learning",
  "deliveryType": "iSPO",
  "contributor": "Joanna Stone",
  "prompt": "Full prompt text. Use [bracketed placeholders] for content the user should replace."
}
```

### Field rules

| Field | Required | Allowed values |
|-------|----------|---------------|
| `id` | Yes | Unique across all prompts. Use kebab-case, e.g. `id-analysis-4`. Never reuse an ID. |
| `title` | Yes | Short and descriptive. Under 60 characters. |
| `phase` | Yes | Exactly one of: `Analysis`, `Design`, `Development`, `Implementation`, `Evaluation` |
| `role` | Yes | Exactly one of: `Instructional Designer`, `Iteration Manager`, `Programmer`, `Visual Designer`, `QA` |
| `learningType` | Optional | One of: `ILT`, `Self-Paced eLearning`, `Microlearning`, `Scenario-based`, `Experiential`, `Social and Collaborative`, `Coaching and Mentoring`, `Performance Support`, `Assessment and Practice`, `Adaptive and Personalized`, `Blended Learning`, `Other` |
| `deliveryType` | Optional | One of: `iSPO`, `Video`, `AI-Assisted Review`, `Podcast`, `Chatbot`, `Job Aid`, `Workshop Activity`, `Other` |
| `contributor` | Optional | Full name of the person who contributed the prompt, e.g. `"Joanna Stone"`. Displayed on the card as "Contributed by [name]". |
| `prompt` | Yes | Full prompt text. Use `[brackets]` for placeholders the user replaces. Escape any internal double quotes with `\"`. |

### Adding a new prompt — example

Add a new object to the array. Copy an existing entry as a starting point:

```json
{
  "id": "id-analysis-4",
  "title": "Write a Stakeholder Interview Guide",
  "phase": "Analysis",
  "role": "Instructional Designer",
  "learningType": "Blended Learning",
  "deliveryType": "Workshop Activity",
  "contributor": "Joanna Stone",
  "prompt": "You are an instructional designer preparing for stakeholder interviews as part of a needs analysis for [course topic]. Write a stakeholder interview guide that includes: an introduction script, 8 open-ended questions covering business goals, current performance gaps, target audience, existing resources, and constraints, plus probing follow-up questions for each. Format it so it can be used directly in a 30-minute interview."
}
```

Place the comma after the closing `}` of the previous entry, before your new entry — or add it after the last entry without a trailing comma.

### Common mistakes to avoid

- **Duplicate IDs** — every `id` must be unique. Check before adding.
- **Trailing commas** — JSON does not allow a comma after the last item in the array.
- **Wrong phase, role, learningType, or deliveryType spelling** — copy exactly from the allowed values table above. Typos will cause the prompt to not appear in filters.
- **Unescaped quotes** — if your prompt text contains a `"` character, write it as `\"`.

---

## Local Development

```powershell
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# Opens at http://localhost:3000

# Build static export (same as Vercel build)
npm run build
```

Requires Node.js 18+.

---

## Deployment

The app is deployed to Vercel and connected to this GitHub repository. Any push to the `main` branch triggers an automatic rebuild and deployment. No manual steps needed.

To connect a new Vercel project:
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**
2. Import this GitHub repository
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**

---

## Project Structure

```
lk-prompt-library/
├── app/
│   ├── layout.tsx        # Root layout, IBM Plex Sans font, metadata
│   ├── page.tsx          # Home page — filter logic and prompt grid
│   ├── globals.css       # IBM colour tokens, base styles
│   └── admin/
│       └── page.tsx      # Admin import tool (/admin)
├── components/
│   ├── PromptCard.tsx    # Individual prompt card with expand/copy
│   └── FilterBar.tsx     # Phase, role, learning type, delivery type, and search filters
├── data/
│   └── prompts.json      # ← All prompts live here. Edit this to add/update prompts.
├── types/
│   └── prompt.ts         # TypeScript types for Prompt, ADDIEPhase, Role, LearningType, DeliveryType
└── README.md
```
