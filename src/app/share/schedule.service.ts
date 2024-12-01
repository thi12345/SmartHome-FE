import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as moment from 'moment';
import { Observable } from "rxjs";
import { Device } from "./device.service";
export interface Schedule {
  id: number;
  time: moment.Moment;
  action: boolean;
  value: number;
  device: Device;
}
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8080/api/schedule';


  constructor(private http: HttpClient) { }
  getSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}`);
  }

  getSCheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  // Thêm thiết bị mới
  addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiUrl}`, schedule);
  }

  // Cập nhật thông tin thiết bị
  updateSchedule(id: number, schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, schedule);
  }

  // Xóa thiết bị
  deleteSchedule(id: number): Observable<Schedule> {
    return this.http.delete<Schedule>(`${this.apiUrl}/${id}`);
  }
}