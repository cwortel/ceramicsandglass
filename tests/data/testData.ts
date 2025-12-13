export const TestData = {
  baseUrl: 'https://ceramicsandglass.nl',
  
  // Contact form test data
  contactForm: {
    validUser: {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message for the contact form.'
    },
    invalidUser: {
      name: '',
      email: 'invalid-email',
      subject: '',
      message: ''
    }
  },
  
  // Product data
  products: {
    objectsItem: {
      name: 'Objects',
      price: '€300',
      productId: '551',
      category: 'ON THE WHEEL 1965-1985'
    },
    twoObjectsItem: {
      name: 'Two objects',
      price: '€250',
      productId: '552',
      category: 'ON THE WHEEL 1965-1985'
    }
  },
  
  // Expected page titles
  pageTitles: {
    homepage: 'Anne van der Waerden – Ceramics and Glass',
    about: 'About my work – Anne van der Waerden',
    stock: 'Stock – Anne van der Waerden',
    contact: 'Contact – Anne van der Waerden',
    cart: 'Reservations – Anne van der Waerden',
    onTheWheel: 'ON THE WHEEL 1965-1985 – Anne van der Waerden'
  },
  
  // Artist information
  artistInfo: {
    name: 'Anne van der Waerden',
    address: {
      street: 'Rozenstraat 89',
      city: '1016 NN Amsterdam',
      country: 'The Netherlands'
    },
    email: 'info@annevanderwaerden.nl'
  },
  
  // Navigation links
  navigation: {
    links: [
      'Introduction',
      'About my work',
      'Overview',
      'CV',
      'Stock',
      'Contact'
    ]
  },
  
  // Product categories expected counts
  categoryExpectedCounts: {
    'ON THE WHEEL 1965-1985': 12,
    'EARLY HANDMADE 1965-1980': 15,
    'HANDMADE FROM 1980': 9,
    'FORM STUDIES 1984': 4,
    'IN COOPERATION WITH KEES HOOGENDAM': 47
  },
  
  // Artwork details for content verification
  artworkSamples: {
    integration: {
      title: 'Integration',
      height: 'height: 33 cm',
      year: '1977',
      technique: 'Handmade',
      collection: 'Privat collection'
    },
    massiveObject: {
      title: 'Massive object',
      description: 'lingam=Indian name and symbol of the fertilised world-egg',
      height: 'height: 28 cm',
      year: '1995',
      location: 'Studio Ajeto, Novi Bor, Czech Republic'
    }
  }
};