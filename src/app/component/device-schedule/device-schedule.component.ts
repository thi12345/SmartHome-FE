import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device/device-header/device-header.component';

@Component({
  selector: 'app-device-schedule',
  standalone: true,
  imports: [DeviceHeaderComponent],
  templateUrl: './device-schedule.component.html',
  styleUrl: './device-schedule.component.css'
})
export class DeviceScheduleComponent {

}
