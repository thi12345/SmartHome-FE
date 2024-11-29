import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class LogService {
    private baseUrl = 'http://localhost:8080/api/log';
    constructor(private http: HttpClient) {}
    getLogs(): Observable<any[]>{
        return this.http.get<any[]>(this.baseUrl);
    }
    deleteLog(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}