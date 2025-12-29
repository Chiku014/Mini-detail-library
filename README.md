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
