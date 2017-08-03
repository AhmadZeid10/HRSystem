import { RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee/employee.component';
import {MangerComponent} from "./manger/manger.component";
import {MANGER_ROUTE} from "./manger/manger_route";
import {HREmployeeComponent} from "./hr-employee/hr-employee.component";


const  APP: Routes = [
  { path : 'HR', component: HREmployeeComponent},
  { path : 'manger', component: MangerComponent , children: MANGER_ROUTE},
  { path : 'main', redirectTo: 'main/2015', pathMatch: 'full'},
  { path : 'main/:id', component: EmployeeComponent},
  { path : ':id', component: EmployeeComponent},

  {path : '', redirectTo: 'main/2015', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(APP);
