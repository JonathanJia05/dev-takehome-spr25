# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [Y] Read the README [please please please]
- [Y] Something cool!
- [Y] Back-end
  - [Y] Minimum Requirements
    - [Y] Setup MongoDB database
    - [Y] Setup item requests collection
    - [Y] `PUT /api/request`
    - [Y] `GET /api/request?page=_`
  - [Y] Main Requirements
    - [Y] `GET /api/request?status=pending`
    - [Y] `PATCH /api/request`
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes
- [Y] Front-end
  - [Y] Minimum Requirements
    - [Y] Dropdown component
    - [Y] Table component
    - [Y] Base page [table with data]
    - [Y] Table dropdown interactivity
  - [Y] Main Requirements
    - [Y] Pagination
    - [Y] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

# Notes

<!-- Notes go here -->

- env variables:
  - PORT = 8000
  - MONGO_URL = "mongodb://localhost:27017/dev_takehome"
