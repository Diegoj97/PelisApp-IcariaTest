
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

export default [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: ':id',
		component: DetailPageComponent
	}
] as import('@angular/router').Routes;
