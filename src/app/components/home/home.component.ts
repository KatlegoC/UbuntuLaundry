import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    {
      icon: 'dry_cleaning',
      title: 'Washing and Ironing',
      description: 'Complete washing and professional ironing service. Available in Small, Medium, and Large basket sizes.'
    },
    {
      icon: 'ac_unit',
      title: 'Duvet Inners & Steaming',
      description: 'Expert cleaning and steaming for all duvet sizes. We handle Single, 3/4, Double, and Queen/King sizes.'
    },
    {
      icon: 'hotel',
      title: 'Blankets',
      description: 'Thorough cleaning for blankets of all types. Service available for 1, 2, and 3 ply blankets.'
    },
    {
      icon: 'bed',
      title: 'Bedding Sets & Ironing',
      description: 'Complete bedding set service with professional ironing. All sizes from Single to Queen/King.'
    },
    {
      icon: 'iron',
      title: 'Ironing Only or Tumble Dry',
      description: 'Quick ironing or tumble dry service. Charged at R40 per kilogram for your convenience.'
    },
    {
      icon: 'cleaning_services',
      title: 'Sneaker Wash',
      description: 'Professional sneaker cleaning service for Normal, Leather, and Suede materials. Your sneakers will look brand new!'
    },
    {
      icon: 'content_cut',
      title: 'Alterations & Patching',
      description: 'Expert length or width alterations and patching services. Professional tailoring to fit your needs perfectly.'
    }
  ];

  collectionPoints = [
    'The Hudson',
    'The Madison',
    'The Manhattan',
    'The Atlanta',
    'The Colorado',
    'The Junction Village 1, 2, 3'
  ];

  washingIroning = [
    { size: 'Small Basket', price: 'R180' },
    { size: 'Medium Basket', price: 'R220' },
    { size: 'Large Basket', price: 'R300' }
  ];

  duvetSteaming = [
    { size: 'Single', price: 'R80' },
    { size: '3/4', price: 'R95' },
    { size: 'Double', price: 'R120' },
    { size: 'Queen/King', price: 'R150' }
  ];

  blankets = [
    { ply: '1 Ply', price: 'R100' },
    { ply: '2 Ply', price: 'R140' },
    { ply: '3 Ply', price: 'R200' }
  ];

  beddingSets = [
    { size: 'Single', price: 'R80' },
    { size: '3/4', price: 'R90' },
    { size: 'Double', price: 'R110' },
    { size: 'Queen/King', price: 'R150' }
  ];

  ironingOnly = {
    description: 'Ironing Only or Tumble Dry',
    price: 'R40 per kilogram'
  };

  sneakerWash = [
    { type: 'Normal', price: 'R85' },
    { type: 'Leather', price: 'R90' },
    { type: 'Suede', price: 'R100' }
  ];

  alterations = {
    description: 'Length or Width Alterations',
    price: 'Contact for quote'
  };

  getServiceGradient(index: number): string {
    const gradients = [
      'linear-gradient(135deg, rgba(255, 182, 193, 0.15), rgba(255, 182, 193, 0.05))',
      'linear-gradient(135deg, rgba(78, 205, 196, 0.15), rgba(78, 205, 196, 0.05))',
      'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))',
      'linear-gradient(135deg, rgba(177, 156, 217, 0.15), rgba(177, 156, 217, 0.05))',
      'linear-gradient(135deg, rgba(255, 105, 180, 0.15), rgba(255, 105, 180, 0.05))',
      'linear-gradient(135deg, rgba(78, 205, 196, 0.15), rgba(78, 205, 196, 0.05))',
      'linear-gradient(135deg, rgba(177, 156, 217, 0.15), rgba(177, 156, 217, 0.05))'
    ];
    return gradients[index % gradients.length];
  }

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

