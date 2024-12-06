import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SenSorData, SensorDataService } from '../../share/sensordata.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HttpClientModule, CommonModule],
  providers: [SensorDataService, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent
implements OnInit{
  public temp: string | null = null;
  public currentDateTime!: string;
  // private intervalid: any;
  constructor(private sensorDataService: SensorDataService, private datePipe: DatePipe){
  }
  ngOnInit(): void {
    this.sensorDataService.getSenSorData().subscribe(
      (data: SenSorData[]) => {
        if (data && data.length > 0) {
          // Sắp xếp dữ liệu theo thời gian giảm dần (mới nhất ở đầu)
          const sortedData = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

          // Lấy giá trị nhiệt độ gần nhất (thứ nhất trong mảng đã sắp xếp)
          this.temp = sortedData[0].value;
        }
      },

    );
    this.updateTime();  // Cập nhật thời gian ngay khi component được khởi tạo
    // this.intervalid = setInterval(() => {
    //   this.updateTime();
    // }, 60000);  // Cập nhật mỗi 1 giây
  }
  // ngOnDestroy(): void {
  //   // Dọn dẹp interval khi component bị huỷ
  //   if (this.intervalid) {
  //     clearInterval(this.intervalid);
  //   }
  // }
  updateTime(): void {
    const now = new Date();
    this.currentDateTime = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm') || '';
  }
}
