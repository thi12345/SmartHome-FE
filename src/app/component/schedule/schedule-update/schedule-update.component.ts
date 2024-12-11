import { Component, OnInit } from '@angular/core';
import { ScheduleHeaderComponent } from '../schedule-header/schedule-header.component';
import { HeaderComponent } from '../../header/header.component';
import { ScheduleService, Schedule } from '../../../share/schedule.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import moment from 'moment';
import { DeviceService, Device } from '../../../share/device.service';

interface Action { pos: number | boolean; name: string; }

@Component({
  selector: 'app-device-update',
  standalone: true,
  imports: [ScheduleHeaderComponent, HeaderComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [ScheduleService, DeviceService],
  templateUrl: './schedule-update.component.html',
  styleUrl: './schedule-update.component.css'
})
export class ScheduleUpdateComponent implements OnInit {
  scheduleId: number = 0;
  devices: Device[] = [];
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

  constructor(private scheduleService: ScheduleService,
    private deviceService: DeviceService,
    private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.scheduleId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchDevice()
    this.scheduleService.getSCheduleById(this.scheduleId).subscribe((schedule: Schedule) => {
      this.values = (schedule.device.category.name === 'Quạt') ? this.numbers : this.chars;
      this.newSchedule.time = schedule.time
      this.newSchedule.action = schedule.action
      this.newSchedule.value = schedule.value
      this.newSchedule.device = schedule.device
    });


  }
  onSubmit(form: any): void {
    if (form.valid && this.newSchedule.time) {
      if (moment(this.newSchedule.time) < moment().add(30, 'seconds')) {
        alert('Thời gian phải lớn hơn hiện tại 30 giây');
        return;
      }

      if (this.newSchedule.value < 0) {
        alert('Giá trị không được nhỏ hơn 0');
        return;
      }

      else {
        this.scheduleService.updateSchedule(this.scheduleId, this.newSchedule).subscribe(() => {
          alert('Sửa lịch thành công');
          this.router.navigate(['/schedule']);
        });
      }
    }
    else { alert('Điền vào tất cả các trường bắt buộc'); }
  }

  onCancel(): void {
    this.router.navigate(['/schedule']);
  }

  fetchDevice(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }

  onSelectChange(): void {
    this.newSchedule.device = this.selectedDevice;
    this.values = (this.selectedDevice.category.name === 'Quạt') ? this.numbers : this.chars;
  }

}
