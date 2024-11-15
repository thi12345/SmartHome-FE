import { Injectable } from '@angular/core';
import { User } from '../models/user.modal';
@Injectable({
  providedIn: 'root'
})

export class UserService {




  private users: User[]= [
     {
      username: 'admin1',
      firstName: 'A',
      lastName: 'Nguyen Van',
      email: 'admin1@gmail.com',
      phoneNumber: '0123456789',
      password: 'admin1'
    },
    {
      username: 'admin2',
      firstName: 'B',
      lastName: 'Nguyen Thi',
      email: 'admin2@gmail.com',
      phoneNumber: '0123456788',
      password: 'admin2'
    }
  ];
  private loggedInUser: User | null = null;
  constructor() {
 
   }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedInUser = user;
      return true; // Đăng nhập thành công
    }
    console.error("Invalid username or password");
    return false; // Đăng nhập thất bại
  }
  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }
  logout(): void {
    this.loggedInUser = null;
  }
  isLoggedIn(): boolean{
    return this.loggedInUser !== null;
  }
}
