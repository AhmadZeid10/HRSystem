import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {DatePipe} from "@angular/common";
import {Vacation} from "./Vacation";


@Component({
  selector: 'app-vacation-template',
  templateUrl: './vacation-template.component.html',
  styleUrls: ['./vacation-template.component.css']
})
export class VacationTemplateComponent implements OnInit {
  type: string;

  public uploader: FileUploader = new FileUploader( {});
  public hasBaseDropZoneOver: boolean;
  public hasAnotherDropZoneOver: boolean ;
  constructor(public activeModal: NgbActiveModal , public datepipe: DatePipe) {
      this.type = 'Sick';
  }

  onSubmit(f: NgForm) {
console.log(f);
if (f.valid === true) {
    //FromDay
    const startdate = new Date(f.value.Startdate._i.year , f.value.Startdate._i.month  , f.value.Startdate._i.date);
    const date2  = this.datepipe.transform(startdate , 'd-MMMM-yyyy').toString();
    // Split the data
    const spl = date2.split( /-/ );
    const fromDay = spl[0] + ' ' + spl[1];



      //FromTime
      const fromtime =  f.value.startTime._d;
      const fromHour = this.datepipe.transform(fromtime , 'HH:mm')   ;
      //ToDay
      const startdate1 = new Date(f.value.endDate._i.year , f.value.endDate._i.month  , f.value.endDate._i.date);
      const date22  = this.datepipe.transform(startdate1 , 'd-MMMM-yyyy').toString();
      const spl2 = date22.split( /-/ );
      const toDay = spl2[0] + ' ' + spl2[1];
    //ToTime
      const fromtime2 =  f.value.endTime._d;
      const toHour = this.datepipe.transform(fromtime2 , 'HH:mm')   ;
     const comments = '' + f.value.comments ;
    const type = '' + f.value.Type;
     const vacation = new Vacation(fromDay , fromHour , toDay, toHour, type, comments, 'Pending');
     console.log(JSON.stringify(vacation));

}
  }
  ngOnInit() {
  }

  chooseType(event) {
    this.type = event.target.value;
  }

}
