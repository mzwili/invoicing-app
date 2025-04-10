# 🧾 Invoicing App

A sleek and modern invoicing application built with **Next.js**, **Drizzle ORM**, **Clerk authentication**, and **PostgreSQL**, styled using **Tailwind CSS**. This project helps freelancers and businesses create, manage, and send professional invoices with ease.

🌐 **Live Demo:** [https://invoicing-is8tls6ta-mzwilis-projects.vercel.app/](https://invoicing-is8tls6ta-mzwilis-projects.vercel.app/)

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

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Auth:** [Clerk](https://clerk.dev/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL
- **Validation:** React Hook Form + Zod
- **Payments:** [Stripe](https://stripe.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

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

DATABASE_URL=postgres://user:password@localhost:5432/invoicing_db
CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key

🔄 Run database migrations

npm run migrate

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
Live App: https://invoicing-is8tls6ta-mzwilis-projects.vercel.app/

📄 License
This project is licensed under the MIT License.

Built with 💙 using Next.js, Clerk, and Drizzle ORM.