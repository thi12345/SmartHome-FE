import { Component, OnInit } from '@angular/core';
import { StatusHeaderComponent } from '../status-header/status-header.component';
import { StatusService, Status } from '../../../share/status.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status-update',
  standalone: true,
  imports: [StatusHeaderComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [StatusService, StatusService, StatusService],
  templateUrl: './status-update.component.html',
  styleUrl: './status-update.component.css'
})
export class StatusUpdateComponent implements OnInit {
  statusId: number = 0;
  newStatus: any = {
    description: '',

  };

  constructor(private statusService: StatusService,
    private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.statusId = Number(this.route.snapshot.paramMap.get('id'));


    this.statusService.getStatusById(this.statusId).subscribe((status: Status) => {
      this.newStatus.description = status.description
    });



  }
  onSubmit(form: any): void {
    if (form.valid) {
      this.statusService.updateStatus(this.statusId, this.newStatus).subscribe(() => {
        alert('Cập nhật tình trạng thiết bị thành công!');
        this.router.navigate(['/status']); // Quay lại trang danh sách thiết bị
      });
    }
    else {
      alert('Form không hợp lệ!');
    }
  }
  onCancel(): void {
    this.router.navigate(['/status']);
  }
}
