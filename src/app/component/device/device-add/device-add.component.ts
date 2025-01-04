import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { Device, DeviceService } from '../../../share/device.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../../share/category.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceValue, DeviceValueService } from '../../../share/devicevalue.service';
import { off } from 'node:process';
@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [DeviceHeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [DeviceService, CategoryService],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.css'
})
export class DeviceAddComponent implements OnInit {
  categories: any[] = [];
  statuses: any[] = [];
  offValue: string = '';
  onValue: string[] = [];
  otherValue: number = 0;
  // onDeviceValue: string = '';
  // offDeviceValue: string = '';

  newDevice: Device = {
    id: 0,
    name: '',
    description: null,
    isActive: false,
    energyConsume: 0,
    hours: 0,
    category: { id: 0, name: '', feedKey: '' },
    energy: 0,

  };
  newDeviceValueOn: DeviceValue = {
    id: 0,
    value: '',
    onOff: false,
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
  };
  newDeviceValueOff: DeviceValue = {
    id: 0,
    value: '',
    onOff: false,
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
  };

  //  constructor(private deviceService: DeviceService) {}
  constructor(private deviceService: DeviceService,
    private categoryService: CategoryService,
    private deviceValueService: DeviceValueService,
    private router: Router
  ) { }

  addDevice(form: any): void {
    if (form.valid) {
      if (this.newDevice.energy < 0) {
        alert('Mức năng lượng không được nhỏ hơn 0');
        return;
      }

      // Gọi API addDevice
      this.deviceService.addDevice(this.newDevice).subscribe({
        next: (deviceResult) => {
          console.log('Thiết bị được thêm:', deviceResult);

          // Gọi API addDeviceValue cho Off Value
          this.newDeviceValueOff.device = deviceResult;
          this.newDeviceValueOff.onOff = false;
          this.newDeviceValueOff.value = this.offValue.toString();

          this.deviceValueService.addDeviceValue(this.newDeviceValueOff).subscribe({
            next: (offResult) => {
              console.log('Giá trị Off được thêm:', offResult);
            },
            error: (err) => {
              console.error('Lỗi khi thêm giá trị Off:', err);
              alert('Lỗi khi thêm giá trị Off');
            },
          });
          // Gọi API addDeviceValue cho On Value

          for (var value of this.onValue) {
            this.newDeviceValueOn.device = deviceResult;
            this.newDeviceValueOn.onOff = true;
            this.newDeviceValueOn.value = value;

            this.deviceValueService.addDeviceValue(this.newDeviceValueOn).subscribe({
              next: (onResult) => {
                console.log('Giá trị On được thêm:', onResult);

              },
              error: (err) => {
                console.error('Lỗi khi thêm giá trị On:', err);
                alert('Lỗi khi thêm giá trị On');
              },
            });
          }



          alert('Thêm thiết bị và giá trị thành công');
          this.router.navigate(['/device']);
        },
        error: (err) => {
          console.error('Lỗi khi thêm thiết bị:', err);
          alert('Lỗi khi thêm thiết bị');
        },
      });
    } else {
      alert('Điền vào tất cả các trường bắt buộc');
    }
  }
  ngOnInit(): void {
    this.fetchCategories();
  }
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

}
