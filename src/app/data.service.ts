import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from './Models/globalData';
import { DateWiseData } from './Models/date-wise-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private _url: string = "https://api.covid19india.org/data.json";
  private _url: string = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-28-2020.csv";
  // private _url: string = "https://api.thevirustracker.com/free-api?global=stats";

  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;

  constructor(private http: HttpClient) { }



  getDateWiseData() {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text' })
      .pipe(map(result => {
        let rows = result.split('\n');
        // console.log(rows);
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/)
        dates.splice(0, 4);
        rows.splice(0, 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)
          let con = cols[1];
          cols.splice(0, 4);
          // console.log(con , cols);
          mainData[con] = [];
          cols.forEach((value, index) => {
            let dw: DateWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index]))

            }
            mainData[con].push(dw)
          })

        })


        // console.log(mainData);
        return mainData;
      }))
  }





  getData(): Observable<any> {
    return this.http.get(this._url, { responseType: 'text' }).pipe(map(result => {
      // console.log(result);
      // let data: GlobalDataSummary[] = [];
      let raw = {}; // create a object
      let rows = result.split('\n');
      rows.splice(0, 1);
      // console.log(rows);
      rows.forEach(row => {
        let cols = row.split(/,(?=\S)/);
        // console.log(cols);

        // cs object make key values 
        let cs = {
          country: cols[3], // + convert string into integer
          confirmed: +cols[7],
          deaths: +cols[8],
          recovered: +cols[9],
          active: +cols[10],
        }

        // temp object for checking if value in raw already then perform this
        let temp: GlobalDataSummary = raw[cs.country];
        if (temp) {
          temp.active = cs.active + temp.active;
          temp.confirmed = cs.confirmed + temp.confirmed;
          temp.deaths = cs.deaths + temp.deaths;
          temp.recovered = cs.recovered + temp.recovered;

          // add temp object in raw key and value
          // key will be country of temp and then value will be temp object
          raw[cs.country] = temp;
        } // else value is not present in temp 
        else {
          //insert cs into raw
          raw[cs.country] = cs;
        }

      });
      // console.log(raw);
      // typecast global array
      return <GlobalDataSummary[]>Object.values(raw);
    }));
  }
}
