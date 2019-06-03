import { SensorData } from './../models/SensorData.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';
import {  } from '@angular/core';
import { RoomData } from '../models/RoomData.model';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor(private http: HttpClient) { }

  private data: SensorData[] = [];
  private dataUpdated = new Subject<SensorData[]>();

  /* getData() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/data')
      .subscribe((sensorData) => {
        this.data = sensorData.data;
        this.dataUpdated.next([...this.data]);
        this.dataUpdated.next(this.data); Damit data im Service nicht verändert werden kann
      });
  } */

  getData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>('http://localhost:3000/api/data');
  }



  getDataroom() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/room')
      .subscribe((sensorData) => {
        this.data = sensorData.data;
        this.dataUpdated.next([...this.data]);
      });
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error!');
  }





  // Raum-Sensor Belegung speichern Yannik
  saveRoomInfo(deviceName: string, roomName: string, lowerLimit: number, upperLimit: number) {
    const roomData: any = {deviceName: deviceName,
                                roomName: roomName,
                                lowerLimit: lowerLimit,
                                upperLimit: upperLimit,
                                timestamp: Math.floor((Date.now() / 1000) - 7)};
    return this.http.post<any>('http://localhost:3000/api/create-room-yannik', roomData);

  }
}
