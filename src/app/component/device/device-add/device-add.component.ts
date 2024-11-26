import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';

@Component({
  selector: 'app-device-add',
  standalone: true,
  imports: [DeviceHeaderComponent],
  templateUrl: './device-add.component.html',
  styleUrl: './device-add.component.css'
})
export class DeviceAddComponent {

}
