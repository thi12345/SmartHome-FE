import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Status {
  id: number;
  description: string;
}
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private baseUrl = 'http://localhost:8080/api/status';
  constructor(private http: HttpClient) { }
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}`);
  }
  getStatusById(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.baseUrl}/${id}`);
  }

  // Thêm mới status
  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(`${this.baseUrl}`, status);
  }
  updateStatus(id: number, status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.baseUrl}/${id}`, status);
  }

  // Xóa status theo ID
  deleteStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


}