import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { DeviceHeaderComponent } from "../device-header/device-header.component";
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../../share/category.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Status, StatusService } from '../../../share/status.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HeaderComponent, DeviceHeaderComponent, CommonModule, HttpClientModule, FormsModule],
  providers: [CategoryService, StatusService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  statuses: Status[] = [];
  newCategory: Category = {
    id: 0,
    name: ''
  };
  newStatus: Status = {
    id: 0,
    description: ''
  };
  constructor(private categoryService: CategoryService, private statusService: StatusService) { }
  ngOnInit(): void {
    this.fetchCategories();
    this.fetchStatuses();
  }
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  fetchStatuses(): void {
    this.statusService.getStatuses().subscribe((data) => {
      this.statuses = data;
    }
    );
  }
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        alert('Category deleted successfully!');
        this.fetchCategories(); // Cập nhật danh sách sau khi xóa
      });
    }
  }
  deleteStatus(id: number): void {
    if (confirm('Are you sure you want to delete this status?')) {
      this.statusService.deleteStatus(id).subscribe(() => {
        alert('Status deleted successfully!');
        this.fetchStatuses(); // Cập nhật danh sách sau khi xóa
      });
    }
  }
  addCategory(): void {
    this.categoryService.addCategory(this.newCategory).subscribe((result) => {
      console.log('Category added successfully:', result);
      this.fetchCategories();
    });
  }
  addStatus(): void {
    this.statusService.addStatus(this.newStatus).subscribe((result) => {
      console.log('Status added successfully:', result);
      this.fetchStatuses();
    });
  }
}
