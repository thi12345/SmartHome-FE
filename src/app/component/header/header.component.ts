import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../share/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showDropdown = false;
  constructor(public userService: UserService, private router: Router) {}
  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }
  gotoLogin(){
    this.router.navigate(['/login']);
  }
  gotoSignup(){
    this.router.navigate(['/signup']);
  }
  gotoUserInfo(){
     this.router.navigate(['/user-info']);
  }
  gotoChangePassword(){
     this.router.navigate(['/changepass']);
  }
}
