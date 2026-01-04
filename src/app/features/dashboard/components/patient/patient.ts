import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [],
  templateUrl: './patient.html',
  styleUrl: './patient.scss',
})
export class Patient {

  private readonly router = inject(Router);

  navigate(page: number) {
    switch(page) {
       case 1:
        this.router.navigate(['/heal-well/videos']);
        break;
       case 2:
        this.router.navigate(['/patient-services/connect']);
        break;
       case 3:
        this.router.navigate([]);
        break;
       case 4:
        this.router.navigate([]);
        break;
       case 5:
        this.router.navigate([]);
        break;
       case 6:
        this.router.navigate([]);
        break;       
    }
  }
}
