import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { Device } from '../../../models/device.modal';
import { DeviceService } from '../../../share/device.service';

@Component({
  selector: 'app-device-view',
  standalone: true,
  imports: [DeviceHeaderComponent, CommonModule, HeaderComponent],
  templateUrl: './device-view.component.html',
  styleUrl: './device-view.component.css'
})
export class DeviceViewComponent {

}
