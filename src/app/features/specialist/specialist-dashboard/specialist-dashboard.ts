import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialist-dashboard.html'
})
export class SpecialistDashboardComponent {
  // TODO: wire in data for Pending Referrals
  // TODO: wire in data for Today's Appointments
  // TODO: wire in data for Active Consultations
}
