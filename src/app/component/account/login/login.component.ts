import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../share/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
constructor(private userService: UserService, private router: Router) { }
  onLogin() {
    // Xử lý đăng nhập (có thể là gọi API để kiểm tra đăng nhập)
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    const success = this.userService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      console.error('Đăng nhập thất bại');
    }
  }
}
