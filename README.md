# Mini Detail Library

Mini Detail Library is a full-stack web application that stores architectural construction details and suggests the most relevant detail based on drawing context such as host element, adjacent element, and exposure.

This project was developed as part of a technical assignment to demonstrate backend API design, database modeling, rule-based logic, and frontend integration.

---

## Features

- View a list of architectural details
- Search details using keywords
- Provide drawing context using dropdowns
- Get an automatic detail suggestion with explanation
- Clean separation of backend and frontend

---

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: PostgreSQL

---

## Project Structure

```
Mini-Detail-Library/
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

---

## Database Design

### Database Name
```
Piaxis_local
```

### Tables

#### details
Stores architectural detail information.

| Column | Description |
|------|------------|
| id | Primary key |
| title | Detail title |
| category | Detail category |
| tags | Keywords |
| description | Detail description |

#### detail_usage_rules
Defines usage rules for each detail.

| Column | Description |
|------|------------|
| detail_id | Foreign key referencing details |
| host_element | Host element |
| adjacent_element | Adjacent element |
| exposure | Internal or External |

---

## Backend APIs

### List Details
```
GET /details
```
Returns all available details.

---

### Search Details
```
GET /details/search?q=keyword
```
Searches details using title, tags, and description.

---

### Suggest Detail
```
POST /suggest-detail
```

Request body:
```json
{
  "host_element": "External Wall",
  "adjacent_element": "Slab",
  "exposure": "External"
}
```

Response:
- Suggested architectural detail
- Explanation of why the detail was selected

---

## Suggestion Logic

The backend uses rule-based matching logic:

1. Exact match (host element + adjacent element + exposure)
2. Partial match (host element + exposure)
3. Host element match
4. Fallback response if no match is found

Each suggestion includes a human-readable explanation.

---

## Frontend Functionality

- Displays all details
- Search bar for filtering details
- Dropdown form for context selection
- Button to request suggestion
- Displays suggested detail with explanation

UI focus is on functionality rather than styling.

---

## How to Run the Project

### Backend
```bash
cd backend
npm install
node index.js
```

Backend runs on:
```
http://localhost:5000
```

---

### Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## Demo

A screen recording demo is included separately showing:
- Project structure
- Backend APIs running
- Frontend search and suggestion flow

---

## Author

Kiran Kumar  
B.Tech – Computer Science Engineering  
Cyber Security & Digital Forensics Minor

---

## Notes

- PostgreSQL must be running before starting the backend
- Sample seed data is inserted as per assignment requirements

