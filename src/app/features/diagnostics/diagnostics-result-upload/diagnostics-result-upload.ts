import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diagnostics-result-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diagnostics-result-upload.html'
})
export class DiagnosticsResultUploadComponent {
  // TODO: wire upload handling and submission

  submitResults(): void {
    console.log('TODO: submitResults');
  }
}
