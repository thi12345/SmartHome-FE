import { Component, OnInit } from '@angular/core';
import { CategoryHeaderComponent } from '../category-header/category-header.component';
import { CategoryService } from '../../../share/category.service';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [CategoryHeaderComponent, FormsModule, HttpClientModule, CommonModule],
  providers: [CategoryService],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit {
  newCategory: any = {
    name: '',
  };

  //  constructor(private categoryService: CategoryService) {}
  constructor(private categoryService: CategoryService,
    private router: Router
  ) { }

  addCategory(form: any): void {
    if (form.valid) {
      this.categoryService.addCategory(this.newCategory).subscribe((result) => {
        alert('Thêm loại thiết bị thành công');
        this.router.navigate(['/category']);
      });
    }
    else { alert('Điền vào tất cả các trường bắt buộc'); }


  }
  ngOnInit(): void {

  }

}
