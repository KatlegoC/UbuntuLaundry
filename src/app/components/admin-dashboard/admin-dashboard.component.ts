import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  bookings: Booking[] = [];
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'serviceType', 'date', 'time', 'status', 'actions'];
  isAuthenticated = false;
  password = '';
  adminPassword = 'admin123'; // Mock authentication

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // For demo purposes, auto-login. In production, implement proper authentication
    this.isAuthenticated = true;
    this.loadBookings();
  }

  login(): void {
    if (this.password === this.adminPassword) {
      this.isAuthenticated = true;
      this.loadBookings();
      this.snackBar.open('Login successful', 'Close', { duration: 2000 });
    } else {
      this.snackBar.open('Invalid password', 'Close', { duration: 2000 });
    }
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings.sort((a, b) => {
          const dateA = new Date(a.date + ' ' + a.time).getTime();
          const dateB = new Date(b.date + ' ' + b.time).getTime();
          return dateB - dateA; // Sort by newest first
        });
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.snackBar.open('Error loading bookings', 'Close', { duration: 3000 });
      }
    });
  }

  markAsCompleted(booking: Booking): void {
    if (booking.id) {
      this.bookingService.markAsCompleted(booking.id).subscribe({
        next: () => {
          this.snackBar.open('Booking marked as completed', 'Close', { duration: 2000 });
          this.loadBookings();
        },
        error: (error) => {
          console.error('Error updating booking:', error);
          this.snackBar.open('Error updating booking', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getStatusClass(completed: boolean | undefined): string {
    return completed ? 'completed' : 'pending';
  }

  getStatusText(completed: boolean | undefined): string {
    return completed ? 'Completed' : 'Pending';
  }
}

