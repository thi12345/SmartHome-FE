import { Component, OnInit } from '@angular/core';
import { CategoryHeaderComponent } from '../category-header/category-header.component';
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../../share/category.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [CategoryHeaderComponent, CommonModule, HttpClientModule],
  providers: [CategoryService, CategoryService],
  templateUrl: './category-view.component.html',
  styleUrl: './category-view.component.css'
})
export class CategoryViewComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    this.fetchCategories();

  }

  goToUpdate(id: number): void {
    this.router.navigate(['/category-update', id]);
  }
  deleteCategory(id: number): void {
    if (confirm('Xóa loại thiết bị sẽ xóa luôn thiết bị, lịch sử và lịch hoạt động kèm theo. Bạn chắc chứ?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        alert('Xóa loại thiết bị thành công');
        this.fetchCategories(); // Cập nhật danh sách sau khi xóa
      });
    }
  }
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }



}
