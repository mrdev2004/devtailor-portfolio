# Dev Tailor - Professional Developer Portfolio

> Responsive, high-performance, developer-focused portfolio website crafted for Dev Tailor (Web & Software Developer | MSCIT Student @ MSU Baroda).

---

## 🌟 Key Features

- **Developer Aesthetic:** Clean cyber-indigo / emerald matrix dark themes with glowing glassmorphism cards and JetBrains Mono code elements.
- **Interactive Developer CLI:** In-browser terminal emulator executing real commands (`help`, `skills`, `projects`, `exp`, `edu`, `certs`, `contact`, `hire`, `theme`, `clear`).
- **Dynamic Projects Showcase:** Filterable project catalogue (Django, MERN, PHP, Full Stack) with deep-dive modal windows describing technical architecture.
- **Interactive Skills Matrix:** Categorized skill cards with animated proficiency meters and tags.
- **Live Stats & Dynamic Typing:** Rotating roles in hero banner and real-time counter highlights.
- **Interactive Contact:** One-click copy for email and phone numbers with animated toast notifications, WhatsApp integration, and direct mail sender.
- **Theme Engine:** Instant switching between `Cyber Indigo`, `Emerald Matrix`, and `Sunset Violet` modes.
- **Particle Network Background:** Interactive canvas that reacts smoothly to mouse movements.
- **100% Mobile Responsive:** Optimized for iPhones, Android smartphones, tablets, and large displays.

---

## 📂 Project Structure

```text
D:\projects\portfolio\
├── index.html        # Main semantic HTML5 document
├── style.css         # Modern responsive CSS3 design & theme variables
├── script.js         # Interactive terminal, particle canvas, modals & filters
├── vercel.json       # Vercel deployment configuration
└── README.md         # Documentation & deployment guide
```

---

## 🚀 How to View Locally

You can preview the website immediately in any browser:
1. Navigate to `D:\projects\portfolio` in File Explorer.
2. Double-click `index.html` to open it in Chrome, Edge, Brave, or Firefox.
3. Or, if using VS Code, right-click `index.html` and choose **"Open with Live Server"**.
4. Or via terminal:
   ```powershell
   cd D:\projects\portfolio
   npx serve .
   ```

---

## ⚡ How to Deploy to Vercel & Get Your Live URL

### Method 1: Instant 1-Command Deployment via Vercel CLI (Fastest)

1. Open PowerShell or Terminal and change directory to this folder:
   ```powershell
   cd D:\projects\portfolio
   ```

2. Run:
   ```powershell
   npx vercel
   ```

3. Follow the quick terminal prompts:
   - **Set up and deploy?** Press `y` (Yes)
   - **Which scope?** Press `Enter` (selects your personal account)
   - **Link to existing project?** Press `n` (No)
   - **What's your project's name?** Press `Enter` (or type `devtailor-portfolio`)
   - **In which directory is your code located?** Press `Enter` (uses `./`)
   - **Want to modify settings?** Press `n` (No)

4. Done! Vercel will upload and immediately give you a live production link like:
   `https://devtailor-portfolio.vercel.app`

---

### Method 2: Deploying via GitHub (Automatic Updates)

This is the recommended industry approach for continuous deployment:

1. **Create a GitHub repository:**
   - Go to [github.com/new](https://github.com/new)
   - Name it `portfolio` or `dev-tailor-portfolio`
   - Set to **Public** and create repository.

2. **Push this folder to GitHub:**
   In PowerShell:
   ```powershell
   cd D:\projects\portfolio
   git init
   git add .
   git commit -m "Initial commit of developer portfolio"
   git branch -M main
   git remote add origin https://github.com/mrdev2004/portfolio.git
   git push -u origin main
   ```
   *(Or drag the folder into GitHub Desktop and publish)*

3. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account (**mrdev2004**).
   - Click **"Add New..."** &rarr; **"Project"**.
   - Find your `portfolio` repository and click **"Import"**.
   - Keep default settings and click **"Deploy"**.
   - Vercel builds your site in under 10 seconds and provides a custom URL!
   - Every time you push changes to GitHub, Vercel updates your live website automatically.

---

## 👨‍💻 Developer Profile

- **Name:** Dev Tailor
- **Email:** [tdev292004@gmail.com](mailto:tdev292004@gmail.com)
- **Phone:** [+91 80000 54035](tel:+918000054035)
- **LinkedIn:** [tdev-linked2004](https://linkedin.com/in/tdev-linked2004)
- **GitHub:** [mrdev2004](https://github.com/mrdev2004)
- **Education:** M.Sc. IT (MSU Baroda - Pursuing) | BCA (VNSGU - 79.40%)
