import { Routes } from '@angular/router';
import { ListComponent } from './page/list/list.component';
import { DetailsComponent } from './shared/details/details.component';

export const routes: Routes = [

{path:'', redirectTo:'list', pathMatch:'full'},
{path:'list', component:ListComponent},
{path:'details/:id', component:DetailsComponent}
];
