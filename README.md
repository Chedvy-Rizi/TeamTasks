# 🚀 TeamTasks

<div align="center">

![TeamTasks Logo](https://img.shields.io/badge/TeamTasks-Modern%20Task%20Management-brightgreen?style=flat-square)
[![Angular](https://img.shields.io/badge/Angular-21-red?style=flat-square&logo=angular)](https://angular.io)
[![Material Design](https://img.shields.io/badge/Material%20Design-v21-blue?style=flat-square&logo=material-design)](https://material.angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![RxJS](https://img.shields.io/badge/RxJS-7.8+-purple?style=flat-square&logo=reactivex)](https://rxjs.dev)

**A modern, collaborative task management platform built with Angular 21 & Material Design**

[🌐 Live Demo](https://teamtasks-vlkt.onrender.com) • [📖 Features](#-features) • [🚀 Quick Start](#-quick-start) • [🏗️ Architecture](#-architecture)

---

</div>

## 🌟 Overview

TeamTasks is a **cutting-edge collaborative task management platform** designed for modern teams. It combines the power of **Angular 21** with **Material Design** to deliver a seamless, intuitive experience for managing projects, tasks, and team collaboration.

Built with modern web technologies including **RxJS Signals**, **reactive forms**, and **drag-drop Kanban boards**, TeamTasks offers real-time collaboration features and a polished user interface.

---

## ✨ Features

### 📋 **Task Management**
- ✅ **Kanban Board** - Organize tasks with drag-drop support (To-Do, In Progress, Done)
- 🎯 **Priority Levels** - Set tasks as Low, Normal, or High priority
- 📝 **Rich Task Details** - Descriptions, dates, and comprehensive metadata
- 🔄 **Real-Time Updates** - Instant synchronization across all team members

### 👥 **Team Collaboration**
- 👤 **Team Management** - Create teams and manage members seamlessly
- 💬 **In-Task Comments** - Discuss and collaborate on specific tasks
- 🔐 **Role-Based Access** - Control who can create, edit, and delete
- 📊 **Team Analytics** - View team activity and task distribution

### 📁 **Project Organization**
- 🏢 **Multi-Project Support** - Manage multiple projects simultaneously
- 🎨 **Project Customization** - Organize by team and priority
- 📈 **Progress Tracking** - Visual status indicators for task completion
- 🏷️ **Smart Filtering** - Find tasks by status, priority, and assignee

### 🔐 **Security & Authentication**
- 🔑 **JWT Authentication** - Secure token-based authentication
- 🛡️ **Auto Token Management** - Automatic token refresh and refresh token handling
- 🚪 **Protected Routes** - Auth guards on sensitive pages
- 📱 **Persistent Sessions** - Stay logged in across page refreshes

### 🎨 **Design & UX**
- 💎 **Modern UI** - Built with Angular Material Design components
- 🌈 **Gradient Branding** - Striking cyan, green, and pink color scheme
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🌍 **RTL Support** - Hebrew and Arabic language support
- ♿ **Accessible** - WCAG compliant components and navigation

### ⚡ **Performance**
- 🚀 **Signals-Based State** - Fast, efficient reactive state management
- 📦 **Lazy Loading** - Load features on-demand for faster initial load
- 🔄 **Smart Caching** - Minimize API calls with intelligent caching
- 📊 **Server-Side Rendering** - SSR support for improved SEO and performance

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | Angular | 21.0.0 |
| **UI Component Library** | Angular Material | 21.1.2 |
| **Drag-Drop** | Angular CDK | 21.1.2 |
| **State Management** | RxJS Signals | 7.8.0 |
| **Forms** | Reactive Forms | 21.0.0 |
| **HTTP Client** | Angular HttpClient | 21.0.0 |
| **Routing** | Angular Router | 21.0.0 |
| **Backend API** | Node.js/Express | - |
| **Language** | TypeScript | 5.6.0 |
| **Testing** | Vitest | - |
| **Package Manager** | npm | 10.9.3 |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm 10+
- **Angular CLI** 21+

### Installation

```bash
# Clone the repository
git clone https://github.com/Chedvy-Rizi/TeamTasks.git
cd TeamTasks

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:4200`

### Build for Production

```bash
# Build the application
npm run build

# Build with Server-Side Rendering
npm run build:ssr

# Serve the production build
npm run serve:ssr
```

### Run Tests

```bash
# Run the test suite
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 🏗️ Architecture

### Project Structure

```
src/app/
├── core/                          # Core services and guards
│   ├── service/                   # Application services
│   │   ├── auth-service.ts       # Authentication logic
│   │   ├── tasks-service.ts      # Task CRUD operations
│   │   ├── projects-service.ts   # Project management
│   │   ├── teams-service.ts      # Team operations
│   │   ├── comments-service.ts   # Comment management
│   │   ├── users-service.ts      # User queries
│   │   ├── loading-service.ts    # Global loading state
│   │   └── notification-service.ts # Toast notifications
│   ├── guard/
│   │   └── auth-guard.ts         # Route protection
│   └── interceptor/
│       └── interceptor.ts         # HTTP JWT interceptor
│
├── features/                       # Feature modules
│   ├── login/                     # Authentication pages
│   ├── register/
│   ├── tasks/                     # Main Kanban board
│   ├── projects/                  # Project management
│   ├── teams/                     # Team management
│   ├── comments/                  # Task comments
│   └── start-page/               # Landing page
│
├── shared/                         # Shared components
│   ├── components/               # Reusable UI components
│   │   ├── add-task/            # Task creation modal
│   │   ├── add-project/         # Project creation
│   │   ├── add-team/            # Team creation
│   │   ├── task-card/           # Task display card
│   │   ├── project-card/        # Project display
│   │   ├── team-card/           # Team display
│   │   ├── header/              # Navigation header
│   │   ├── sidebar/             # Side navigation
│   │   └── loader/              # Loading indicator
│   └── models/                   # TypeScript interfaces
│       ├── task-model.ts
│       ├── project-model.ts
│       ├── teams-model.ts
│       ├── comment-model.ts
│       └── auth-model.ts
│
├── app.routes.ts                 # Routing configuration
├── app.config.ts                 # App configuration
└── app.ts                        # Root component
```

### State Management Pattern

TeamTasks uses **RxJS Signals** for reactive state management:

```typescript
// Example from tasks-service.ts
private _tasks = signal<TaskResponse[]>([]);
tasks$ = this._tasks.asReadonly();

// Update state immutably
this._tasks.update(tasks => [...tasks, newTask]);
```

### Data Flow

```
Component
    ↓
Service (RxJS Signal + HTTP)
    ↓
API Endpoint (Node.js/Express)
    ↓
Database
    ↓
Response → Signal Update → Component Reactivity
```

---

## 🔌 API Integration

The application connects to a Node.js backend API running at `http://localhost:3000/api`

### Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/auth/register` | User registration |
| `GET` | `/api/tasks` | Fetch all tasks |
| `POST` | `/api/tasks` | Create new task |
| `PATCH` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |
| `GET` | `/api/projects` | Fetch projects |
| `POST` | `/api/projects` | Create project |
| `GET` | `/api/teams` | Fetch teams |
| `POST` | `/api/teams` | Create team |
| `GET` | `/api/comments` | Fetch comments |
| `POST` | `/api/comments` | Add comment |

### HTTP Interceptor

All HTTP requests automatically include JWT authentication:

```typescript
// Token automatically added to headers
// Authorization: Bearer <token>

// 401 responses automatically redirect to login
// Token persisted in localStorage
```

---

## 🎨 Design System

### Color Palette

Built with a modern, high-contrast design inspired by the TeamTasks brand:

```css
--tf-gradient: linear-gradient(135deg, #00C2FF 0%, #FF5DA2 100%)
--tf-blue: #00C2FF      /* Cyan */
--tf-green: #2EE59D     /* Green */
--tf-pink: #FF5DA2      /* Magenta */
--tf-dark: #0F172A      /* Dark Background */
```

### Component Library

- **Angular Material** - Pre-built, accessible components
- **Material Icons** - Comprehensive icon library
- **CDK Drag-Drop** - Smooth drag-drop interactions
- **Custom Styling** - Gradient overlays and modern effects

---

## 📱 Responsive Design

Fully responsive across all devices:

```
Desktop (1920px+)  →  Tablet (768px-1024px)  →  Mobile (< 768px)
Full Layout       →  Optimized Grid          →  Stack Layout
```

Media queries ensure optimal experience on all screen sizes.

---

## 🔐 Security Features

### Authentication Flow

1. User enters credentials
2. Backend validates and returns JWT token
3. Token stored in `localStorage`
4. HTTP interceptor auto-attaches token to requests
5. On 401 error → redirect to login & clear token

### Protected Routes

Auth guards prevent unauthorized access:

```typescript
{
  path: 'tasks',
  component: TasksComponent,
  canActivate: [AuthGuard]
}
```

### Token Management

- Automatic token injection via interceptor
- Secure localStorage storage
- Automatic cleanup on logout

---

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- tasks-service.spec.ts
```

**Testing Stack:**
- **Vitest** - Fast unit testing
- **HttpClientTestingModule** - Mock HTTP calls
- **Jasmine Matchers** - Test assertions

---

## 📦 Dependencies

### Core Dependencies
```json
{
  "@angular/core": "^21.0.0",
  "@angular/material": "~21.1.2",
  "@angular/cdk": "~21.1.2",
  "@angular/forms": "^21.0.0",
  "@angular/router": "^21.0.0",
  "rxjs": "~7.8.0",
  "typescript": "~5.6.0"
}
```

See `package.json` for the complete dependency list.

---

## 🚀 Deployment

### Deploy to Render

The live demo is hosted on [Render](https://teamtasks-vlkt.onrender.com):

1. Connect GitHub repository to Render
2. Set build command: `npm run build:ssr`
3. Set start command: `npm run serve:ssr`
4. Configure environment variables
5. Deploy!

### Environment Variables

```env
# Backend API URL
NG_API_URL=http://your-api-url.com

# Token storage key
TOKEN_KEY=your-token-key

# API endpoints
API_TASKS_URL=/api/tasks
API_PROJECTS_URL=/api/projects
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your work (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📋 Coding Guidelines

### Component Pattern

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButton],
  templateUrl: './my-component.html',
  styleUrl: './my-component.css'
})
export class MyComponent {
  private service = inject(MyService);
  
  // Use signals for state
  myData$ = this.service.data$;
}
```

### Service Pattern

```typescript
export class MyService {
  private _data = signal<Data[]>([]);
  data$ = this._data.asReadonly();

  getData() {
    return this.http.get<Data[]>('/api/endpoint').pipe(
      tap(data => this._data.set(data))
    );
  }
}
```

### Form Pattern

```typescript
private fb = inject(FormBuilder);

form = this.fb.group({
  title: ['', Validators.required],
  description: ['', [Validators.required, Validators.minLength(5)]]
});

onSubmit() {
  if (this.form.valid) {
    this.service.save(this.form.value).subscribe();
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **Components not updating** | Ensure you `.subscribe()` to service methods in `ngOnInit()` |
| **Form errors not visible** | Call `form.markAllAsTouched()` before showing errors |
| **401 Unauthorized** | Token expired - clear localStorage and re-login |
| **Drag-drop not working** | Wrap lists in `cdkDropListGroup` parent container |
| **CORS errors** | Check backend server is running and CORS is enabled |

### Debug Mode

Check browser console for detailed error messages and network logs.

---

## 📚 Learning Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Guide](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CDK Drag and Drop](https://material.angular.io/cdk/drag-drop/overview)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Chedvy-Rizi**

- GitHub: [@Chedvy-Rizi](https://github.com/Chedvy-Rizi)
- Repository: [TeamTasks](https://github.com/Chedvy-Rizi/TeamTasks)

---

## 🙌 Acknowledgments

- Angular team for the amazing framework
- Material Design for beautiful UI patterns
- Render for free hosting
- All contributors and supporters

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

[🌐 Visit Live Demo](https://teamtasks-vlkt.onrender.com) | [💻 View Code](https://github.com/Chedvy-Rizi/TeamTasks) | [📧 Contact](mailto:contact@teamtasks.dev)

Made with ❤️ by Chedvy-Rizi

</div>