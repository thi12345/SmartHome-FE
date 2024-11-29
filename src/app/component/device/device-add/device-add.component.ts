import { Component , OnInit} from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { HeaderComponent } from "../../header/header.component";
import { DeviceService } from '../../../share/device.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../../share/category.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [DeviceHeaderComponent, HeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [DeviceService, CategoryService],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.css'
})
export class DeviceAddComponent implements OnInit {
  devices: any[] = [];
  categories: any[] = [];
  newDevice: any = {
    name: '',
    statusDetail: '',
    description: '',
    isActive: false,
    category: { id: 0, name: '' },
    status: { id: 0, desciption: '' },
    energy: 0,
  };

  //  constructor(private deviceService: DeviceService) {}
  constructor(private deviceService: DeviceService, private categoryService: CategoryService) { }

  addDevice(): void{
    this.deviceService.addDevice(this.newDevice).subscribe((result) => {
      console.log('Device added successfully:', result);

      // Reset form hoặc điều hướng người dùng
    });
    
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
