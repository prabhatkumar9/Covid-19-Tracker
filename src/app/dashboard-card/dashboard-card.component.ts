import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  constructor() { }
  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalRecovered')
  totalRecovered;
  @Input('totalDeaths')
  totalDeaths;
  @Input('totalActive')
  totalActive;


  ngOnInit(): void {
  }

}
