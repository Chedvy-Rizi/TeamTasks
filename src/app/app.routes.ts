import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { StartPage } from './features/start-page/start-page';
import { Tasks } from './features/tasks/tasks';


export const routes: Routes = [
    { path: '', component: StartPage },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'tasks', component: Tasks }
];
