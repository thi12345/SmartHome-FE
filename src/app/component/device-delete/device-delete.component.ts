import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';

@Component({
  selector: 'app-device-delete',
  standalone: true,
  imports: [DeviceHeaderComponent],
  templateUrl: './device-delete.component.html',
  styleUrl: './device-delete.component.css'
})
export class DeviceDeleteComponent {

}
