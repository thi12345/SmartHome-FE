import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { CommonModule } from '@angular/common';
import { Device, DeviceService, Payload } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService, Category } from '../../../share/category.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare var window: any;


interface Action { pos: number | boolean; name: string; }

@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [DeviceHeaderComponent, CommonModule, HttpClientModule, FormsModule],
  providers: [DeviceService, CategoryService],
  templateUrl: './device-view.component.html',
  styleUrl: './device-view.component.css'
})
export class DeviceViewComponent implements OnInit {
  devices: Device[] = [];
  categories: Category[] = [];
  actions = [{ value: true, name: 'Bật' }, { value: false, name: 'Tắt' }]
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
  payload: any = {
    device: { id: 0, name: '' },
    value: 0,
    action: true
  };

  isOnOff: { [key: string]: string } = { 'true': 'đang bật', 'false': 'đang tắt' }
  OnOff: { [key: string]: string } = { 'false': 'Bật', 'true': 'Tắt' }

  isLoading: boolean = false;  // Biến để xử lý trạng thái loading
  errorMessage: string = '';  // Biến để lưu thông báo lỗi
  constructor(private deviceService: DeviceService, private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    this.fetchDevices();

    this.fetchCategories();

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
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }


  openModal(device: Device): void {
    this.payload.device = device
    this.values = (device.category.name === 'Quạt') ? this.numbers : this.chars;
    const myModal = new window.bootstrap.Modal(document.getElementById('myModal')); myModal.show();
  }

  submitForm(): void {
    this.deviceService.switchDevice(this.payload).subscribe();
    const myModal = window.bootstrap.Modal.getInstance(document.getElementById('myModal')); myModal.hide();
  }

}
