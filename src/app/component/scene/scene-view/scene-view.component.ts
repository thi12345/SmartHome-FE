import { Component, OnInit } from '@angular/core';
import { SceneHeaderComponent } from '../scene-header/scene-header.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SceneService, Scene } from '../../../share/scene.service';
@Component({
  selector: 'app-scene-view',
  standalone: true,
  imports: [SceneHeaderComponent, CommonModule, HeaderComponent, HttpClientModule],
  providers: [SceneService],
  templateUrl: './scene-view.component.html',
  styleUrl: './scene-view.component.css'
})
export class SceneViewComponent implements OnInit {
  scenes: Scene[] = [];
  isOnOff: { [key: string]: string } = { 'true': 'Bật', 'false': 'Tắt' }
  isLoading: boolean = false;  // Biến để xử lý trạng thái loading
  errorMessage: string = '';  // Biến để lưu thông báo lỗi
  constructor(
    private sceneService: SceneService, private router: Router) { }
  ngOnInit(): void {
    this.fetchScene()
  }


  deleteScene(id: number): void {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
      this.sceneService.deleteScene(id).subscribe(() => {
        alert('Kịch bản đã xóa thành công');
        this.fetchScene(); // Cập nhật danh sách sau khi xóa
      });
    }
  }

  fetchScene(): void {
    this.sceneService.getScenes().subscribe((data) => {
      this.scenes = data;
    });
  }


}
