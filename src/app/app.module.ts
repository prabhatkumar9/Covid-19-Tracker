import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component'
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent,
    NavbarComponent,
    routingComponent,
    DashboardCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule,

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
