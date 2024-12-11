
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

export interface SenSorData {
  id: string; // ID của dữ liệu
  value: string; // Giá trị cảm biến (ở đây là nhiệt độ)
  feed_id: number; // ID của feed
  feed_key: string; // Khóa của feed
  created_at: string; // Thời gian tạo dữ liệu
  created_epoch: number; // Thời gian tạo dữ liệu dưới dạng epoch
  expiration: string; // Thời gian hết hạn dữ liệu
}
@Injectable({
  providedIn: 'root',
})
export class SensorDataService {


  private nhietdo = '';
  private doam = '';
  constructor(private http: HttpClient) { }
  getNhietdoData(): Observable<SenSorData[]> {
    return this.http.get<SenSorData[]>(this.nhietdo);
  }
  getDoamData(): Observable<SenSorData[]> {
    return this.http.get<SenSorData[]>(this.doam);
  }
}
