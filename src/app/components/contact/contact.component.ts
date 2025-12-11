import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactInfo = {
    phone: '060 615 3772',
    whatsapp: '060 615 3772',
    email: 'ubuntulaundrylounge@gmail.com',
    address: {
      street: '428 Theuns Van Niekerk St.',
      suburb: 'Wierdapark',
      city: 'Centurion',
      code: '0157'
    },
    estates: [
      'The Hudson',
      'The Madison',
      'The Manhattan',
      'The Atlanta',
      'The Colorado',
      'The Junction Village 1, 2, 3'
    ],
    pickupTimes: {
      friday: 'Friday: 16:00 to 18:00',
      saturday: 'Saturday: 07:00 to 10:00',
      sunday: 'Sunday: 07:00 to 09:00'
    },
    bookingNote: 'You drop a text, entrance code and POP to pre-book on WhatsApp.'
  };
}

