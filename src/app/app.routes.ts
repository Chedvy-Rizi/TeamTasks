import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { StartPage } from './features/start-page/start-page';
import { Tasks } from './features/tasks/tasks';
import { Projects } from './features/projects/projects';
import { Teams } from './features/teams/teams';
import { authGuard } from './core/guard/auth-gurad';
import { Notfound } from './features/notfound/notfound';


export const routes: Routes = [
    { path: '', component: StartPage },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'tasks', component: Tasks, canActivate: [authGuard] },
    { path: 'tasks/:projectId', component: Tasks, canActivate: [authGuard] },
    { path: 'projects', component: Projects, canActivate: [authGuard] },
    { path: 'teams', component: Teams, canActivate: [authGuard] },

    { path: '**', component: Notfound },
    { path: '**', redirectTo: '404' }
];
