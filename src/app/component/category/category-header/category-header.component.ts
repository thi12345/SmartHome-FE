import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-category-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.css'
})
export class CategoryHeaderComponent {

}
