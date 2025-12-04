import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'movies',
        loadChildren: () => import('./movies/movies.routing').then(m => m.default)
    },
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    }
];
