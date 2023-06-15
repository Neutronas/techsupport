- Still in development

# Technical Support Website

This is a full customizable public website built on Next.js that serves as a platform for a company providing technical support. The website allows users to register their technical issues, while the company admins can manage tickets and provide assistance.

## Features

- **Customizable Content:** The website content can be fully customized through the admin page.
- **Ticket Management:** Admins can view and manage the tickets registered by users.
- **Request Form:** Users can submit their technical issues via a request form on the public side.
- **Authentication:** Utilizes Supabase for user authentication and secure database storage.

## Technologies

- Next.js: A React framework for building server-side rendered applications.
- Supabase: An open-source Firebase alternative for database storage and authentication.
- Flowbite: A library for design and components, providing aesthetic styling for the website.

## Prerequisites

Before running the project locally, ensure you have the following prerequisites installed:

- Node.js: Make sure you have Node.js installed on your machine.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the following command:

```bash
npm install
```

## Configuration

To configure the project, follow these steps:

1. Create a Supabase project on the [Supabase website](https://supabase.io).
2. Set up your environment variables by creating a `.env` file in the project's root directory.
3. Add the following variables to your `.env` file and replace the placeholders with your own Supabase project details:

```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=ANON_KEY
SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_URL.supabase.co
SUPABASE_KEY=YOUR_SUPABASE_PROJECT_API_KEY
```

## Running the Project

To run the development server locally, use the following command:

```bash
npm run dev
```
