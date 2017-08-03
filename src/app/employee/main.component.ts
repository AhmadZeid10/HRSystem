import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

import {LoadPageService} from '../services/load-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {Vacation} from "./Vacation";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VacationTemplateComponent} from "./vacation-template.component";
import { Location } from '@angular/common';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

// To Do
// 1- when select type all and status pending or else it show all  vacations
export class MainComponent implements OnInit , OnDestroy {
  isReady: boolean;
  id: number;
  years: any[]= [];
  leftVac: number;
  extraVac: number;
  annualVac: number;
  totalVac: number;
  typeValue: string;
  statusValue: string;
  imgApproved: string ;
  imgRejected: string;
  imgPending: string;
  imgMsg: string;
  imgReport: string;
  imgDoNotDisturb: string;
  statusImage: string;
  statusData: string;
  myVacation: Vacation[]= [];
  activeVacation: Vacation [] = [];

  private subscripe: Subscription;
  constructor(private  httpService: HttpService,
              private loadpage: LoadPageService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private modalService: NgbModal,
              private location: Location


  ) {
    this.isReady = false;
    this.loadpage.setdata(this.isReady);
    this.leftVac = 0;
    this.extraVac = 0;
    this.annualVac = 0;
    this.totalVac = 0;
    this.typeValue = 'All';
    this.statusValue = 'All';
    this.imgApproved = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/3F064879-B137-42D3-B93D-B38BE5D674C3.png';
    this.imgRejected = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/9F612745-1460-4A4A-89FE-23EE8A30EC6F.png';
    this.imgPending = 'https://image.ibb.co/doTpea/Pending.png';
    this.imgMsg = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/28B4AA0B-7F42-4A94-9DAE-09A373445B1B.png';
    this.imgReport = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/2349A830-072F-4245-906E-541503F0B78E.png';
    this.imgDoNotDisturb = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/DD376B57-ED32-4E74-8553-3A65E1A5AF6D.png';
    this.statusData = 'Rejected';
    this.statusImage = '';
    //Get the id from the URL
    this.subscripe = activeRoute.params.subscribe(
      (param: any) => this.id = param['id']
    );
  }
  // Open the template of ask vacation to fill
  askForVacation(){
    const modalRef = this.modalService.open(VacationTemplateComponent);
  }

  // Change the value of type (Personal , Sick , ..)
  typeOnclickFunction(event){
    this.typeValue = event.target.value;
    this.activeVacation = [];

// To Do
// 1- when select type all and status pending or else it show all  vacations
    //Select what to show to user
    if (event.target.value === 'All')
       this.activeVacation = this.myVacation ;
     else {
     this.myVacation.forEach((vacation ) => {

      if (vacation.type === event.target.value  && (vacation.status === this.statusValue || this.statusValue === 'All' ))
      {
         this.activeVacation.push(vacation);

      }
    });
     }

  }
  // Select a specific status of vacations
  statusOnclickFunction(event){
    this.statusValue = event.target.value;
    this.activeVacation = [];

    if (event.target.value === 'All')
      this.activeVacation = this.myVacation ;
    else {
      this.myVacation.forEach((vacation ) => {

        if (vacation.status === event.target.value &&  (vacation.type === this.typeValue  || this.typeValue === 'All'))
        {
          this.activeVacation.push(vacation);

        }
      });
    }
  }

  ngOnInit() {

    this.isReady = false;
    this.loadpage.setdata(this.isReady);


// Get Array of Years
    this.httpService.GetPic('Years').subscribe(
      (data: any) => {
        this.years =  data ;
        this.years = Object.keys(data) ;
        this. leftVac = data[this.id] ['Left'];
        this. extraVac = data[this.id] ['Extra'];
        this. annualVac = data[this.id] ['Annual'];
        this. totalVac = data[this.id] ['Total'];
        this.isReady = true;
        this.myVacation = data[this.id]['Vacations'];
        this.activeVacation = data[this.id]['Vacations'];
        this.loadpage.setdata(this.isReady);
      });
   // Change the status of isReady to load the page (sideBar + main )
    this.loadpage.Updated.subscribe(
      () => {
        this.isReady = this.loadpage.getdata();
      }
    );


  }
// Determine the image for a vacation depending on its status
  changeStatusIcon(statusData){
    if (statusData === 'Approved'){
      this.statusImage = this.imgApproved ;
    } else if ( statusData === 'Rejected') {
      this.statusImage = this.imgRejected;
    } else{
      this.statusImage = this.imgPending;
    }
  }
 // Put correct sign to select type of vacations
  typeCorrectSign(id) {
    return (document.getElementById(id).innerText === this.typeValue);
  }
  // Put correct sign to select Status of vacations
  statusCorrectSign(id) {
    return (document.getElementById(id).innerText === this.statusValue);
  }

  // Change the year and show its vacation + change URL
  chooseYear(value) {
    const newPath = this.location.path().split('/');
    newPath[newPath.length - 1] = value;
    if (value) {
    this.router.navigate(newPath);
     // this.activeRoute.snapshot.params['id'] = value ;

    }
    // Update Values for Vacation Details
    this.httpService.GetPic('Years').subscribe(
      (data: any) => {
        this. leftVac = data[this.id] ['Left'];
        this. extraVac = data[this.id] ['Extra'];
        this. annualVac = data[this.id] ['Annual'];
        this. totalVac = data[this.id] ['Total'];
        this.myVacation = data[this.id]['Vacations'];
        this.activeVacation = data[this.id]['Vacations'];


      });

  }
  // Change the image of Report depending on status
  imageReport(image) {
    this.imgReport = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/2349A830-072F-4245-906E-541503F0B78E.png';
    if (image === 'Approved') {
      return false;
    } else {
       if (image === 'Rejected')
         this.imgReport = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/845EF6B2-61D6-4D85-B8D1-B2ED4D19A3AC.png';
      return true ;
    }
  }

  ngOnDestroy()
  {
    this.subscripe.unsubscribe();
  }

}
