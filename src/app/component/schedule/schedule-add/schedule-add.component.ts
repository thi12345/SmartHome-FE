import { Component, OnInit } from '@angular/core';
import { ScheduleHeaderComponent } from '../schedule-header/schedule-header.component';
import { HeaderComponent } from "../../header/header.component";
import { Device, DeviceService } from '../../../share/device.service';
import { Schedule, ScheduleService } from '../../../share/schedule.service';
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
  imports: [ScheduleHeaderComponent, HeaderComponent, FormsModule, HttpClientModule, CommonModule, ],
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
  mon: boolean = false;
  tue: boolean = false;
  wed: boolean = false;
  thu: boolean = false;
  fri: boolean = false;
  sat: boolean = false;
  sun: boolean = false;
  minTime = moment().add(30, 'seconds')
  newSchedule: Schedule = {
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
      energy: 0,
      energyConsume: 0,
      hours: 0
    },
    id: 0
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
  }
  monChange(): void {
    this.mon = !this.mon;
  }
  tueChange(): void {
    this.tue = !this.tue;
  }
  wedChange(): void {
    this.wed = !this.wed;
  }
  thuChange(): void {
    this.thu = !this.thu;
  }
  friChange(): void {
    this.fri = !this.fri;
  }
  satChange(): void {
    this.sat = !this.sat;
  }
  sunChange(): void {
    this.sun = !this.sun;
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
    this.newSchedule.mon = this.mon
    this.newSchedule.tue = this.tue
    this.newSchedule.wed = this.wed
    this.newSchedule.thu = this.thu
    this.newSchedule.fri = this.fri
    this.newSchedule.sat = this.sat
    this.newSchedule.sun = this.sun
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
