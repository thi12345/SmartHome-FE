import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Device } from "../models/device.modal";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class DeviceService{
  public DeviceEx: Device[] = [
    {
      "id": 0,
      "name": "quạt treo tường",
      "statusDetail": null,
      "description": null,
      "isActive": false,
      "category": { "id": 1, "name": "quạt" },
      "status": { "id": 0, "desciption": "hoạt động" },
      "energy": 15
    },
    {
      "id": 1,
      "name": "đèn treo tường",
      "statusDetail": null,
      "description": null,
      "isActive": false,
      "category": { "id": 2, "name": "đèn" },
      "status": { "id": 1, "desciption": "bị hỏng" },
      "energy": 15
    }
  ]
  private apiUrl = '';
  constructor(private http: HttpClient){}
  getDevice(): Observable<Device[]>{
    return this.http.get<Device[]>(this.apiUrl);
  }

  getDeviceById(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  // Thêm thiết bị mới
  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  // Cập nhật thông tin thiết bị
  updateDevice(id: number, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}`, device);
  }

  // Xóa thiết bị
  deleteDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}