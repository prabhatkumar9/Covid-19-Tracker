import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { GlobalDataSummary } from '../Models/globalData';
import { GoogleChartInterface } from 'ng2-google-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  globalData: GlobalDataSummary[];

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }

  public ColumnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }

  loading = true;
  datatable = [];
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


  // initChart() {
  //   let dataTable = [];
  //   dataTable.push(["country", "cases"]);
  //   this.globalData.forEach(element => {
  //     // push only cases >2000
  //     if (element.confirmed > 2000) {
  //       dataTable.push([element.country, element.confirmed]);
  //     }

  //   });
  //   this.pieChart = {
  //     chartType: 'PieChart',
  //     dataTable: dataTable,
  //     //firstRowIsData: true,
  //     options: {
  //       'country': 'cases',
  //       height: 600
  //     },
  //   };

  //   this.ColumnChart = {
  //     chartType: 'ColumnChart',
  //     dataTable: dataTable,
  //     //firstRowIsData: true,
  //     options: {
  //       'country': 'cases',
  //       height: 600
  //     },
  //   };

  // }


  ngOnInit(): void {
    this._dataService.getData().subscribe({
      next: (result) => {
        // console.log(result);
        // return result;
        this.globalData = result;
        result.forEach(element => {
          if (!Number.isNaN(element.confirmed)) {
            this.totalConfirmed += element.confirmed;
            this.totalDeaths += element.deaths;
            this.totalRecovered += element.recovered;
            this.totalActive += element.active;
          }
          // console.log(this.totalActive);
        });
        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      },
    });

  }

  updateChart(input: HTMLInputElement) {
    // console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {

    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])

    this.globalData.forEach(cs => {
      let value: number;
      if (caseType == 'c')
        if (cs.confirmed > 2000)
          value = cs.confirmed

      if (caseType == 'a')
        if (cs.active > 2000)
          value = cs.active
      if (caseType == 'd')
        if (cs.deaths > 1000)
          value = cs.deaths

      if (caseType == 'r')
        if (cs.recovered > 2000)
          value = cs.recovered


      this.datatable.push([
        cs.country, value
      ])
    })
    // console.log(this.datatable);

  }


}
