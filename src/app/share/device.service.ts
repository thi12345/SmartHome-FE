import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Status } from "./status.service";
import { Category } from "./category.service";
export interface Device {
  id: number;
  name: string;
  description: string | null;  // Mô tả có thể null
  statusDetail: string | null; // statusDetail có thể null
  isActive: boolean;
  category: Category;
  status: Status;
  energy: number;
}
@Injectable({
  providedIn: 'root',
})
export class DeviceService{
  private apiUrl = 'http://localhost:8080/api/device';


  constructor(private http: HttpClient){ }
  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(`${this.apiUrl}`);
  }

  getDeviceById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  // Thêm thiết bị mới
  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(`${this.apiUrl}`, device);
  }

  // Cập nhật thông tin thiết bị
  updateDevice(id: number, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}`, device);
  }

  // Xóa thiết bị
  deleteDevice(id: number): Observable<Device> {
    return this.http.delete<Device>(`${this.apiUrl}/${id}`);
  }
}