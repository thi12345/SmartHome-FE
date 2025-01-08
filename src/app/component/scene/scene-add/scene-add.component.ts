import { Component, OnInit } from '@angular/core';
import { SceneHeaderComponent } from '../scene-header/scene-header.component';
import { HeaderComponent } from "../../header/header.component";
import { Device, DeviceService } from '../../../share/device.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeviceValue, DeviceValueService } from '../../../share/devicevalue.service';
import { Scene, SceneService } from '../../../share/scene.service';
// import * as moment from 'moment';



@Component({
  selector: 'app-scene-add',
  standalone: true,
  imports: [SceneHeaderComponent, HeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [DeviceService, SceneService, DeviceValueService],
  templateUrl: './scene-add.component.html',
  styleUrl: './scene-add.component.css'
})
export class SceneAddComponent implements OnInit {

  devices: Device[] = [];
  deviceValues: DeviceValue[] = [];
  device_id: number = 0;
  value0: string = '';
  value1: string = '';
  compare: number = -1;

  device0: Device = {
    id: 0,
    name: '',
    description: null,
    isActive: false,
    category: { id: 0, name: '', feedKey: '' },
    energy: 0,
    energyConsume: 0,
    hours: 0
  };

  device1: Device = {
    id: 0,
    name: '',
    description: null,
    isActive: false,
    category: { id: 0, name: '', feedKey: '' },
    energy: 0,
    energyConsume: 0,
    hours: 0
  };

  action1: boolean = true;
  // deviceName: string[] = [];
  selectedDevice: any = null;
  turnOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  isRepeat: boolean = false;

  newScene: Scene = {
    id: 0,
    device0: {
      id: 0,
      name: '',
      description: null,
      isActive: false,
      category: {
        id: 0,
        name: '',
        feedKey: ''
      },
      energy: 0,
      energyConsume: 0,
      hours: 0
    },
    value0: '',
    device1: {
      id: 0,
      name: '',
      description: null,
      isActive: false,
      category: {
        id: 0,
        name: '',
        feedKey: ''
      },
      energy: 0,
      energyConsume: 0,
      hours: 0
    },
    value1: '',
    action1: false,
    compare: 0
  }

  //  constructor(private deviceService: DeviceService) {}
  constructor(private deviceService: DeviceService,
    private sceneService: SceneService, private deviceValueService: DeviceValueService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.fetchDevices();
  }
  fetchDevices(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }


  addScene(form: any): void {
    this.newScene.device0 = this.device0;
    this.newScene.value0 = this.value0;

    this.newScene.device1 = this.device1;
    this.newScene.action1 = this.action1;
    this.newScene.value1 = this.value1;
    this.newScene.compare = this.compare;

    if (form.valid) {

      this.sceneService.addScene(this.newScene).subscribe((result) => {
        alert('Thêm kịch bản thành công');
        this.router.navigate(['/scene']);
      });

    }

    else {
      console.log('form invalid', this.newScene);
      alert('Điền vào tất cả các trường bắt buộc');
    }
  }
  getAllDevices(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  }

  onDevice0Change(): void {

  }

  onDevice1Change(): void {

  }



}
