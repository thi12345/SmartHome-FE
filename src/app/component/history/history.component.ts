import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  historyRecords = [
    { time: '23:00 5/11/2024', activity: 'Turn off Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
    { time: '18:00 4/11/2024', activity: 'Turn on Light' },
  ];
  deleteRecord(record: any) {
    this.historyRecords = this.historyRecords.filter(r => r !== record);
  }

}
