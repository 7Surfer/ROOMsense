import { SensorData } from './../models/SensorData.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-data-list-test',
  templateUrl: './data-list-test.component.html',
  styleUrls: ['./data-list-test.component.css']
})
export class DataListTestComponent implements OnInit, OnDestroy {

  public data = [];
  private dataSubscription: Subscription;

  constructor(public sensorDataService: SensorDataService) { }

  ngOnInit() {
    this.data = this.sensorDataService.getData();
    this.dataSubscription = this.sensorDataService.getDateUpdateListener()
      .subscribe((data: SensorData[]) => {
          this.data = data;
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }




}