import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vacation} from '../employee/Vacation';
import {Subscription} from 'rxjs/Subscription';
import {HttpService} from '../services/http.service';
import {LoadPageService} from '../services/load-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import {AcceptVacationComponent} from './accept-vacation.component';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {RejectVacationComponent} from "./reject-vacation.component";





@Component({
  selector: 'app-manger-vacation',
  templateUrl: './manger-vacation.component.html',
  styleUrls: ['./manger-vacation.component.css']
})
export class MangerVacationComponent implements OnInit ,  OnDestroy {

  isReady: boolean;
  id: number;
  days: any[]= [];
  daysName: any[] =  ['Today', 'Yesterday' , 'Older'];
  imgApproved: string ;
  imgRejected: string;
  imgPending: string;
  imgMsg: string;
  imgReport: string;
  imgDoNotDisturb: string;
  statusImage: string;
  statusData: string;
  vacationRequest: Vacation[]= [];
  activeVacationRequests: any [] = [];
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';


  private subscripe: Subscription;
  constructor(private  httpService: HttpService,
              private loadpage: LoadPageService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private modalService: NgbModal,
              private location: Location,
              public afAuth: AngularFireAuth,
              public af: AngularFireDatabase




  ) {



    this.isReady = false;
    this.loadpage.setdata(this.isReady);

    this.imgApproved = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/3F064879-B137-42D3-B93D-B38BE5D674C3.png';
    this.imgRejected = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/9F612745-1460-4A4A-89FE-23EE8A30EC6F.png';
    this.imgPending = 'https://image.ibb.co/doTpea/Pending.png';
    this.imgMsg = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/28B4AA0B-7F42-4A94-9DAE-09A373445B1B.png';
    this.imgReport = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/2349A830-072F-4245-906E-541503F0B78E.png';
    this.imgDoNotDisturb = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/DD376B57-ED32-4E74-8553-3A65E1A5AF6D.png';
    this.statusData = 'Rejected';
    this.statusImage = '';


    //this.activeRoute.writable = true;
    this.subscripe = activeRoute.params.subscribe(
      (param: any) => this.id = param['id']
  );

  }


  ngOnInit() {

    this.isReady = false;
    this.loadpage.setdata(this.isReady);



// Get Array of Years
    this.httpService.GetPic('manger/vacationRequest').subscribe(
      (data: any) => {
        this.days =  data ;
        this.days = Object.keys(data) ;
        this.isReady = true;
        this.vacationRequest = data[this.id];
        this.activeVacationRequests = [] ;
        for (let _i = 0; _i < this.vacationRequest.length; _i++) {
          const num = this.vacationRequest[_i];
          if (num.status === 'Pending')
          {
            this.activeVacationRequests.push(num) ;
          }
        }

        this.loadpage.setdata(this.isReady);
      });
    // this.myVacation = [ new Vacation('dumy', 'dumy' , 'dumy', 'dumy', 'dumy', 'dumy', 'Pending'),
    //new Vacation('dumy1', 'dumy1' , 'dumy1', 'dumy1', 'dumy1', 'dumy111111', 'Approved')];

    this.loadpage.Updated.subscribe(
      () => {
        this.isReady = this.loadpage.getdata();
      }
    );


  }

  changeStatusIcon(statusData){
    if (statusData === 'Approved'){
      this.statusImage = this.imgApproved ;
    } else if ( statusData === 'Rejected') {
      this.statusImage = this.imgRejected;
    } else{
      this.statusImage = this.imgPending;
    }
  }



  chooseDay(value) {
    const newPath = this.location.path().split('/');
    newPath [newPath.length - 1] = this.daysName.indexOf(value.target.value).toString();
    if (value.target.value) {
      this.router.navigate(newPath);
      // this.activeRoute.snapshot.params['id'] = value ;
    }
    // Update Values for Vacation Details
    this.httpService.GetPic('manger/vacationRequest').subscribe(
      (data: any) => {
        this.days =  data ;
        this.days = Object.keys(data) ;
        this.isReady = true;
        this.vacationRequest = data[this.id];
        this.activeVacationRequests = [] ;
        for (let _i = 0; _i < this.vacationRequest.length; _i++) {
          const num = this.vacationRequest[_i];
          if (num.status === 'Pending')
          {
            this.activeVacationRequests.push(num) ;
          }
        }
        this.loadpage.setdata(this.isReady);
      });

  }
  imageReport(test) {
    this.imgReport = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/2349A830-072F-4245-906E-541503F0B78E.png';

    if (test === 'test'){
      return false;
    }
    else {
      if (test === 'Data')
        this.imgReport = 'https://d2yvv6a7kcdl71.cloudfront.net/55b8dd0f18cbbb8110875e08/assets/845EF6B2-61D6-4D85-B8D1-B2ED4D19A3AC.png';
      return true ;
    }
  }

  ngOnDestroy()
  {
    this.subscripe.unsubscribe();
  }

  RejectVacation(event) {

    // console.log(event.target.id);
    const modalRef = this.modalService.open( RejectVacationComponent, { size: 'sm' });
    modalRef.result.catch( (value: any) => {
      if (value === 'Approved') {
        const path = '/manger/vacationRequest/' + this.id + '/' + event.target.id ;


        this.items = this.af.list( path ) ;

        this.items.$ref.ref.child('status').set('Rejected');
        this.vacationRequest[event.target.id].status = 'Rejected';
        this.activeVacationRequests = [] ;


        for (let _i = 0; _i < this.vacationRequest.length; _i++) {
          const num = this.vacationRequest[_i];
          if (num.status === 'Pending')
          {
            this.activeVacationRequests.push(num) ;
          }
        }
        console.log(this.activeVacationRequests);
      }



    });


  }

  acceptVacation(event){
   // console.log(event.target.id);
    const modalRef = this.modalService.open( AcceptVacationComponent, { size: 'sm' });
    modalRef.result.catch( (value: any) => {
      if (value === 'Approved') {
        const path = '/manger/vacationRequest/' + this.id + '/' + event.target.id ;


        this.items = this.af.list( path ) ;

        this.items.$ref.ref.child('status').set('Approved');
        this.vacationRequest[event.target.id].status = 'Approved';
        this.activeVacationRequests = [] ;


        for (let _i = 0; _i < this.vacationRequest.length; _i++) {
          const num = this.vacationRequest[_i];
          if (num.status === 'Pending')
           {
            this.activeVacationRequests.push(num) ;
          }
        }
        console.log(this.activeVacationRequests);
      }



    });

  }







}
