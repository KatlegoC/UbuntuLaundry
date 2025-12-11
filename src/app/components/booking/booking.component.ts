import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('picker') datepicker!: MatDatepicker<Date>;
  bookingForm: FormGroup;
  serviceTypes = [
    'Washing and Ironing',
    'Duvet Inners & Steaming',
    'Blankets',
    'Bedding Sets & Ironing',
    'Ironing Only or Tumble Dry',
    'Sneaker Wash',
    'Alterations & Patching'
  ];
  
  collectionPoints = [
    'The Hudson',
    'The Madison',
    'The Manhattan',
    'The Atlanta',
    'The Colorado',
    'The Junction Village 1, 2, 3'
  ];
  
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)]],
      serviceType: ['', Validators.required],
      collectionPoint: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      entranceCode: [''],
      additionalNotes: ['']
    });
  }

  ngOnInit(): void {
  }

  openDatepicker(): void {
    if (this.datepicker) {
      this.datepicker.open();
    }
  }

  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('Submit button clicked');
    console.log('Form valid:', this.bookingForm.valid);
    console.log('Form value:', this.bookingForm.value);
    console.log('Form errors:', this.bookingForm.errors);
    
    // Mark all fields as touched to show validation errors
    this.markFormGroupTouched(this.bookingForm);

    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      
      // Format date properly
      let formattedDate = '';
      if (formValue.date) {
        if (formValue.date instanceof Date) {
          formattedDate = formValue.date.toISOString().split('T')[0];
        } else if (typeof formValue.date === 'string') {
          formattedDate = formValue.date.split('T')[0];
        } else {
          formattedDate = new Date(formValue.date).toISOString().split('T')[0];
        }
      }

      const booking = {
        fullName: formValue.fullName,
        phoneNumber: formValue.phoneNumber,
        serviceType: formValue.serviceType,
        collectionPoint: formValue.collectionPoint,
        date: formattedDate,
        time: formValue.time,
        entranceCode: formValue.entranceCode || '',
        additionalNotes: formValue.additionalNotes || ''
      };

      console.log('Submitting booking:', booking);

      this.bookingService.createBooking(booking).subscribe({
        next: (response) => {
          this.snackBar.open('Booking submitted successfully! We will contact you soon.', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this.bookingForm.reset();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          console.error('Booking error:', error);
          this.snackBar.open('Error submitting booking. Please try again or contact us directly.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      console.log('Form is invalid:', this.bookingForm.errors);
      console.log('Form controls:', Object.keys(this.bookingForm.controls).map(key => ({
        key,
        valid: this.bookingForm.get(key)?.valid,
        errors: this.bookingForm.get(key)?.errors,
        value: this.bookingForm.get(key)?.value
      })));
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.bookingForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }
    if (control?.hasError('minlength')) {
      return `${fieldName} must be at least 2 characters`;
    }
    return '';
  }
}

