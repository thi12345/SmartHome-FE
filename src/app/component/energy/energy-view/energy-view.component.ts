import { Component, OnInit } from '@angular/core';
import { EnergyHeaderComponenet } from '../energy-header/energy-header.component';
import { CommonModule } from '@angular/common';
import { LogService } from '../../../share/log.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-energy-view',
  standalone: true,
  imports: [EnergyHeaderComponenet, CommonModule, HttpClientModule],
  providers: [LogService],
  templateUrl: './energy-view.component.html',
  styleUrl: './energy-view.component.css'
})
export class EnergyViewComponent implements OnInit {
  energyList: any[] = [];
  constructor(
    private logService: LogService, private router: Router) { }
  ngOnInit(): void {
    this.fetchEnergy();

  }

  fetchEnergy(): void {
    this.logService.getEnergyConsume().subscribe((data: any) => {
      this.energyList = data;
    });
  }



}
