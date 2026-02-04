# 🧾 Invoicing App

A sleek and modern invoicing application built with **Next.js**, **Drizzle ORM**, **Clerk authentication**, and **PostgreSQL**, styled using **Tailwind CSS**. This project helps freelancers and businesses create, manage, and send professional invoices with ease.

🌐 **Live Demo:** <a href="https://invoicing-app-eta.vercel.app/" target="_blank" rel="noopener noreferrer">https://invoicing-app-eta.vercel.app/</a>

---

## 🚀 Features

- 🔐 Authentication with Clerk
- 📋 Invoice creation and management
- 💳 Stripe integration for payments
- 🧰 Form validation with React Hook Form and Zod
- 🎨 Responsive and accessible UI using Radix UI and TailwindCSS
- 📦 PostgreSQL database via Drizzle ORM
- 📄 Migration and schema generation using Drizzle Kit

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [Supabase (PostgreSQL)](https://supabase.com)
- **Emails:** [Resend](https://resend.com) & [React Email](https://react.email)
- **Payments:** [Stripe](https://stripe.com/)
- **Auth:** [Clerk](https://clerk.com)
- **Validation:** [Zod](https://zod.dev) + React Hook Form

---

## 📦 Dependencies

### Runtime

- `next`
- `react`
- `react-dom`
- `@clerk/nextjs`, `@clerk/clerk-js`, `@clerk/elements`
- `drizzle-orm`, `pg`
- `react-hook-form`, `@hookform/resolvers`
- `zod`
- `stripe`
- `clsx`, `class-variance-authority`
- `dotenv`
- `dotenv-cli`
- `lucide-react`
- `@radix-ui/react-*`
- `tailwind-merge`, `tailwindcss-animate`

### Development

- `typescript`, `eslint`, `postcss`, `tailwindcss`
- `drizzle-kit`
- `@types/*` for Node, React, PG

---

## 📂 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint project files
npm run lint

# Generate drizzle ORM types
npm run generate

# Run database migrations
npm run migrate

🧪 Getting Started

📥 Clone the repository

git clone https://github.com/your-username/invoicing-app.git
cd invoicing-app

📦 Install dependencies

npm install

⚙️ Set up environment variables
Create a .env.local file and include your Clerk, Database, and Stripe credentials:

# Database (Supabase Transaction Pooler recommended for Serverless)
DATABASE_URL="postgresql://postgres:[password]@db.xxxx.supabase.co:6543/postgres"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Payments (Stripe)
STRIPE_API_SECRET=sk_test_...

# Emails (Resend)
RESEND_API_KEY=re_...

🔄 Sync schema to database

npx drizzle-kit push

▶️ Start the development server

npm run dev

📌 Folder Structure (Simplified)

/app         # Next.js app directory
/components  # Reusable UI components
/lib         # Utilities and helpers
/db          # Drizzle ORM config and schemas
/styles      # Tailwind and global CSS

🧑‍💻 Author

Name: Mzwili
Live App: https://invoicing-app-eta.vercel.app/

📄 License
This project is licensed under the MIT License.

Built with 💙 using Next.js, Clerk, and Drizzle ORM.