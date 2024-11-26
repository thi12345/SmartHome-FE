import { Component } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-device-delete',
  standalone: true,
  imports: [DeviceHeaderComponent, HeaderComponent],
  templateUrl: './device-delete.component.html',
  styleUrl: './device-delete.component.css'
})
export class DeviceDeleteComponent {

}
