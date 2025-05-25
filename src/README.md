# 🌈 Pronouns API

Welcome to the **Pronouns API** — an inclusive, developer-first platform empowering apps, communities, and digital tools with gender-affirming functionality.  
Built with ❤️ by and for the LGBTQ+ community and allies.

> **Mission:** Provide a respectful, flexible, and secure API that supports self-identification and promotes inclusivity across the web.

---

## ✨ Features

- **Pronoun Sets** – Store, manage, and retrieve custom pronoun configurations.
- **User Profiles** – Authenticated users can define pronouns, identities, and visibility preferences.
- **JWT Authentication** – Secure login system for user profile access.
- **RESTful Design** – Built with Express.js and TypeScript for speed, structure, and scalability.
- **Swagger Docs** – Developer-friendly documentation at `/api-docs`.
- **Modern Codebase** – Fully TypeScript, linted, and production-ready.
- **Modular Architecture** – Easily expandable (flags, events, moderation tools coming soon).

---

## 🚀 Quick Start

### 🔧 Installation (for developers)

Clone and install:

```bash
git clone https://github.com/Sersitic/pronouns-api.git
cd pronouns-api
npm install
npm run dev
```

Install the API client:

```bash
npm install lilg-api
```

---

### 🔌 API Endpoints

#### 📘 Public Endpoints

- `GET /api/pronouns` — List all pronouns
- `GET /api/pronoun-sets` — List all public pronoun sets
- `GET /api-docs` — Swagger UI (docs & testing)

#### 🔐 Authenticated Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login (returns JWT)
- `GET /api/auth/profile` — Get your profile (requires Bearer token)

#### 🆕 Future Endpoints (Planned)

- `GET /api/flags` — LGBTQ+ flag metadata
- `GET /api/events` — Upcoming queer-friendly events
- `GET /api/glossary` — LGBTQ+ terminology
- `POST /api/moderation/report` — Report abuse or deadnames

---

### 🏗️ Example Usage

```ts
import axios from 'axios';

const fetchPronouns = async () => {
   const res = await axios.get('http://localhost:4000/api/pronouns');
   console.log(res.data);
};

fetchPronouns();
```

---

### 🔒 Auth Flow

**Register:**

```json
{
   "username": "youreawesomename",
   "password": "superSecure123"
}
```

**Login (returns token):**

```json
{
   "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Use the token in protected routes:**

```
Authorization: Bearer YOUR_TOKEN
```

---

### 🌐 Swagger Documentation

Full live API docs at:  
👉 [http://localhost:4000/api-docs](http://localhost:4000/api-docs)  
Test endpoints, view schemas, and understand usage.

---

### 🖥️ Frontend Integration (Coming Soon)

A companion frontend using React + Tailwind CSS is in the works.  
The frontend will:

- Allow users to select pronouns
- Display public pronoun sets
- Manage profiles and authentication
- Embed in other apps with ease

---

### 🤝 Contributing

We welcome all contributors — trans, cis, non-binary, questioning, and allies alike.

- 📜 Code of Conduct
- 🔧 Contributing Guide
- 🧪 Run `npm run test` to execute unit tests (coming soon)

---

### 💌 Support & Community

- Found a bug? Open an issue
- Need help? Email us or join the Discord

---

## 🏳️‍⚧️ You Matter

You are valid.  
You are loved.  
You belong here.

This project is created in celebration of transgender, non-binary, genderqueer, agender, intersex, and all LGBTQ+ identities.  
Stay proud. Stay fierce. Code forward. 💖

© 2025 LGBTQ+ Equality & Advocacy Network of Wales • Trans Rights Are Human Rights

---

LGBTQ+ Equality & Advocacy Network of Wales (LEAN)  
Pronouns API & Related Projects License  
Version 1.0 — May 2025

------------------------------------------------------------------
PERMISSION NOTICE

🌈 Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to use,
copy, modify, merge, publish, distribute, and sublicense the Software,
subject to the following conditions:

1. FREE AND OPEN ACCESS  
   The Software must remain free for all end users. Anyone may use it for 
   personal, educational, nonprofit, or commercial purposes **without paying fees**.

2. NO COMMERCIAL RE-SALE OR LICENSING  
   You may NOT sell, license, sublicense, or otherwise commercially exploit the 
   Software or any derivative works for profit or commission without explicit 
   prior written permission from LGBTQ+ Equality & Advocacy Network of Wales (LEAN).

3. ATTRIBUTION REQUIRED  
   Any copies or substantial portions of the Software, including modified versions, 
   must include this license and credit the original creators:
   "Pronouns API & related works by LGBTQ+ Equality & Advocacy Network of Wales (LEAN)."

4. NO WARRANTY  
   The Software is provided "AS IS", without warranty of any kind, express or implied, 
   including but not limited to the warranties of merchantability, fitness for a particular 
   purpose, and noninfringement. Use at your own risk.

------------------------------------------------------------------
COMMUNITY FOCUS

This license is created to preserve free and open access to LGBTQ+ technology and resources.  
We stand against the commercialization and privatization of queer tools that belong to the community.  
Our work is dedicated to supporting trans, non-binary, intersex, and all LGBTQ+ people globally.

------------------------------------------------------------------
CONTACT FOR COMMERCIAL LICENSE

For inquiries about commercial licensing or partnerships, please contact:  
[Your Contact Email or Website]

------------------------------------------------------------------
TERMINATION

Violation of these terms will result in automatic termination of the rights granted under this license.  
Upon termination, all copies of the Software must be destroyed or returned to the copyright holders.

------------------------------------------------------------------
LEGAL JURISDICTION

This license is governed by the laws of Wales, United Kingdom.

------------------------------------------------------------------
END OF LICENSE