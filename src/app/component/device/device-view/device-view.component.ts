import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { CommonModule } from '@angular/common';
import { Device, DeviceService } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryService, Category } from '../../../share/category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [DeviceHeaderComponent, CommonModule, HttpClientModule],
  providers: [DeviceService, CategoryService],
  templateUrl: './device-view.component.html',
  styleUrl: './device-view.component.css'
})
export class DeviceViewComponent implements OnInit {
  devices: Device[] = [];
  categories: Category[] = [];
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


  turnOnOff(id: number): void { }

}
