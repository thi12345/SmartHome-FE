import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { DeviceService, Device } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { Category, CategoryService } from '../../../share/category.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DeviceValue, DeviceValueService } from '../../../share/devicevalue.service';

@Component({
  selector: 'app-device-update',
  standalone: true,
  imports: [DeviceHeaderComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [DeviceService, CategoryService, DeviceValueService],
  templateUrl: './device-update.component.html',
  styleUrl: './device-update.component.css'
})
export class DeviceUpdateComponent implements OnInit {
  deviceId: number = 0;

  onValueString: string = '';
  offValue: string = '';
  onValue: string[] = [];

  categories: Category[] = [];
  newDevice: Device = {
    name: '',
    description: '',
    category: {
      id: 0, name: '',
      feedKey: ''
    },
    energy: 0,
    id: 0,
    isActive: false,
    energyConsume: 0,
    hours: 0
  };


  newDeviceValueOn: DeviceValue = {
    id: 0,
    value: '',
    onOff: true,
    device: {
      id: 0,
      name: '',
      description: null,
      isActive: false,
      category: { id: 0, name: '', feedKey: '' },
      energy: 0,
      energyConsume: 0,
      hours: 0
    },
  };
  newDeviceValueOff: DeviceValue = {
    id: 0,
    value: '',
    onOff: false,
    device: {
      id: 0,
      name: '',
      description: null,
      isActive: false,
      category: { id: 0, name: '', feedKey: '' },
      energy: 0,
      energyConsume: 0,
      hours: 0
    },
  };

  constructor(private deviceService: DeviceService, private categoryService: CategoryService,
    private deviceValueService: DeviceValueService,
    private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));


    this.deviceService.getDeviceById(this.deviceId).subscribe((device: Device) => {
      this.newDevice.id = device.id;
      this.newDevice.name = device.name
      this.newDevice.category = device.category
      this.newDevice.energy = device.energy
      this.newDevice.description = device.description
      this.newDevice.hours = device.hours
      this.newDevice.isActive = device.isActive
      this.newDevice.energyConsume = device.energyConsume



      this.deviceValueService.getDeviceValueOff(device).subscribe((data: DeviceValue) => {
        this.offValue = data.value;
      });

      this.deviceValueService.getDeviceValueOn(device).subscribe((data: DeviceValue[]) => {
        for (var value of data) {
          this.onValue.push(value.value);
        }
        this.onValueString = this.onValue.toString();
      });


    });


    this.fetchCategories();
  }
  onSubmit(form: any): void {
    if (form.valid) {
      if (this.newDevice.energy < 0) {
        alert('Mức năng lượng không được nhỏ hơn 0');
      }
      else {
        this.deviceService.updateDevice(this.deviceId, this.newDevice).subscribe(() => {
          this.newDeviceValueOff.device = this.newDevice;
          this.newDeviceValueOff.value = this.offValue;
          this.deviceValueService.deleteAllByDeviceId(this.newDevice.id).subscribe();

          this.deviceValueService.addDeviceValue(this.newDeviceValueOff).subscribe();


          this.onValue = this.onValueString.split(',');
          for (var value of this.onValue) {
            this.newDeviceValueOn.device = this.newDevice;
            this.newDeviceValueOn.value = value;
            this.deviceValueService.addDeviceValue(this.newDeviceValueOn).subscribe();
          }
          alert('Cập nhật thiết bị thành công!');
          this.router.navigate(['/device']); // Quay lại trang danh sách thiết bị
        });
      }
    }
    else {
      alert('Form không hợp lệ!');
    }
  }
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCancel(): void {
    this.router.navigate(['/device']);
  }
}
