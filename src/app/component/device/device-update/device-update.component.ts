import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-device-update',
  standalone: true,
  imports: [DeviceHeaderComponent, HeaderComponent],
  templateUrl: './device-update.component.html',
  styleUrl: './device-update.component.css'
})
export class DeviceUpdateComponent {

}
