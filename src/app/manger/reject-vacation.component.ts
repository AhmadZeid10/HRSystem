import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reject-vacation',
  templateUrl: './reject-vacation.component.html',
  styleUrls: ['./reject-vacation.component.css']
})
export class RejectVacationComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal ) {
  }
  ngOnInit() {

  }

  rejectVacation() {
    this.activeModal.dismiss('Rejected');
  }

}
