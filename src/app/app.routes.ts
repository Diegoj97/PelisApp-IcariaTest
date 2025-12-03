import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./movies/movies.routing').then(m => m.default)
    }
];
