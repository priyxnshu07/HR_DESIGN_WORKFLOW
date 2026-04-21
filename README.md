# HR Workflow Designer

## How to Run

1. Install all dependencies:
```bash
npm install
```
2. Start the development server:
```bash
npm run dev
```
*(By default, the application runs entirely locally using a mock API interceptor enabled via `VITE_USE_MOCK=true` initialized in the `.env` file.)*

## Architecture

* **The Registry Pattern**: The application relies on `src/constants/nodeRegistry.ts` as the single source of truth for all node types in the system. It centrally manages node colors, default data layouts, sidebar palette entries, and dynamically binds custom node UI schemas into the React Flow engine.
* **3-Layer State Storage Pipeline**: 
  1. **React Flow State (`nodes` / `edges`)**: The mathematical structural coordinates and relationship mapping managed seamlessly by the XY Flow engine.
  2. **`useWorkflow` Hook**: Wraps the raw graph state into an abstracted, domain-specific state manager (bundling generic helper methods to safely add, update, and track selected node records).
  3. **App Level Context**: Lifts the unified workflow state to the root `App.tsx`, enabling the framework to securely drill the live graph down simultaneously into independent layout panels (`WorkflowCanvas`, `SimulationPanel`, and `ConfigPanel`).

## Key Design Decisions

1. **Registry Pattern for Extensibility**: Scaling the graph engine internally is completely effortless. Introducing a brand new node logic type requires just 1 pure display component, 1 configuration form structure, and 1 mapping entry in the centralized `nodeRegistry.ts`.
2. **`useNodeForm` Hook**: Consolidates all complex dirty-tracking, React 18 render-phase prop syncing, and recursive array modifications. This pattern isolates performance risks into a single robust file, allowing the actual form components to remain purely declarative.
3. **Mock API Swap Pattern**: `client.ts` establishes a central abstraction across all HTTP requests that securely monitors the `$VITE_USE_MOCK` boolean. Toggling from the local-only mocked BFS algorithms to a cloud-based external physical environment requires zero code application adjustments!
4. **Validation Before API Call**: The graph forces strict deterministic client-side checks natively. It intercepts invalid graph combinations (such as cyclical logic loops or orphaned blocks) instantly within the UI tier, preemptively avoiding expensive backend compute waste.

## What I Would Add With More Time

- **Undo/Redo Tracking**: Adding snapshot bounds utilizing `useHistoryState` for fluid navigation.
- **Inline Visual Error Validation**: Flagging invalid geometry errors dynamically inside the actual Canvas rendering space.
- **Export/Import JSON Full Loop**: Closing the gap allowing physical `.json` graph payloads to be dragged backwards into the designer environment. (Note: Output Export JSON exists!).
- **Real Application Backend**: Mapping physical API pipelines backwards to a PostgreSQL state persistence framework tracking explicit payload saves!
- **Node Version History**: Adhering an append-only timeline table per specific `Node ID`, allowing human operators to securely roll back structural block edits.

## Assumptions

- Built explicitly under a Single User environment—there are no integrated complex AAA (Authentication) workflows required per this spec cycle.
- The default Mock Algorithm processes safe traversals through the graph queue completely deterministically for presentation.
- Used strict Vanilla Tailwind CSS for styling exclusively. Excluded any complex, bloated GUI UI component libraries prioritizing high execution speeds.
