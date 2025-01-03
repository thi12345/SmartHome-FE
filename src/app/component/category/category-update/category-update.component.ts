import { Component, OnInit } from '@angular/core';
import { CategoryHeaderComponent } from '../category-header/category-header.component';
import { CategoryService, Category } from '../../../share/category.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [CategoryHeaderComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [CategoryService, CategoryService],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent implements OnInit {
  categoryId: number = 0;
  newCategory: any = {
    name: '',

  };

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));


    this.categoryService.getCategoryById(this.categoryId).subscribe((category: Category) => {
      this.newCategory.name = category.name
    });



  }
  onSubmit(form: any): void {
    if (form.valid) {
      this.categoryService.updateCategory(this.categoryId, this.newCategory).subscribe(() => {
        alert('Cập nhật loại thiết bị thành công!');
        this.router.navigate(['/category']); // Quay lại trang danh sách thiết bị
      });
    }
    else {
      alert('Form không hợp lệ!');
    }
  }
  onCancel(): void {
    this.router.navigate(['/category']);
  }
}
