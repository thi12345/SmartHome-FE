import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

interface Device{
  name: string;
  type: string;   
  status: string;
  location: string;
}
@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [DeviceHeaderComponent, CommonModule, HeaderComponent],
  templateUrl: './device-view.component.html',
  styleUrl: './device-view.component.css'
})
export class DeviceViewComponent {
  devices: Device[] = [
    {name: 'Device 1', type: 'Fan',status: 'Active', location: 'Living Room'},
  ];
}
