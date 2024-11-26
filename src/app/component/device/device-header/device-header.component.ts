import { Component } from '@angular/core';

@Component({
  selector: 'app-device-header',
  standalone: true,
  imports: [],
  templateUrl: './device-header.component.html',
  styleUrl: './device-header.component.css'
})
export class DeviceHeaderComponent {
  selectedTab: string = 'view'; // Tab mặc định
  deviceName: string = '';
  deviceType: string = '';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  addDevice() {
    // Logic để thêm thiết bị
    console.log(`Adding device: Name=${this.deviceName}, Type=${this.deviceType}`);
  }
}
