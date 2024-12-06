import { Component, ViewChild, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { SenSorData,SensorDataService } from '../../share/sensordata.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, NgApexchartsModule, HttpClientModule],
  providers: [SensorDataService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public sensorData: SenSorData[] =[];

  constructor(private sensorDataService: SensorDataService) {

    this.chartOptions = {
      series: [
        {
          name: "Value",
          data: []//get from ada
        }
      ],
      chart: {
        height: 500,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Temperature value by Time",
        align: "center",

      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []//get from ada
      }
    };
  }
  ngOnInit(): void {
    this.sensorDataService.getSenSorData().subscribe(
      (data: SenSorData[]) => {
        this.sensorData = data;
        const recentData = data.slice(-10).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        const chartData = recentData.map(item => parseFloat(item.value));// Lấy giá trị 'value' từ mỗi item
        const chartLabels = recentData.map(item => new Date(item.created_at).toLocaleTimeString()); // Lấy 'created_at' và chuyển đổi thành thời gian
        this.chartOptions = {
          ...this.chartOptions,
          series: [{
            name: 'Temperature',
            data: chartData // Mảng giá trị nhiệt độ
          }],
          xaxis: {
            categories: chartLabels // Mảng thời gian (time) tương ứng
          }
        }
      });
  }
}
