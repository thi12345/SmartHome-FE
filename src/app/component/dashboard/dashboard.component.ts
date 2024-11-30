import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chart: any;
  temperatureData: number[] = []; // Mảng lưu trữ nhiệt độ
  humidityData: number[] = []; // Mảng lưu trữ độ ẩm
  timeLabels: string[] = []; 
}
