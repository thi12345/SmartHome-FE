import { Component, OnInit } from '@angular/core';
import { ScheduleHeaderComponent } from '../schedule-header/schedule-header.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ScheduleService, Schedule } from '../../../share/schedule.service';
@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [ScheduleHeaderComponent, CommonModule, HeaderComponent, HttpClientModule],
  providers: [ScheduleService],
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.css'
})
export class SCheduleViewComponent implements OnInit {
  schedules: Schedule[] = [];
  isOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  isLoading: boolean = false;  // Biến để xử lý trạng thái loading
  errorMessage: string = '';  // Biến để lưu thông báo lỗi
  constructor(
    private scheduleService: ScheduleService, private router: Router) { }
  ngOnInit(): void {
    this.fetchSchedule()
  }

  goToUpdate(id: number): void {
    this.router.navigate(['/schedule-update', id]);
  }
  deleteSchedule(id: number): void {
    if (confirm('Are you sure you want to delete this device?')) {
      this.scheduleService.deleteSchedule(id).subscribe(() => {
        alert('Lịch hoạt động đã xóa thành công');
        this.fetchSchedule(); // Cập nhật danh sách sau khi xóa
      });
    }
  }

  fetchSchedule(): void {
    this.scheduleService.getSchedule().subscribe((data) => {
      this.schedules = data;
    });
  }

  turnOnOff(id: number): void { }

}
