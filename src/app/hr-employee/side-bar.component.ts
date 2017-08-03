import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {LoadPageService} from "../services/load-page.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Location} from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

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


    this.httpService.GetPic('/HR').subscribe(
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

  activeTab () {
  }


  loadTab() {
  }


}
