import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prescription-details.html'
})
export class PrescriptionDetailsComponent {
  // TODO: wire route param `id` and load prescription details

  markDispensed(): void {
    // TODO: implement mark dispensed
    console.log('TODO: markDispensed');
  }

  flagIssue(): void {
    // TODO: implement flag issue
    console.log('TODO: flagIssue');
  }
}
