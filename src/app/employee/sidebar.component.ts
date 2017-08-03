import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

import {LoadPageService} from '../services/load-page.service';





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],


})
export class SidebarComponent implements OnInit {
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

  constructor(private  httpService: HttpService , private loadpage: LoadPageService) {
    this.isReady = false;
    this.loadpage.setdata( this.isReady);

  }

  ngOnInit() {
    this.httpService.GetPic('').subscribe(
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
 // Function to show the details about employee when the info sign is clicked

}
