import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { DeviceService, Device } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { Category, CategoryService } from '../../../share/category.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-device-update',
  standalone: true,
  imports: [DeviceHeaderComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [DeviceService, CategoryService],
  templateUrl: './device-update.component.html',
  styleUrl: './device-update.component.css'
})
export class DeviceUpdateComponent implements OnInit {
  deviceId: number = 0;


  categories: Category[] = [];
  newDevice: any = {
    name: '',
    description: '',
    category: { id: 0, name: '' },
    energy: 0,
  };

  constructor(private deviceService: DeviceService, private categoryService: CategoryService,
    private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));


    this.deviceService.getDeviceById(this.deviceId).subscribe((device: Device) => {
      this.newDevice.name = device.name
      this.newDevice.category = device.category
      this.newDevice.energy = device.energy
      this.newDevice.description = device.description
    });


    this.fetchCategories();
  }
  onSubmit(form: any): void {
    if (form.valid) {
      if (this.newDevice.energy < 0) {
        alert('Mức năng lượng không được nhỏ hơn 0');
      }
      else {
        this.deviceService.updateDevice(this.deviceId, this.newDevice).subscribe(() => {
          alert('Cập nhật thiết bị thành công!');
          this.router.navigate(['/device']); // Quay lại trang danh sách thiết bị
        });
      }
    }
    else {
      alert('Form không hợp lệ!');
    }
  }
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCancel(): void {
    this.router.navigate(['/device']);
  }
}
