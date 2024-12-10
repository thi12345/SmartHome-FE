import { Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';

import { UserInfoComponent } from './component/account/user-info/user-info.component';
import { LoginComponent } from './component/account/login/login.component';
import { SignupComponent } from './component/account/signup/signup.component';
import { ChangepassComponent } from './component/account/changepass/changepass.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { DeviceAddComponent } from './component/device/device-add/device-add.component';
import { DeviceViewComponent } from './component/device/device-view/device-view.component';
import { DeviceUpdateComponent } from './component/device/device-update/device-update.component';

import { HistoryComponent } from './component/history/history.component';

import { CategoryViewComponent } from './component/category/category-view/category-view.component';
import { CategoryAddComponent } from './component/category/category-add/category-add.component';
import { CategoryUpdateComponent } from './component/category/category-update/category-update.component';

import { ScheduleAddComponent } from './component/schedule/schedule-add/schedule-add.component';
import { ScheduleUpdateComponent } from './component/schedule/schedule-update/schedule-update.component';
import { SCheduleViewComponent } from './component/schedule/schedule-view/schedule-view.component';
import { StatusViewComponent } from './component/status/status-view/status-view.component';
import { StatusAddComponent } from './component/status/status-add/status-add.component';
import { StatusUpdateComponent } from './component/status/status-update/status-update.component';



export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user-info', component: UserInfoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'changepass', component: ChangepassComponent },
    { path: 'user-info', component: UserInfoComponent },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'device-add', component: DeviceAddComponent },
    { path: 'device', component: DeviceViewComponent },
    { path: 'device-update/:id', component: DeviceUpdateComponent },

    { path: 'schedule', component: SCheduleViewComponent },
    { path: 'schedule-add', component: ScheduleAddComponent },
    { path: 'schedule-update/:id', component: ScheduleUpdateComponent },

    { path: 'history', component: HistoryComponent },

    { path: 'category', component: CategoryViewComponent },
    { path: 'category-add', component: CategoryAddComponent },
    { path: 'category-update/:id', component: CategoryUpdateComponent },


    { path: 'status', component: StatusViewComponent },
    { path: 'status-add', component: StatusAddComponent },
    { path: 'status-update/:id', component: StatusUpdateComponent },

];
