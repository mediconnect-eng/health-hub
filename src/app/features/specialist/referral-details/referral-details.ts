import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-referral-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './referral-details.html'
})
export class ReferralDetailsComponent {
  // TODO: wire route param `id` to load referral summary

  accept(): void {
    // TODO: implement accept action
    console.log('TODO: accept referral');
  }

  requestMoreInfo(): void {
    // TODO: implement request more info action
    console.log('TODO: request more info');
  }

  decline(): void {
    // TODO: implement decline action
    console.log('TODO: decline referral');
  }
}
