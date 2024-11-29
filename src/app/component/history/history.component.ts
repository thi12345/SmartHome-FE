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
//   historyRecords = [
//     {
//       "id": 2,
//       "time": "2024-10-28T17:39:24.535695",
//       "action": true,
//       "value": 0.0,
//           "device": {
//               "id": 1,
//               "name": "đèn LED 7 màu",
//               "statusDetail": null,
//               "description": null,
//               "isActive": false,
//               "category": {
//                 "id": 2,
//                   "name": "LED"
//             },
//               "status": {
//                 "id": 2,
//                 "desciption": "hoạt động"
//             },
//               "energy": 15
//             }
      
//   },
//   {
//     "id": 3,
//     "time": "2024-10-28T17:39:24.535695",
//     "action": true,
//     "value": 0.0,
//         "device": {
//             "id": 1,
//             "name": "đèn LED 8 màu",
//             "statusDetail": null,
//             "description": null,
//             "isActive": false,
//             "category": {
//               "id": 2,
//                 "name": "LED"
//           },
//             "status": {
//               "id": 2,
//               "desciption": "hoạt động"
//           },
//             "energy": 17
//           }
    
// }
//   ];
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
  deleteRecord(id:number):void {
    const confirmDelete = window.confirm('Are you sure you want to delete this record?');
    if (confirmDelete)  {
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
