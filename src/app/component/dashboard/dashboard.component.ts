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
import { forkJoin } from 'rxjs';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;

  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
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
          name: "ValueTemp",
          data: []//get from ada
        },
        {name: "ValueHumi",
          data:[]
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
        text: "Temperature and Humidity value by Time",
        align: "center",

      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
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
    forkJoin({
      temperature: this.sensorDataService.getNhietdoData(),
      humidity: this.sensorDataService.getDoamData()
    }).subscribe(({temperature, humidity} ) =>{
      const recentTemperatureData = temperature.slice(0,10).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      const recentHumidityData = humidity.slice(0,10).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      const chartLabels = recentTemperatureData.map(item =>
        new Date(item.created_at).toLocaleTimeString('en-US',{
          year: 'numeric', // Năm (2024)
          month: 'short', // Tháng (Dec)
          day: 'numeric', // Ngày trong tháng (9)
          hour: '2-digit', // Giờ (02)
          minute: '2-digit', // Phút (32)
          second: '2-digit', // Giây (45)
          hour12: true
        })
      );


      const temperatureValues = recentTemperatureData.map(item => parseFloat(item.value));

      const humidityValues = recentHumidityData.map(item => parseFloat(item.value));

      this.chartOptions = {
        ...this.chartOptions,
        series: [
          { name: "Temperature", data: temperatureValues },
          { name: "Humidity", data: humidityValues }
        ],
        title: {
          text: "Temperature and Humidity over Time",
          align: "center"
        },
        xaxis: {

                  categories: chartLabels // Mảng thời gian (time) tương ứng
                }
      };
    });
    // this.sensorDataService.getNhietdoData().subscribe(
    //   (data: SenSorData[]) => {
    //     this.sensorData = data;
    //     const recentData = data.slice(-10).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    //     const chartData = recentData.map(item => parseFloat(item.value));// Lấy giá trị 'value' từ mỗi item
    //     const chartLabels = recentData.map(item => new Date(item.created_at).toLocaleTimeString()); // Lấy 'created_at' và chuyển đổi thành thời gian
    //     this.chartOptions = {
    //       ...this.chartOptions,
    //       series: [{
    //         name: 'Temperature',
    //         data: chartData // Mảng giá trị nhiệt độ
    //       }],
    //       xaxis: {
    //         categories: chartLabels // Mảng thời gian (time) tương ứng
    //       }
    //     }
    //   });
    // this.sensorDataService.getDoamData().subscribe(
    //   (data: SenSorData[]) => {
    //     this.sensorData = data;
    //     const recentData = data.slice(-10).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    //     const chartData = recentData.map(item => parseFloat(item.value));// Lấy giá trị 'value' từ mỗi item
    //     const chartLabels = recentData.map(item => new Date(item.created_at).toLocaleTimeString()); // Lấy 'created_at' và chuyển đổi thành thời gian
    //     this.chartOptions = {
    //       ...this.chartOptions,
    //       series: [{
    //         name: 'Temperature',
    //         data: chartData // Mảng giá trị nhiệt độ
    //       }],
    //       xaxis: {
    //         categories: chartLabels // Mảng thời gian (time) tương ứng
    //       }
    //     }
    //   });
  }
}
