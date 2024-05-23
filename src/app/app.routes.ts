import { Routes } from '@angular/router';
import { ListComponent } from './page/list/list.component';
import { DetailsComponent } from './shared/details/details.component';
import { MoviesComponent } from './page/movies/movies.component';
import { SeriesComponent } from './page/series/series.component';

export const routes: Routes = [

{path:'', redirectTo:'list', pathMatch:'full'},
{path:'list', component:ListComponent},
{path:'movies', component:MoviesComponent},
{path:'details/:id', component:DetailsComponent},
{path:'series', component:SeriesComponent}

];
