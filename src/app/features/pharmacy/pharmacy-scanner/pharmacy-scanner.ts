import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-scanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pharmacy-scanner.html'
})
export class PharmacyScannerComponent {
  // TODO: wire scanner/QR camera integration
  // TODO: wire manual code lookup

  manualLookup(): void {
    // TODO: implement manual lookup action
    console.log('TODO: manualLookup');
  }
}
