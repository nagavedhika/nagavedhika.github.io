# ProtoSem automation — one-time setup

## Your normal workflow

1. Open `portfolio-content/` as an Obsidian vault.
2. Open the current week and day folder.
3. Write your update in a `.md` note.
4. Paste screenshots directly into that folder.
5. Sync/push the repository with Obsidian Git.
6. GitHub Actions automatically builds and publishes the portfolio.

You do **not** edit `src/App.tsx` for weekly updates.

## Folder layout

```text
portfolio-content/
├── Week_00/
│   ├── 01_Monday/
│   ├── 02_Tuesday/
│   ├── 03_Wednesday/
│   ├── 04_Thursday/
│   ├── 05_Friday/
│   └── 06_Saturday/
├── Week_01/
└── ... Week_19/
```

## Images

Paste an image into the same day folder and embed it in Obsidian with:

```md
![[my-screenshot.png]]
```

The compiler copies the image into the portfolio's weekly assets automatically.

## GitHub one-time setting

In the repository, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.

After that, every push to `main` that changes your portfolio or ProtoSem content triggers the deployment workflow.

## Obsidian Git

Install the **Obsidian Git** community plugin. Configure it to commit and push automatically (for example, every 30 minutes). The exact plugin settings can be adjusted to your preferred sync interval.

## Result

```text
Write in Obsidian
      ↓
Obsidian Git pushes to GitHub
      ↓
GitHub Actions runs the ProtoSem compiler
      ↓
Vite builds the portfolio
      ↓
GitHub Pages publishes the new version
```
