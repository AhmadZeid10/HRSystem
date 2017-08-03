import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {MangerComponent} from "./manger.component";
import {MangerVacationComponent} from "./manger-vacation.component";

@Component({
  selector: 'app-accept-vacation',
  templateUrl: './accept-vacation.component.html',
  styleUrls: ['./accept-vacation.component.css']
})
export class AcceptVacationComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal ) {
  }
  ngOnInit() {
  }
// Return a message to the parent component (Manage vacation component )
  approveVacation() {
    this.activeModal.dismiss('Approved');
  }


}
