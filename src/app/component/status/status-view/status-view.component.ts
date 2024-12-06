import { Component, OnInit } from '@angular/core';
import { StatusHeaderComponent } from '../status-header/status-header.component';
import { CommonModule } from '@angular/common';
import { Status, StatusService } from '../../../share/status.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-status-view',
  standalone: true,
  imports: [StatusHeaderComponent, CommonModule, HttpClientModule],
  providers: [StatusService, StatusService],
  templateUrl: './status-view.component.html',
  styleUrl: './status-view.component.css'
})
export class StatusViewComponent implements OnInit {
  statuses: Status[] = [];
  constructor(
    private statusService: StatusService, private router: Router) { }
  ngOnInit(): void {
    this.fetchStatuses();

  }

  goToUpdate(id: number): void {
    this.router.navigate(['/status-update', id]);
  }
  deleteStatus(id: number): void {
    if (confirm('Xóa tình trạng thiết bị sẽ xóa luôn thiết bị, lịch sử và lịch hoạt động kèm theo. Bạn chắc chứ?')) {
      this.statusService.deleteStatus(id).subscribe(() => {
        alert('Xóa tình trạng thiết bị thành công');
        this.fetchStatuses(); // Cập nhật danh sách sau khi xóa
      });
    }
  }
  fetchStatuses(): void {
    this.statusService.getStatuses().subscribe((data: any) => {
      this.statuses = data;
    });
  }



}
