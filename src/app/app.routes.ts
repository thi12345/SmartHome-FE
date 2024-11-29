import { Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { UserInfoComponent } from './component/account/user-info/user-info.component';
import { DeviceAddComponent } from './component/device/device-add/device-add.component';
import { DeviceDeleteComponent } from './component/device/device-delete/device-delete.component';
import { DeviceViewComponent } from './component/device/device-view/device-view.component';
import { DeviceScheduleComponent } from './component/device-schedule/device-schedule.component';
import { HistoryComponent } from './component/history/history.component';
import { LoginComponent } from './component/account/login/login.component';
import { SignupComponent } from './component/account/signup/signup.component';
import { ChangepassComponent } from './component/account/changepass/changepass.component';
import { DeviceUpdateComponent } from './component/device/device-update/device-update.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'user-info', component: UserInfoComponent},
    {path: 'device-add', component: DeviceAddComponent},
    {path: 'device', component: DeviceViewComponent},
    {path: 'device-schedule', component: DeviceScheduleComponent},
    {path: 'device-delete', component: DeviceDeleteComponent},
    {path: 'device-update/:id', component: DeviceUpdateComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'changepass', component: ChangepassComponent},
    {path: 'user-info', component: UserInfoComponent}
];
