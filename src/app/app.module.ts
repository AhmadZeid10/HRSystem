import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import {routing} from './app.route';
import { SidebarComponent } from './employee/sidebar.component';
import {HttpService} from './services/http.service';
import { MainComponent } from './employee/main.component';
import {LoadPageService} from './services/load-page.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { VacationTemplateComponent } from './employee/vacation-template.component';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {DatePickerModule} from 'angular-io-datepicker';
import {DatePipe} from '@angular/common';
import { MangerComponent } from './manger/manger.component';
import { SidebarmangerComponent } from './manger/sidebarmanger.component';
import { MangerVacationComponent } from './manger/manger-vacation.component';
import { AcceptVacationComponent } from './manger/accept-vacation.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import { RejectVacationComponent } from './manger/reject-vacation.component';
import { TimeAttendanceComponent } from './manger/time-attendance.component';
import {AccordionModule} from "ngx-accordion";
import { HREmployeeComponent } from './hr-employee/hr-employee.component';
import { SideBarComponent } from './hr-employee/side-bar.component';



export const  config = {
  apiKey: 'AIzaSyAG3ABZSGLZiGcuQQCl4_kbopIhAkQliEY',
  authDomain: 'recipe-3f6f1.firebaseapp.com',
  databaseURL: 'https://recipe-3f6f1.firebaseio.com',
  projectId: 'recipe-3f6f1',
  storageBucket: 'recipe-3f6f1.appspot.com',
  messagingSenderId: '1028246676476'
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SidebarComponent,
    MainComponent,
    VacationTemplateComponent,
    MangerComponent,
    SidebarmangerComponent,
    MangerVacationComponent,
    AcceptVacationComponent,
    RejectVacationComponent,
    TimeAttendanceComponent,
    HREmployeeComponent,
    SideBarComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    HttpModule,
    NgbModule.forRoot(),
    DateTimePickerModule,
    DatePickerModule,
    JsonpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AccordionModule,

  ],
  providers: [HttpService, LoadPageService, DatePipe , ],
  entryComponents: [VacationTemplateComponent, AcceptVacationComponent, RejectVacationComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
