import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {LoadPageService} from '../services/load-page.service';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';



@Component({
  selector: 'app-sidebarmanger',
  templateUrl: './sidebarmanger.component.html',
  styleUrls: ['./sidebarmanger.component.css']
})

export class SidebarmangerComponent implements OnInit  {

  userImage: '';
  isReady: boolean;
  userName: '';
  userEmail: '';
  EmploymentData: '';
  manger1: '';
  manger2: '';
  breakTime: '';
  employeeType: '';
  workingTime: '';
  mangerBlueLabel: boolean;
   selectedTab: any [] ;
  private subscripe: Subscription;



  constructor(private  httpService: HttpService , private loadpage: LoadPageService ,
              private location: Location, private  router: Router) {
    this.isReady = false;
    this.loadpage.setdata( this.isReady);
    this.mangerBlueLabel = true;
    const newPath = this.location.path().split('/');
    this.selectedTab =  newPath ;



 /*this.subscripe = activeRoute.params.subscribe(
      (param: any) => this.selectedTab = param['path']
    );*/

  }

  ngOnInit() {


    this.httpService.GetPic('/manger').subscribe(
      (data: any) => { this.userImage = data.image;
        this.userName = data.name;
        this.userEmail = data.Email;
        this.EmploymentData = data.EmploymentData;
        this.manger1 =  data.manger1;
        this.manger2 =  data.manger2;
        this.breakTime =  data.breakTime;
        this.employeeType =  data.employeeType;
        this.workingTime =  data.workingTime;
        this.isReady = true;
        this.loadpage.setdata(this.isReady);



      }
    );

  }

  activeTab (event ) {
    let data: string = '' ;
    data = event.target.id;
    this.selectedTab = [] ;
    if (data === 'myVacation' ) {
      this.selectedTab [1] = 'myVacation';
       this.router.navigate(['/manger/myVacation/2015']);

       let elment = document.getElementById('mangerVacation');
       elment.style.background = '#e6e6e6' ;
       elment = document.getElementById('mangerBlueTab');
       elment.style.background = '#e6e6e6' ;
       elment = document.getElementById('timeAttendanceBlueTab');
       elment.style.background = '#e6e6e6' ;
       elment = document.getElementById('Attendance');
       elment.style.background = '#e6e6e6' ;
       elment = document.getElementById('myVacation');
       elment.style.background= '#ffffff';
       elment = document.getElementById('myVacationBlueTab');
       elment.style.background = '#619cba';

    }
    if (data === 'mangerVacation') {
      this.selectedTab[1] = 'mangerVacation';
      this.router.navigate(['/manger/mangerVacation/0']);
      let elment = document.getElementById('myVacation');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('myVacationBlueTab');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('timeAttendanceBlueTab');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('Attendance');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('mangerVacation');
      elment.style.background = '#ffffff' ;
      elment = document.getElementById('mangerBlueTab');
      elment.style.background = '#619cba' ;
    }


    if (data === 'Attendance') {
      this.selectedTab[1] = 'Attendance';
      this.router.navigate(['/manger/Attendance']);
      let elment = document.getElementById('myVacation');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('myVacationBlueTab');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('mangerBlueTab');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('mangerVacation');
      elment.style.background = '#e6e6e6' ;
      elment = document.getElementById('Attendance');
      elment.style.background = '#ffffff' ;
      elment = document.getElementById('timeAttendanceBlueTab');
      elment.style.background = '#619cba' ;
    }
  }


  loadTab() {

   if (this.selectedTab.includes( 'myVacation')  ) {
     let elment = document.getElementById('mangerVacation');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('mangerBlueTab');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('timeAttendanceBlueTab');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('Attendance');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('myVacation');
     elment.style.background = '#ffffff';
     elment = document.getElementById('myVacationBlueTab');
     elment.style.background = '#619cba';

   }
   if (this.selectedTab.includes( 'mangerVacation') ) {

     let elment = document.getElementById('myVacation');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('myVacationBlueTab');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('timeAttendanceBlueTab');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('Attendance');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('mangerVacation');
     elment.style.background = '#ffffff' ;
     elment = document.getElementById('mangerBlueTab');
     elment.style.background = '#619cba' ;
   }


   if (this.selectedTab.includes( 'Attendance') ) {
     let elment = document.getElementById('myVacation');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('myVacationBlueTab');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('mangerBlueTab');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('mangerVacation');
     elment.style.background = '#e6e6e6' ;
     elment = document.getElementById('Attendance');
     elment.style.background = '#ffffff' ;
     elment = document.getElementById('timeAttendanceBlueTab');
     elment.style.background = '#619cba' ;
   }
 }

}
