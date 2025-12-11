import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Booking {
  id?: number;
  fullName: string;
  phoneNumber: string;
  serviceType: string;
  collectionPoint: string;
  date: string;
  time: string;
  entranceCode?: string;
  additionalNotes?: string;
  completed?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  markAsCompleted(id: number): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}/complete`, {});
  }
}

