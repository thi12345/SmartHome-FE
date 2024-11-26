import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { UserService } from '../../../share/user.service';
import { User } from '../../../models/user.modal';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user: User | null = null;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }
  onUpdate() {
    // this.userService.updateUser(user);
  }
  onChangeInfo(){}
}
