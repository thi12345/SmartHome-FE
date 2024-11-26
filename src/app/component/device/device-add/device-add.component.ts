import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { HeaderComponent } from "../../header/header.component";
import { DeviceService } from '../../../share/device.service';
import { Category, Device } from '../../../models/device.modal';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [DeviceHeaderComponent, HeaderComponent, FormsModule, BrowserModule],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.css'
})
export class DeviceAddComponent {
  newDevice: Device = {
    id: 0,
    name: '',
    statusDetail: null,
    description: null,
    isActive: false,
    category: { id: 0, name: '' },
    status: { id: 0, desciption: '' },
    energy: 0,
  };
  categories: Category[]=[];
  constructor(private deviceService: DeviceService) {}
  addDevice(): void{
    this.deviceService.addDevice(this.newDevice).subscribe((result) => {
      console.log('Device added successfully:', result);
      // Reset form hoặc điều hướng người dùng
    });
  }
}
