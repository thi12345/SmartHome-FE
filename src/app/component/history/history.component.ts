import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { LogService } from '../../share/log.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HttpClientModule],
  providers: [LogService],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  isOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  historyRecords: any[] = [];
  constructor(private logService: LogService) { }
  ngOnInit(): void {
    this.fetchHistory();
  }
  fetchHistory(): void {
    this.logService.getLogs().subscribe(
      (data) => {
        this.historyRecords = data; // Gán dữ liệu trả về cho biến logs
      },
      (error) => {
        console.error('Lỗi khi tải logs', error); // Xử lý lỗi khi gọi API
      }
    );
  }
  deleteRecord(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      this.logService.deleteLog(id).subscribe(
        () => {
          alert('Xóa log thành công');
          this.fetchHistory(); // Lấy lại danh sách logs sau khi xóa
        },
        (error) => {
          console.error('Lỗi khi xóa log', error); // Xử lý lỗi khi xóa log
        }
      );
    }
  }

}
