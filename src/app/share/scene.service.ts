import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from './device.service';

export interface Scene {
    id: number;
    device0: Device;
    value0: string;
    device1: Device;
    value1: string;
    action1: boolean;
    compare: number;
}
@Injectable({
    providedIn: 'root',
})

export class SceneService {
    private baseUrl = 'http://localhost:8080/api/scene';
    constructor(private http: HttpClient) { }

    getScenes(): Observable<Scene[]> {
        return this.http.get<Scene[]>(`${this.baseUrl}`);
    }

    getSceneById(id: number): Observable<Scene> {
        return this.http.get<Scene>(`${this.baseUrl}/${id}`);
    }

    // Thêm mới category
    addScene(scene: Scene): Observable<Scene> {
        return this.http.post<Scene>(`${this.baseUrl}`, scene);
    }

    // Cập nhật category theo ID
    updateScene(id: number, scene: Scene): Observable<Scene> {
        return this.http.put<Scene>(`${this.baseUrl}/${id}`, scene);
    }

    // Xóa category theo ID
    deleteScene(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}