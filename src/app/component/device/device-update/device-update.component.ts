import { Component, OnInit } from '@angular/core';
import { DeviceHeaderComponent } from '../device-header/device-header.component';
import { HeaderComponent } from '../../header/header.component';
import { DeviceService, Device } from '../../../share/device.service';
import { HttpClientModule } from '@angular/common/http';
import { Status, StatusService } from '../../../share/status.service';
import { Category, CategoryService } from '../../../share/category.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-device-update',
  standalone: true,
  imports: [DeviceHeaderComponent, HeaderComponent, HttpClientModule, CommonModule, ReactiveFormsModule],
  providers: [DeviceService, StatusService, CategoryService],
  templateUrl: './device-update.component.html',
  styleUrl: './device-update.component.css'
})
export class DeviceUpdateComponent implements OnInit {
  updateDeviceForm!: FormGroup;
  deviceId: number=0;


  statuses: Status[] = [];
  categories: Category[] = [];

  constructor(private deviceService: DeviceService, private statusService: StatusService, private categoryService: CategoryService,
    private fb: FormBuilder, private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));

    this.updateDeviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.deviceService.getDeviceById(this.deviceId).subscribe((device: Device) => { 
      this.updateDeviceForm.patchValue({
        name: device.name,
        description: device.description,
        category: device.category?.id,
        status: device.status?.id,
       
      });
    });
    
    // this.statusService.getStatuses().subscribe((statuses) => {
    //   this.status = statuses;
    // });

    // this.categoryService.getCategories().subscribe((categories) => {
    //   this.category = categories;
    // });
    this.fetchCategories();
    this.fetchStatuses();
  }
  onSubmit(): void {
    if (this.updateDeviceForm.valid) {
      const updatedDevice = this.updateDeviceForm.value;
      this.deviceService.updateDevice(this.deviceId, updatedDevice).subscribe(() => {
        alert('Cập nhật thiết bị thành công!');
        this.router.navigate(['/device']); // Quay lại trang danh sách thiết bị
      });
      
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
  fetchStatuses(): void {
    this.statusService.getStatuses().subscribe((data) => {
      this.statuses = data;
    });
  }
  onCancel(): void {
    this.router.navigate(['/device']);
  }
}
