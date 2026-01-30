import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-specialist-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './specialist-consultation.html'
})
export class SpecialistConsultationComponent {
  // TODO: Read route param `id` and load consultation details when wiring backend

  startConsultation(): void {
    // TODO: implement start consultation action
    console.log('TODO: startConsultation');
  }

  endConsultation(): void {
    // TODO: implement end consultation action
    console.log('TODO: endConsultation');
  }

  requestLabs(): void {
    // TODO: implement request labs action
    console.log('TODO: requestLabs');
  }

  prescribe(): void {
    // TODO: implement prescribe action
    console.log('TODO: prescribe');
  }
}
