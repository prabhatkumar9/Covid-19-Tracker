import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GlobalDataSummary } from '../Models/globalData';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  defaultCountry: string = 'India';

  dataTable = [];

  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData;
  loading = true;



  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }

  public ColumnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }


  chart = {
    PieChart: "PieChart",
    ColumnChart: 'ColumnChart',
    LineChart: "LineChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }


  constructor(private service: DataService) { }

  ngOnInit(): void {

    merge(
      this.service.getDateWiseData().pipe(
        map(result => {
          this.dateWiseData = result;
        })
      ),
      this.service.getData().pipe(map(result => {
        this.data = result;
        this.data.forEach(cs => {
          this.countries.push(cs.country)
        })
      }))
    ).subscribe(
      {
        complete: () => {
          this.updateValues(this.defaultCountry)
          this.loading = false;
        }
      }
    )



  }

  updateChart() {

    // this.dataTable.push(["Date", 'Cases'])
    this.selectedCountryData.forEach(cs => {
      this.dataTable.push([cs.cases, cs.date])
    })


  }

  updateValues(country: string) {
    // console.log(country);
    this.data.forEach(cs => {
      if (cs.country == country) {
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })

    this.selectedCountryData = this.dateWiseData[country]
    // console.log(this.selectedCountryData);
    this.updateChart();

  }

}
