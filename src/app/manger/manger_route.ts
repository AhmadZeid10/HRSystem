
import { RouterModule, Routes} from '@angular/router';

import {MainComponent} from "../employee/main.component";
import {MangerVacationComponent} from "./manger-vacation.component";
;


export const MANGER_ROUTE: Routes = [
  { path : 'myVacation/:id', component: MainComponent},
  {path: 'mangerVacation/:id' , component: MangerVacationComponent},
  {path : '', redirectTo: 'myVacation/2015', pathMatch: 'full'},

];

export const routing = RouterModule.forRoot(MANGER_ROUTE);
