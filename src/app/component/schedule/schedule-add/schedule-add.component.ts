import { Component, OnInit } from '@angular/core';
import { ScheduleHeaderComponent } from '../schedule-header/schedule-header.component';
import { HeaderComponent } from "../../header/header.component";
import { Device, DeviceService } from '../../../share/device.service';
import { ScheduleService } from '../../../share/schedule.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import moment, { min } from 'moment';


interface Action { pos: number | boolean; name: string; }

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
  selectedDevice: any = null;
  turnOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  values: Action[] = [];
  numbers: Action[] = [{ pos: 10, name: '10' },
  { pos: 20, name: '20' },
  { pos: 30, name: '30' },
  { pos: 40, name: '40' },
  { pos: 50, name: '50' },
  { pos: 60, name: '60' },
  { pos: 70, name: '70' },
  { pos: 80, name: '80' },
  { pos: 90, name: '90' },
  { pos: 100, name: '100' }];
  chars: Action[] = [{ pos: 0, name: 'Tất cả' },
  { pos: 1, name: 'Phòng 1' },
  { pos: 2, name: 'Phòng 2' },
  { pos: 3, name: 'Phòng 3' },
  { pos: 4, name: 'Phòng 4' }
  ]
  minTime = moment().add(30, 'seconds')
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
      if (this.newSchedule.time < moment().add(30, 'seconds')) {
        alert('Thời gian phải lớn hơn hiện tại 30 giây');
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
    this.fetchDevices();
  }
  fetchDevices(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }

  onSelectChange(): void {
    this.newSchedule.device = this.selectedDevice;
    this.values = (this.selectedDevice.category.name === 'Quạt') ? this.numbers : this.chars;
  }
}
