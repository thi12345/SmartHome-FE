import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

import { Device, DeviceService } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryService, Category } from '../../../share/category.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [DeviceHeaderComponent, CommonModule, HeaderComponent, HttpClientModule],
  providers: [DeviceService, CategoryService],
  templateUrl: './device-view.component.html',
  styleUrl: './device-view.component.css'
})
export class DeviceViewComponent implements OnInit {
  devices: Device[] = [];
  categories: Category[] = [];
  isLoading: boolean = false;  // Biến để xử lý trạng thái loading
  errorMessage: string = '';  // Biến để lưu thông báo lỗi
  constructor(private deviceService: DeviceService, private router: Router) { }
  ngOnInit(): void {
    this.fetchDevices();
    // this.isLoading = true;

    // this.deviceService.getDevices().subscribe({
    //   next: (data) =>{
    //     this.devices = data;
    //     this.isLoading = false;  // Thoát khỏi trạng thái loading
    //   },
    //   error: (error) => {
    //     this.errorMessage = 'Không thể tải danh sách thiết bị';
    //     this.isLoading = false;  // Thoát khỏi trạng thái loading khi lỗi
    //   }
    // });
    // this.fetchCategories();
  }
  // fetchCategories(): void {
  //   this.categoryService.getCategories().subscribe((data) => {
  //     this.categories = data;
  //   });
  // }
  goToUpdate(id: number): void {
    this.router.navigate(['/device/update', id]);
  }
  deleteDevice(id: number): void {
    if (confirm('Are you sure you want to delete this device?')) {
      this.deviceService.deleteDevice(id).subscribe(() => {
        alert('Device deleted successfully!');
        this.fetchDevices(); // Cập nhật danh sách sau khi xóa
      });
    }
  }
  fetchDevices(): void {
    this.deviceService.getDevices().subscribe((data: any) => {
      this.devices = data;
    });
  }
}
