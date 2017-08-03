/**
 * Created by Ahmad on 7/13/2017.
 * This class hold the data about the vaction
 */
export class Vacation {
  fromDay: string;
  fromHour: string;
  toDay: string;
  toHour: string;
  type: string;
  comments: string;
  status: string;
  private _name: string;


  constructor(fromDay: string, fromHour: string, toDay: string, toHour: string, type: string, comments: string, status: string) {
    this.fromDay = fromDay;
    this.fromHour = fromHour;
    this.toDay = toDay;
    this.toHour = toHour;
    this.type = type;
    this.comments = comments;
    this.status = status;
  }


  set name(value: string) {
    this._name = value;
  }
}
