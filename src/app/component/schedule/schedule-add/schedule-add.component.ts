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
import { DeviceValue, DeviceValueService } from '../../../share/devicevalue.service';
// import * as moment from 'moment';

interface Action { pos: number | boolean; name: string; }

@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [ScheduleHeaderComponent, HeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [DeviceService, ScheduleService, DeviceValueService],
  templateUrl: './schedule-add.component.html',
  styleUrl: './schedule-add.component.css'
})
export class ScheduleAddComponent implements OnInit {
  // startTime: moment();
  // endTime: moment().add(1, 'hours');
  devices: Device[] = [];
  deviceValues: DeviceValue[] = [];
  device_id: number = 0;
  devicePresent: Device = {
    id: 0,
    name: '',
    description: null,
    isActive: false,
    category: { id: 0, name: '', feedKey: '' },
    energy: 0,
    energyConsume: 0,
    hours: 0
  };
  action: boolean = true;
  // deviceName: string[] = [];
  selectedDevice: any = null;
  turnOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  values: Action[] = [];
  isRepeat: boolean = false;
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
    startTime: this.minTime,
    endTime: this.minTime,
    action: true,
    value: '',
    isRepeat: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
    device: {
      id: 0,
      name: '',
      description: null,
      isActive: false,
      category: { id: 0, name: '', feedKey: '' },
    },
  };

  //  constructor(private deviceService: DeviceService) {}
  constructor(private deviceService: DeviceService, private scheduleService: ScheduleService, private deviceValueService: DeviceValueService,
    private router: Router
  ) { }

  // addSchedule(form: any): void {
  //   if (form.valid && this.newSchedule.time) {
  //     if (this.newSchedule.time < moment().add(30, 'seconds')) {
  //       alert('Thời gian phải lớn hơn hiện tại 30 giây');
  //       return
  //     }

  //     if (this.newSchedule.value < 0) {
  //       alert('Giá trị không được nhỏ hơn 0');
  //       return
  //     }

  //     else {
  //       this.scheduleService.addSchedule(this.newSchedule).subscribe((result) => {
  //         alert('Thêm lịch thành công');
  //         this.router.navigate(['/schedule']);
  //       });
  //     }
  //   }
  //   else { alert('Điền vào tất cả các trường bắt buộc'); }


  // }
  ngOnInit(): void {
    this.fetchDevices();
    const currentDate = moment().format('YYYY-MM-DD');
    this.newSchedule.startTime = moment(`${currentDate}T08:00:00`, 'YYYY-MM-DDTHH:mm:ss');
    this.newSchedule.endTime = moment(`${currentDate}T17:00:00`, 'YYYY-MM-DDTHH:mm:ss');
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
  monChange(): void {
    this.newSchedule.mon = true;
  }
  tueChange(): void {
    this.newSchedule.tue = true;
  }
  wedChange(): void {
    this.newSchedule.wed = true;
  }
  thuChange(): void {
    this.newSchedule.thu = true;
  }
  friChange(): void {
    this.newSchedule.fri = true;
  }
  satChange(): void {
    this.newSchedule.sat = true;
  }
  sunChange(): void {
    this.newSchedule.sun = true;
  }
  checkboxChange(): void {
    this.isRepeat = !this.isRepeat;
  }
  checkrepeatFalse(): void {
    if (this.newSchedule.isRepeat == false) {
      this.newSchedule.mon = false;
      this.newSchedule.tue = false;
      this.newSchedule.wed = false;
      this.newSchedule.thu = false;
      this.newSchedule.fri = false;
      this.newSchedule.sat = false;
      this.newSchedule.sun = false;
    }
  }
  addSchedule(form: any): void {
    this.checkrepeatFalse();
    this.newSchedule.action = this.action;
    this.newSchedule.device = this.devicePresent;
    this.newSchedule.isRepeat = this.isRepeat;
    console.log('check', this.action);
    if (form.valid) {
      if (this.newSchedule.endTime < this.newSchedule.startTime) {
        alert('Thời gian kết thúc phải lớn hơn thời gian bắt đầu');
        return
      }

      // if (this.newSchedule.value < 0) {
      //   alert('Giá trị không được nhỏ hơn 0');
      //   return
      // }

      else {

        this.scheduleService.addSchedule(this.newSchedule).subscribe((result) => {
          alert('Thêm lịch thành công');
          this.router.navigate(['/schedule']);
        });
      }
    }

    else {
      console.log('form invalid', this.newSchedule);
      alert('Điền vào tất cả các trường bắt buộc');
    }
  }
  getAllDevices(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }

  onDeviceChange(): void {

    console.log('hello that the device', this.devicePresent);

    // this.deviceService.getDeviceById(this.devicePresent.id).subscribe((data) => {
    //   this.devicePresent = data;

    //   this.getAllValueByDevice(this.devicePresent);
    // });
    this.deviceValueService.getDeviceValueOn(this.devicePresent).subscribe({
      next: (data: any) => {
        this.deviceValues = data;
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy giá trị thiết bị:', err);
        alert('Lỗi khi lấy giá trị thiết bị');
      },
    });

  }
  //  getAllValueByDevice(device: Device):void {

  //   this.deviceValueService.getAllDeviceValueByDevice(device).subscribe({
  //     next: (data) => {
  //       this.deviceValues = data;
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi lấy giá trị thiết bị:', err);
  //       alert('Lỗi khi lấy giá trị thiết bị');
  //     },
  //   });
  //  }

}
