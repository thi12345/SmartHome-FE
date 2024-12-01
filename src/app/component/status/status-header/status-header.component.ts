import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
@Component({
  selector: 'app-status-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './status-header.component.html',
  styleUrl: './status-header.component.css'
})
export class StatusHeaderComponent {

}
