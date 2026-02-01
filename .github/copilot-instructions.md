# TeamTasks - AI Coding Agent Instructions

## Project Overview
TeamTasks is a collaborative task management platform built with **Angular 21** (standalone components), **Material Design**, and **CDK drag-drop** for Kanban-style task management. The app uses RxJS signals for state management and integrates with a Node.js backend API.

**Key Colors (from logo):** 
- Cyan: `#00C2FF`
- Green: `#2EE59D` 
- Pink/Magenta: `#FF5DA2`
- Dark: `#0F172A`

## Architecture Patterns

### Signal-Based State Management
Services use Angular signals (`signal()`, `asReadonly()`) instead of BehaviorSubject:
```typescript
// In core/service/tasks-service.ts
private _tasks = signal<TaskResponse[]>([]);
tasks$ = this._tasks.asReadonly();

// Update via .update() for immutable changes
this._tasks.update(tasks => [...tasks, newTask]);
```
**When modifying services:** Always use `signal()` for reactive state, never migrate to BehaviorSubject.

### Reactive Forms with FormBuilder
Components use `ReactiveFormsModule` and FormBuilder injection:
```typescript
// In shared/components/add-task/add-task.ts
private fb = inject(FormBuilder);
taskForm: FormGroup;

constructor() {
  this.taskForm = this.fb.group({
    projectId: [null, Validators.required],
    title: ['', Validators.required],
    description: ['']
  });
}
```
**Pattern:** Every form input requires validators; emit output signal on successful submission.

### Dependency Injection via `inject()`
All services use the modern `inject()` function (not constructor parameters):
```typescript
private taskService = inject(TasksService);
private router = inject(Router);
```

### Standalone Component Imports
**No shared modules.** Each component explicitly imports dependencies:
```typescript
@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIcon]
})
```

### HTTP Interceptor Pattern
`core/interceptor/interceptor.ts` automatically adds JWT tokens to requests:
- Token stored in `localStorage` under key `"token"`
- 401 responses redirect to `/login` and clear token
- **Important:** All API calls are intercepted; no manual token handling needed

## Core Services & Data Flow

### Tasks Service (`core/service/tasks-service.ts`)
- **API Base:** `http://localhost:3000/api/tasks`
- Methods: `getTasks()`, `getTaskByProjectId(id)`, `addTask()`, `updateTask()`, `deleteTask()`
- State: `tasks$` signal (read-only)
- **Key Pattern:** `.pipe(tap())` updates signal on success; subscriptions required in component `ngOnInit()`

### Projects Service (`core/service/projects-service.ts`)
- **API Base:** `http://localhost:3000/api/projects`
- Parallel loading with Tasks service
- **Important:** Tasks depend on projects for the select dropdown in `add-task.html`

### Teams Service & Comments Service
- Similar pattern to Tasks/Projects
- Comments linked to task via `taskId`
- Lazy-loaded in dialogs (not in initial bundle)

## Component Structure

### Feature Components (in `features/`)
- **Tasks:** Kanban board with drag-drop, status columns (todo, in_progress, done)
- **Projects:** Project CRUD, team assignments
- **Teams:** Team management, member invitations
- **Login/Register:** Auth flow with token storage
- **Comments:** Modal dialog, task-scoped discussions

### Shared Components (in `shared/components/`)
**Reusable across features:**
- `add-task/`: Modal form, emits `taskSave` output signal
- `task-card/`: Displays task with priority/status/date, emits `deleteTask` and `updateTask`
- `add-project/`, `add-team/`, `add-member/`: Similar modal forms
- `project-card/`, `team-card/`: Display cards with hover effects

### Models (in `shared/models/`)
Interfaces for API contracts:
```typescript
// task-model.ts
export interface TaskResponse {
  id: number;
  project_id: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'normal' | 'high';
  created_at: string;
}
```
**Pattern:** Separate `*Request` (form input) from `*Response` (API output).

## Design System & Styling

### CSS Architecture
- **Modern tech style with high-contrast gradients**
- Root CSS variables in component stylesheets:
  ```css
  :root {
    --tf-gradient: linear-gradient(135deg, #00C2FF 0%, #FF5DA2 100%);
    --tf-blue: #00C2FF;
    --tf-pink: #FF5DA2;
    --tf-dark: #0F172A;
  }
  ```
- Kanban cards use `cdkDrag` with custom placeholder styling
- Material icons (`mat-icon`) for actions and metadata
- Responsive grid layouts with flexbox for mobile support

### RTL Support (Hebrew)
- Direction set via Angular i18n and Material directives
- Some components have `direction: 'rtl'` in CSS
- Modal dialogs include `direction: 'rtl'` config

## Developer Workflows

### Running the App
```bash
npm start          # ng serve on http://localhost:4200
npm run build      # Production build
npm test           # Vitest unit tests
```

### Common Tasks
1. **Add new feature page:** Create in `features/`, add route in `app.routes.ts`
2. **Create reusable component:** Place in `shared/components/`, import in features
3. **Add service method:** Extend service in `core/service/`, use `signal().update()`
4. **Update styling:** Modify component CSS with mobile breakpoints `@media (max-width: 768px)`

### Testing Pattern
- Test files use `.spec.ts` suffix
- Vitest configured (not Jasmine)
- Services mock HTTP with `HttpClientTestingModule`

## Critical Integration Points

### Modal Dialogs
Comments use `MatDialog`:
```typescript
this.dialog.open(Comments, {
  width: '600px',
  data: { taskId: taskId },
  panelClass: 'custom-dialog-container',
  direction: 'rtl'
});
```

### Drag-Drop (Kanban)
- Uses `@angular/cdk/drag-drop`
- Drop listener updates task status via service
- Placeholder styled with gradient background
- **Important:** Status update is optimistic (no rollback on error)

### Form Submission Flow
1. User submits form → `onSubmit()` validates
2. Service method called → HTTP POST/PATCH
3. Signal updates optimistically in `.pipe(tap())`
4. Component emits output signal (e.g., `taskSave.emit()`) on success
5. Parent listens and closes modal

## Common Pitfalls & Fixes

| Issue | Fix |
|-------|-----|
| Component doesn't update after service call | Subscribe in component: `this.service.method().subscribe()` |
| Form validation not showing errors | Use `taskForm.markAllAsTouched()` in submit handler |
| Modal/dialog doesn't close | Emit output signal AND call `close()` in parent |
| Drag-drop doesn't work | Wrap droplist in `cdkDropListGroup` parent container |
| Token lost after page refresh | Token auto-restored from `localStorage` by interceptor |

## File Navigation Cheat Sheet

- **Services:** `src/app/core/service/*.ts`
- **HTTP Interceptor:** `src/app/core/interceptor/interceptor.ts`
- **Task feature:** `src/app/features/tasks/`
- **Shared models:** `src/app/shared/models/`
- **Reusable components:** `src/app/shared/components/`
- **Styling constants:** Each component's `.css` (root variables)
- **Routes:** `src/app/app.routes.ts`
- **App config:** `src/app/app.config.ts` (HTTP, router setup)

## Quick Debugging Tips

1. Check console for HTTP 401 → token expired, manually clear localStorage or re-login
2. Signals not updating → verify `.subscribe()` is called on service method
3. Form errors not visible → add `taskForm.markAllAsTouched()` before showing errors
4. Styling issues → inspect `:root` variables and Material theme overrides in `styles.css`
