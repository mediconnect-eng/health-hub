import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnostics-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagnostics-order-details.html'
})
export class DiagnosticsOrderDetailsComponent {
  // TODO: wire order id and load order summary

  acceptOrder(): void {
    console.log('TODO: acceptOrder');
  }

  rejectOrder(): void {
    console.log('TODO: rejectOrder');
  }

  printLabel(): void {
    console.log('TODO: printLabel');
  }
}
