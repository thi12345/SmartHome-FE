import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';

@Component({
  selector: 'app-device-update',
  standalone: true,
  imports: [DeviceHeaderComponent],
  templateUrl: './device-update.component.html',
  styleUrl: './device-update.component.css'
})
export class DeviceUpdateComponent {

}
