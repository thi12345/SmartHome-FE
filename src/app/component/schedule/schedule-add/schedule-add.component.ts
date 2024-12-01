import { Component, OnInit } from '@angular/core';
import { ScheduleHeaderComponent } from '../schedule-header/schedule-header.component';
import { HeaderComponent } from "../../header/header.component";
import { DeviceService } from '../../../share/device.service';
import { ScheduleService } from '../../../share/schedule.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import moment, { min } from 'moment';
@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [ScheduleHeaderComponent, HeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [DeviceService, ScheduleService],
  templateUrl: './schedule-add.component.html',
  styleUrl: './schedule-add.component.css'
})
export class ScheduleAddComponent implements OnInit {
  devices: any[] = [];
  turnOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  minTime = moment().add(1, 'minutes')
  newSchedule: any = {
    time: this.minTime,
    action: true,
    value: 0,
    device: { id: 0, name: '' },
  };

  //  constructor(private deviceService: DeviceService) {}
  constructor(private deviceService: DeviceService, private scheduleService: ScheduleService,
    private router: Router
  ) { }

  addSchedule(form: any): void {
    if (form.valid && this.newSchedule.time) {
      if (this.newSchedule.time < moment().add(1, 'minutes')) {
        alert('Thời gian phải lớn hơn hiện tại 1 phút');
        return
      }

      if (this.newSchedule.value < 0) {
        alert('Giá trị không được nhỏ hơn 0');
        return
      }

      else {
        this.scheduleService.addSchedule(this.newSchedule).subscribe((result) => {
          alert('Thêm lịch thành công');
          this.router.navigate(['/schedule']);
        });
      }
    }
    else { alert('Điền vào tất cả các trường bắt buộc'); }


  }
  ngOnInit(): void {
    this.fetchDevices()
  }
  fetchDevices(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }



}
