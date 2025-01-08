import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { CommonModule } from '@angular/common';
import { Device, DeviceService, Payload } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService, Category } from '../../../share/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeviceValue, DeviceValueService } from '../../../share/devicevalue.service';

declare var window: any;


interface Action { pos: number | boolean; name: string; }

@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [DeviceHeaderComponent, CommonModule, HttpClientModule, FormsModule],
  providers: [DeviceService, CategoryService, DeviceValueService],
  templateUrl: './device-view.component.html',
  styleUrl: './device-view.component.css'
})
export class DeviceViewComponent implements OnInit {

  disabledInput = false;

  selectDevice: Device | null = null;

  devices: Device[] = [];


  deviceValueOff: DeviceValue = {
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


  deviceValueOnList: DeviceValue[] = [];

  actions = [{ value: true, name: 'Bật' }, { value: false, name: 'Tắt' }]


  payload: Payload = {
    device: {
      id: 0, name: '',
      description: null,
      isActive: false,
      category: {
        id: 0,
        name: '',
        feedKey: ''
      },
      energy: 0,
      energyConsume: 0,
      hours: 0
    },
    value: '',
    action: true
  };

  isOnOff: { [key: string]: string } = { 'true': 'đang bật', 'false': 'đang tắt' }
  OnOff: { [key: string]: string } = { 'false': 'Bật', 'true': 'Tắt' }

  isLoading: boolean = false;  // Biến để xử lý trạng thái loading
  errorMessage: string = '';  // Biến để lưu thông báo lỗi

  constructor(private deviceService: DeviceService,
    private deviceValueService: DeviceValueService, private router: Router) { }
  ngOnInit(): void {
    this.fetchDevices();

  }

  goToUpdate(id: number): void {
    this.router.navigate(['/device-update', id]);
  }
  deleteDevice(id: number): void {
    if (confirm('Xóa thiết bị sẽ xóa luôn lịch sử và lịch hoạt động kèm theo. Bạn chắc chứ?')) {
      this.deviceService.deleteDevice(id).subscribe(() => {
        alert('Thiết bị được xóa thành công');
        this.fetchDevices(); // Cập nhật danh sách sau khi xóa
      });
    }
  }
  fetchDevices(): void {
    this.deviceService.getDevices().subscribe((data: any) => {
      this.devices = data;
    });
  }



  openModal(device: Device): void {
    this.payload.device = device
    this.deviceValueService.getDeviceValueOff(device).subscribe((data: DeviceValue) => {
      this.deviceValueOff = data;
    });
    this.deviceValueService.getDeviceValueOn(device).subscribe((data: DeviceValue[]) => {
      this.deviceValueOnList = data;
    });
    const myModal = new window.bootstrap.Modal(document.getElementById('myModal')); myModal.show();
  }

  submitForm(): void {
    if (this.payload.action == false) {

      this.payload.value = this.deviceValueOff.value;

    }
    this.deviceService.switchDevice(this.payload).subscribe();
    const myModal = window.bootstrap.Modal.getInstance(document.getElementById('myModal')); myModal.hide();
  }


  takeAction(action: boolean): void {
    if (!action) {
      this.disabledInput = true;
    }
  }
}
