import { Component, OnInit } from '@angular/core';
import { StatusHeaderComponent } from '../status-header/status-header.component';
import { StatusService } from '../../../share/status.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-status-add',
  standalone: true,
  imports: [StatusHeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [StatusService],
  templateUrl: './status-add.component.html',
  styleUrl: './status-add.component.css'
})
export class StatusAddComponent implements OnInit {
  newStatus: any = {
    description: '',
  };

  //  constructor(private statusService: StatusService) {}
  constructor(private statusService: StatusService,
    private router: Router
  ) { }

  addStatus(form: any): void {
    if (form.valid) {
      this.statusService.addStatus(this.newStatus).subscribe((result) => {
        alert('Thêm tình trạng thiết bị thành công');
        this.router.navigate(['/status']);
      });
    }
    else { alert('Điền vào tất cả các trường bắt buộc'); }


  }
  ngOnInit(): void {

  }

}
