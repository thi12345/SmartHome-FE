import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-device-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './device-header.component.html',
  styleUrl: './device-header.component.css'
})
export class DeviceHeaderComponent {

}
