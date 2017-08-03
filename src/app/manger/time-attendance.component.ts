import { Component, OnInit } from '@angular/core';
import {HttpService} from '../services/http.service';


@Component({
  selector: 'app-time-attendance',
  templateUrl: './time-attendance.component.html',
  styleUrls: ['./time-attendance.component.css']
})
export class TimeAttendanceComponent implements OnInit {
  employeeData: any [] ;
  tab: boolean[];
  constructor(private  httpService: HttpService) {
     this.tab = [];

  }


  ngOnInit() {
    const officalHours = 9;
    this.httpService.GetPic('/manger/employee').subscribe(
      (data: any) => {
        this.UpdateAttendanceSheet( data , officalHours );
        this.tab.length = this.employeeData.length ;
      }
    );



    /*this.timeDif = 0;
   const fullTime = this.dates.length * 32400000 ;
    for (const date of this.dates) {
      this.timeDif += date['outTime'].getTime() - date['inTime'].getTime();
    }
    this.timeDif -= fullTime ;
    if ( this.timeDif < 0 )
    {
      this.timeDifColor = ' red';
    }else {
      this.timeDifColor = 'green';
    }
    this.timeDif = Math.abs(this.timeDif);
    if ( this.timeDif / 3600000 < 1 )
    {
      this.timeDifFin = this.timeDif / 60000 + ' Minutes';
    } else if ( this.timeDif % 3600000 === 0 )
    {
      this.timeDifFin = this.timeDif / 3600000 + ' Hours';
    }else  {
      const tempData = (this.timeDif % 3600000) ;
      this.timeDif =  this.timeDif -  tempData;
      //console.log( this.timeDif);
      this.timeDifFin = this.timeDif / 3600000 + ' Hours, ' + tempData / 60000 + ' Minutes';
    }
   console.log(this.timeDifFin);*/
  }

  openTab(event) {
    this.tab[event.target.id] = !this.tab[event.target.id];
  }

// function to update the attendance for each employee depending on the  the given date
  AttendanceTime() {
    const officalHours = 9;
    let fromDate;
    let toDate;
    // Get the data from the server
    this.httpService.GetPic('/manger/employee').subscribe(
      (data: any) => {
        this.UpdateAttendanceSheet(data, officalHours);
      });
    // Check if the input for search is empty
    if (document.getElementById('fromDate').children[0].children['0'].value === '') {
      alert('Please Select Start Date');
      return;
    }
    if (document.getElementById('toDate').children[0].children['0'].value === '') {
      toDate = new Date();
    } else {
      toDate = new Date(document.getElementById('toDate').children[0].children['0'].value);
    }
    fromDate = new Date(document.getElementById('fromDate').children[0].children['0'].value.toString());
    const temp = [];
    for (const ele of this.employeeData) {
      for (const i of ele[1]) {
        console.log(i[0]);
      }
    }
  }

  UpdateAttendanceSheet(data, officalHours) {

    this.employeeData = Object.keys(data).map(function(key) {
      const arr =  Object.keys(data[key]).map ( function (key1) {
        const inTime = key1 + ' ' + data [key][key1]['inTime'] ;
        const outTime = key1 + ' ' + data [key][key1]['outTime'] ;
        let workingHours = new Date(outTime).getTime() - new Date(inTime).getTime();
        let workingHoursString = '';
        let Difference =   workingHours -  officalHours * 3600000;
        let DifferenceString = '' ;
        const TempDifference = Difference ;
        const TempWorkingHours = workingHours ;


        if ( workingHours / 3600000 < 1 )
        {
          workingHoursString = workingHours / 60000 + ' Minutes';
        } else if ( workingHours % 3600000 === 0 )
        {
          workingHoursString = workingHours / 3600000 + ' Hours';
        }else  {
          const tempData = (workingHours % 3600000) ;
          workingHours =  workingHours -  tempData;
          workingHoursString = workingHours / 3600000 + ' Hours, ' + tempData / 60000 + ' Minutes';
        }
        let color = 'green';
        if (Difference < 0 ) {
          color = 'red';
        }
        Difference = Math.abs(Difference);
        if ( Difference / 3600000 < 1 )
        {
          DifferenceString = Difference / 60000 + ' Minutes';
        } else if ( Difference % 3600000 === 0 )
        {
          DifferenceString = Difference / 3600000 + ' Hours';
        }else  {
          const tempData = (Difference % 3600000) ;
          Difference =  Difference -  tempData;
          DifferenceString = Difference / 3600000 + ' Hours, ' + tempData / 60000 + ' Minutes';
        }
        console.log();
        return [ key1,  data [key][key1] , workingHoursString , TempWorkingHours , DifferenceString , TempDifference , color];
      });
      let Summation = 0 ;
      let SummationString = '' ;
      for ( const element of arr) {
        Summation += element[5];
      }


      ;
      let color = 'green';
      if (Summation < 0 ) {
        color = 'red';
      }
      Summation = Math.abs(Summation);
      if ( Summation / 3600000 < 1 )
      {
        SummationString = Summation / 60000 + ' Minutes';
      } else if ( Summation % 3600000 === 0 )
      {
        SummationString = Summation / 3600000 + ' Hours';
      }else  {
        const tempData = (Summation % 3600000) ;
        Summation =  Summation -  tempData;
        SummationString = Summation / 3600000 + ' Hours, ' + tempData / 60000 + ' Minutes';
      }
      arr.sort((a: any [], b: any []) => {

        return (new Date (a[0]) .getTime() - new Date (b[0]).getTime()) ;
      });
      return [key, arr , SummationString , color ];

    });
    // console.log(this.employeeData[0][1]);


  }



}
