import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './device.service';
export interface DeviceValue {
  id: number;
  value: string;
  onOff: boolean;
  device: Device;
}
@Injectable({
  providedIn: 'root',
})

export class DeviceValueService {
  private apiUrl = 'http://localhost:8080/api/deviceValue';
  constructor(private http: HttpClient) { }
  getDeviceValueById(id: number): Observable<DeviceValue> {
    return this.http.get<DeviceValue>(`${this.apiUrl}/${id}`);
  }
  addDeviceValue(deviceValue: DeviceValue): Observable<DeviceValue> {
    return this.http.post<DeviceValue>(`${this.apiUrl}`, deviceValue);
  }
  getDeviceValueOn(device: Device): Observable<DeviceValue[]> {
    return this.http.post<DeviceValue[]>(`${this.apiUrl}/valueOn`, device);
  }
  getDeviceValueOff(device: Device): Observable<DeviceValue> {
    return this.http.post<DeviceValue>(`${this.apiUrl}/valueOff`, device);
  }
  deleteAllByDeviceId(deviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/device/${deviceId}`);
  }
}