import { Injectable  } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

import 'rxjs/Rx';

/*
    Ahmed Zaid
    This service response about getting Http response from server in order to get data
    about employee.
*/
@Injectable()
export class HttpService {
  constructor(private http: Http) { }
// function to get data from the database as jason object
  GetPic(data) {
    return this.http.get('https://recipe-3f6f1.firebaseio.com/' + data + '.json').map
    ((response: Response) => response.json());

  }

}
