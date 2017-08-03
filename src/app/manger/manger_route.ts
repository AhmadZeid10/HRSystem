
import { RouterModule, Routes} from '@angular/router';

import {MainComponent} from "../employee/main.component";
import {MangerVacationComponent} from "./manger-vacation.component";
import {TimeAttendanceComponent} from "./time-attendance.component";
;


export const MANGER_ROUTE: Routes = [
  { path : 'myVacation/:id', component: MainComponent},
  {path: 'mangerVacation/:id' , component: MangerVacationComponent},
  {path: 'Attendance' , component: TimeAttendanceComponent},
  {path : '', redirectTo: 'myVacation/2015', pathMatch: 'full'},

];

export const routing = RouterModule.forRoot(MANGER_ROUTE);
