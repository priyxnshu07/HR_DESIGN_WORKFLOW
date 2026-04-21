# HR Workflow Designer

## Overview

A visual workflow builder that allows HR users to design and simulate workflows such as onboarding, approvals, and automated actions using a drag-and-drop interface.

---

## How to Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application runs locally using a mock API setup.

---

## Features

* Drag-and-drop workflow builder using React Flow
* Multiple node types: Start, Task, Approval, Automated, End
* Dynamic configuration panel for each node
* Real-time updates between form inputs and node UI
* Workflow simulation with step-by-step execution
* Basic validation before simulation (start/end checks, connectivity)
* Local storage support (save and load workflows)

---

## Architecture

* Built using React + TypeScript
* React Flow handles graph rendering and interactions
* Node-based design for extensibility
* Centralized node registry for managing node types
* Config panel dynamically renders based on selected node
* Workflow logic separated into hooks and utility functions

---

## Key Design Decisions

* Used a node registry pattern to make it easy to add new node types
* Kept state management simple using React Flow hooks instead of heavy libraries
* Built dynamic configuration panels to support different node types
* Added validation before simulation to ensure workflow correctness
* Integrated local storage for persistence without backend dependency

---

## Future Improvements

* Undo/Redo functionality
* Advanced validation (cycle detection, visual error indicators)
* Backend persistence with API integration
* Import workflow from JSON
* Improved UI/UX and performance optimizations

---

## Assumptions

* Designed for single-user usage
* Simulation uses a simplified traversal logic for demonstration
* No authentication or backend persistence required for this prototype

---
## Demo

<img width="2940" height="1911" alt="image" src="https://github.com/user-attachments/assets/1e363fa1-dfde-42a9-b21e-a589969720d3" />

