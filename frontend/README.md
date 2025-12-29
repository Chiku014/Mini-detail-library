📘 Mini Detail Library
A full-stack mini application that stores architectural construction details and suggests the most relevant detail based on drawing context.

📌 Project Overview
The Mini Detail Library allows users to:

View architectural details stored in a database

Search details using keywords

Provide drawing context (host element, adjacent element, exposure)

Receive a suggested construction detail with a clear explanation

This project was built as part of a technical assignment to demonstrate database design, backend APIs, rule-based logic, and frontend integration.

🛠 Tech Stack
Frontend: React

Backend: Node.js, Express

Database: PostgreSQL

Project Structure:

Mini-Detail-Library/
├── backend/
│   ├── index.js
│   ├── db.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md

🗄 Database Design

Piaxis_local

Tables
1. details
Stores architectural detail information.

Column	Description
id	Primary key
title	Detail title
category	Detail category
tags	Keywords
description	Detail explanation

2. detail_usage_rules
Defines where and how a detail should be used.

Column	Description
detail_id	Foreign key → details
host_element	Main element
adjacent_element	Adjacent element
exposure	Internal / External

🚀 Backend APIs
1️⃣ List All Details

GET /details

Returns basic information of all stored details.

2️⃣ Search Details

GET /details/search?q=keyword

Searches details using:
title
tags
description

3️⃣ Suggest Detail
bash
Copy code
POST /suggest-detail
Request Body

{
  "host_element": "External Wall",
  "adjacent_element": "Slab",
  "exposure": "External"
}

Suggested detail
Explanation of why it was selected

🧠 Suggestion Logic
The backend uses rule-based matching:
Exact match (host + adjacent + exposure)
Partial match (host + exposure)
Host-only match
Graceful fallback when no match is found
Each suggestion includes a human-readable explanation.

🖥 Frontend Features
Display list of details
Search details in real time
Dropdown form for context selection
Button to request suggestion
Display suggested detail with explanation
UI focus is on clarity and usability, not visual styling.

▶️ How to Run Locally

Backend

Copy code
cd backend
npm install
node index.js

Runs on:

http://localhost:5000

cd frontend
npm install
npm start

Runs on:
http://localhost:3000
