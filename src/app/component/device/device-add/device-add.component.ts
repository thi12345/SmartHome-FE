import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { DeviceService } from '../../../share/device.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../../share/category.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  newDevice: any = {
    name: '',
    statusDetail: '',
    description: '',
    isActive: false,
    category: { id: 0, name: '' },
    status: { id: 0, description: '' },
    energy: 0,
  };

  //  constructor(private deviceService: DeviceService) {}
  constructor(private deviceService: DeviceService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  addDevice(form: any): void {
    if (form.valid) {

      if (this.newDevice.energy < 0) {
        alert('Mức năng lượng không được nhỏ hơn 0');
      }
      else {
        this.deviceService.addDevice(this.newDevice).subscribe((result) => {
          alert('Thêm thiết bị thành công');
          this.router.navigate(['/device']);
        });
      }

    }
    else { alert('Điền vào tất cả các trường bắt buộc'); }


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
