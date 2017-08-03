  import {EventEmitter, Injectable} from '@angular/core';
  /*
   Ahmed Zaid
   This service response to synchronise loading the main component and sidebar component
   because both need time to get data from server.
   */
  @Injectable()
  export class LoadPageService {
      private isReady= false;
      // Event emitter that make event each time the variabe isReady changes
     Updated: EventEmitter <boolean>= new EventEmitter();
    setdata( value) {
      this.isReady = value;
        this.Updated.emit(this.isReady);
    }

      getdata() {
      return this.isReady;
    }

  }
