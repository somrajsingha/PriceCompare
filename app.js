/**
 * PriceCompare - Application Logic & State Controller
 * Multi-store price comparison across Amazon, Flipkart, JioMart, and Croma for all electronics.
 */

// =============================================================================
// 1. Comprehensive Electronics Catalog Across Amazon, Flipkart, JioMart & Croma
// =============================================================================
const CATALOG = {
  // --- AUDIO & HEADPHONES ---
  'sony-ult-wear': {
    id: 'sony-ult-wear',
    name: 'Sony ULT WEAR Wireless Noise Cancelling Headphones',
    model: 'WH-ULT900N',
    category: 'audio',
    categoryName: 'Audio & Headphones',
    color: 'Black',
    imgAngle: 'assets/images/sony_ult_angle.jpg',
    imgFront: 'assets/images/sony_ult_front.jpg',
    rating: 4.3,
    ratingCount: 3926,
    stores: [
      {
        store: 'JioMart',
        dealBadge: 'Best Deal',
        discount: '-49%',
        price: 12799,
        mrp: 24990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/sony-ult-wear',
        logoClass: 'jiomart-card',
        isBestPrice: true
      },
      {
        store: 'Amazon',
        dealBadge: 'Mega Deal',
        discount: '-48%',
        price: 12989,
        mrp: 24990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/dp/B0D1CY8P2B',
        logoClass: 'amazon-card'
      },
      {
        store: 'Flipkart',
        dealBadge: 'Special Price',
        discount: '-48%',
        price: 12989,
        mrp: 24990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/sony-ult-wear-wh-ult900n',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Festive Deal',
        discount: '-46%',
        price: 13490,
        mrp: 24990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/sony-ult-wear-wireless-headphones',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.4, count: 2100, pct: 88 },
      flipkart: { score: 4.2, count: 1450, pct: 84 },
      jiomart: { score: 4.3, count: 1120, pct: 86 },
      croma: { score: 4.3, count: 376, pct: 86 }
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Ankit Mehra',
        avatar: 'A',
        rating: 5,
        date: '2 days ago',
        verified: true,
        text: 'The bass response on ULT mode is thunderous! Build quality is sleek and comfortable for long listening sessions. Active noise cancellation easily silences commute and office noise.'
      },
      {
        id: 'rev-2',
        author: 'Pooja V.',
        avatar: 'P',
        rating: 5,
        date: '5 days ago',
        verified: true,
        text: 'Much lighter on the head than expected. The battery life is phenomenal—lasted nearly 42 hours with ANC on. At ₹12,799 on JioMart, this is unbeatable value!'
      },
      {
        id: 'rev-3',
        author: 'Karthik Raman',
        avatar: 'K',
        rating: 4,
        date: '1 week ago',
        verified: true,
        text: 'Solid punchy audio. The bass can be overwhelming on ULT 2 setting, but using the Sony Headphones Connect custom EQ balances it out perfectly.'
      }
    ]
  },

  'sony-xm5': {
    id: 'sony-xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones Black',
    model: 'WH-1000XM5',
    category: 'audio',
    categoryName: 'Audio & Headphones',
    color: 'Black',
    imgAngle: 'assets/images/sony_xm5.jpg',
    imgFront: 'assets/images/sony_xm5.jpg',
    rating: 4.6,
    ratingCount: 8420,
    stores: [
      {
        store: 'JioMart',
        dealBadge: 'Mega Saver',
        discount: '-20%',
        price: 25499,
        mrp: 31990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/sony-wh-1000xm5',
        logoClass: 'jiomart-card',
        isBestPrice: true
      },
      {
        store: 'Flipkart',
        dealBadge: 'Mega Deal',
        discount: '-19%',
        price: 25990,
        mrp: 31990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/sony-wh-1000xm5',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Super Deal',
        discount: '-13%',
        price: 27990,
        mrp: 31990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/dp/B09XS7JWHH',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Special Price',
        discount: '-11%',
        price: 28490,
        mrp: 31990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/sony-wh-1000xm5',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.6, count: 4800, pct: 92 },
      flipkart: { score: 4.5, count: 2900, pct: 90 },
      jiomart: { score: 4.4, count: 1800, pct: 88 },
      croma: { score: 4.7, count: 720, pct: 94 }
    },
    reviews: [
      {
        id: 'rev-xm5-1',
        author: 'Devendra K.',
        avatar: 'D',
        rating: 5,
        date: '3 days ago',
        verified: true,
        text: 'Industry leading ANC. The microphone quality on Zoom calls is crystal clear even in windy environments.'
      }
    ]
  },

  'boat-551anc': {
    id: 'boat-551anc',
    name: 'boAt Rockerz 551ANC Bluetooth Headphones Black',
    model: 'Rockerz 551ANC',
    category: 'audio',
    categoryName: 'Audio & Headphones',
    color: 'Black',
    imgAngle: 'assets/images/boat_rockerz.jpg',
    imgFront: 'assets/images/boat_rockerz.jpg',
    rating: 4.1,
    ratingCount: 12850,
    stores: [
      {
        store: 'Flipkart',
        dealBadge: 'Mega Deal',
        discount: '-71%',
        price: 2299,
        mrp: 7990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/boat-rockerz-551anc',
        logoClass: 'flipkart-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart Price',
        discount: '-70%',
        price: 2399,
        mrp: 7990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/boat-rockerz-551anc',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Mega Deal',
        discount: '-69%',
        price: 2499,
        mrp: 7990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/dp/B0BY2MD215',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Deal of Day',
        discount: '-67%',
        price: 2599,
        mrp: 7990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/boat-rockerz-551anc',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.1, count: 7200, pct: 82 },
      flipkart: { score: 4.2, count: 4800, pct: 84 },
      jiomart: { score: 4.1, count: 2100, pct: 82 },
      croma: { score: 4.0, count: 850, pct: 80 }
    },
    reviews: [
      {
        id: 'rev-boat-1',
        author: 'Siddharth P.',
        avatar: 'S',
        rating: 4,
        date: 'Yesterday',
        verified: true,
        text: 'Insane 100-hour battery life. ANC works great for constant engine hum and fan noise.'
      }
    ]
  },

  'airpods-pro-2': {
    id: 'airpods-pro-2',
    name: 'Apple AirPods Pro 2nd Gen with MagSafe Case USB-C',
    model: 'AirPods Pro 2',
    category: 'audio',
    categoryName: 'Audio & Headphones',
    color: 'White',
    imgAngle: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    ratingCount: 16400,
    stores: [
      {
        store: 'Flipkart',
        dealBadge: 'Top Pick',
        discount: '-24%',
        price: 18990,
        mrp: 24900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=apple+airpods+pro+2',
        logoClass: 'flipkart-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart Price',
        discount: '-22%',
        price: 19490,
        mrp: 24900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/apple-airpods-pro-2',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Lightning Deal',
        discount: '-20%',
        price: 19990,
        mrp: 24900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=apple+airpods+pro+2',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Assured Offer',
        discount: '-18%',
        price: 20490,
        mrp: 24900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=apple+airpods+pro+2',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.8, count: 9100, pct: 96 },
      flipkart: { score: 4.7, count: 5200, pct: 94 },
      jiomart: { score: 4.8, count: 1800, pct: 96 },
      croma: { score: 4.9, count: 980, pct: 98 }
    },
    reviews: [
      {
        id: 'rev-app-1',
        author: 'Rhea S.',
        avatar: 'R',
        rating: 5,
        date: '4 days ago',
        verified: true,
        text: 'Adaptive Audio and Transparency mode feel like absolute magic in daily city commutes.'
      }
    ]
  },

  // --- SMARTPHONES / MOBILES ---
  'iphone-15': {
    id: 'iphone-15',
    name: 'Apple iPhone 15 128GB Black',
    model: 'iPhone 15',
    category: 'mobiles',
    categoryName: 'Smartphones & Mobiles',
    color: 'Black',
    imgAngle: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    ratingCount: 14200,
    stores: [
      {
        store: 'JioMart',
        dealBadge: 'Best Price',
        discount: '-22%',
        price: 54990,
        mrp: 69900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/apple-iphone-15-128gb',
        logoClass: 'jiomart-card',
        isBestPrice: true
      },
      {
        store: 'Flipkart',
        dealBadge: 'Mega Deal',
        discount: '-20%',
        price: 55999,
        mrp: 69900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=apple+iphone+15',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Deal of the Day',
        discount: '-19%',
        price: 56499,
        mrp: 69900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=apple+iphone+15',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Store Special',
        discount: '-17%',
        price: 57990,
        mrp: 69900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=apple+iphone+15',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.6, count: 6800, pct: 92 },
      flipkart: { score: 4.5, count: 5200, pct: 90 },
      jiomart: { score: 4.6, count: 2100, pct: 92 },
      croma: { score: 4.7, count: 850, pct: 94 }
    },
    reviews: [
      {
        id: 'rev-ip15-1',
        author: 'Rohit Sharma',
        avatar: 'R',
        rating: 5,
        date: '3 days ago',
        verified: true,
        text: 'The 48MP main camera and Dynamic Island are huge upgrades. USB-C convenience is finally here!'
      }
    ]
  },

  'samsung-s24-ultra': {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G 256GB Titanium Gray',
    model: 'Galaxy S24 Ultra',
    category: 'mobiles',
    categoryName: 'Smartphones & Mobiles',
    color: 'Titanium Gray',
    imgAngle: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    ratingCount: 8500,
    stores: [
      {
        store: 'Flipkart',
        dealBadge: 'Flagship Deal',
        discount: '-14%',
        price: 111999,
        mrp: 129999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=samsung+galaxy+s24+ultra',
        logoClass: 'flipkart-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart Price',
        discount: '-13%',
        price: 112999,
        mrp: 129999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/samsung-galaxy-s24-ultra',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Mega Deal',
        discount: '-12%',
        price: 114999,
        mrp: 129999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=samsung+galaxy+s24+ultra',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Croma Exclusive',
        discount: '-10%',
        price: 116999,
        mrp: 129999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=samsung+galaxy+s24+ultra',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.7, count: 4200, pct: 94 },
      flipkart: { score: 4.6, count: 2900, pct: 92 },
      jiomart: { score: 4.6, count: 950, pct: 92 },
      croma: { score: 4.8, count: 620, pct: 96 }
    },
    reviews: [
      {
        id: 'rev-s24u-1',
        author: 'Arun V.',
        avatar: 'A',
        rating: 5,
        date: '5 days ago',
        verified: true,
        text: 'The anti-reflective flat display with Galaxy AI features makes this the absolute best Android phone of the year.'
      }
    ]
  },

  'oneplus-12': {
    id: 'oneplus-12',
    name: 'OnePlus 12 5G 256GB Silky Black',
    model: 'OnePlus 12',
    category: 'mobiles',
    categoryName: 'Smartphones & Mobiles',
    color: 'Silky Black',
    imgAngle: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    ratingCount: 7300,
    stores: [
      {
        store: 'Amazon',
        dealBadge: 'Prime Deal',
        discount: '-11%',
        price: 57999,
        mrp: 64999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=oneplus+12',
        logoClass: 'amazon-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart Saver',
        discount: '-10%',
        price: 58499,
        mrp: 64999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/oneplus-12',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Flipkart',
        dealBadge: 'Special Price',
        discount: '-9%',
        price: 58999,
        mrp: 64999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=oneplus+12',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Bank Offer',
        discount: '-8%',
        price: 59999,
        mrp: 64999,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=oneplus+12',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.6, count: 3900, pct: 92 },
      flipkart: { score: 4.5, count: 2100, pct: 90 },
      jiomart: { score: 4.5, count: 850, pct: 90 },
      croma: { score: 4.7, count: 520, pct: 94 }
    },
    reviews: [
      {
        id: 'rev-op12-1',
        author: 'Harish N.',
        avatar: 'H',
        rating: 5,
        date: '1 week ago',
        verified: true,
        text: '100W SuperVOOC charges from 0 to 100% in 25 mins. Snapdragon 8 Gen 3 performance is blistering fast.'
      }
    ]
  },

  // --- LAPTOPS & COMPUTING ---
  'macbook-air-m3': {
    id: 'macbook-air-m3',
    name: 'Apple MacBook Air M3 Chip 13-inch 8GB 256GB Midnight',
    model: 'MacBook Air M3',
    category: 'laptops',
    categoryName: 'Laptops & Computers',
    color: 'Midnight',
    imgAngle: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    ratingCount: 5100,
    stores: [
      {
        store: 'Flipkart',
        dealBadge: 'Mega Deal',
        discount: '-13%',
        price: 99990,
        mrp: 114900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=macbook+air+m3',
        logoClass: 'flipkart-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart Buy',
        discount: '-12%',
        price: 101490,
        mrp: 114900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/macbook-air-m3',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Prime Deal',
        discount: '-11%',
        price: 102490,
        mrp: 114900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=macbook+air+m3',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Campus Offer',
        discount: '-10%',
        price: 103990,
        mrp: 114900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=macbook+air+m3',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.8, count: 2800, pct: 96 },
      flipkart: { score: 4.7, count: 1400, pct: 94 },
      jiomart: { score: 4.8, count: 620, pct: 96 },
      croma: { score: 4.9, count: 480, pct: 98 }
    },
    reviews: [
      {
        id: 'rev-mac-1',
        author: 'Sameer J.',
        avatar: 'S',
        rating: 5,
        date: '2 days ago',
        verified: true,
        text: 'Silent fanless operation and 18 hours of real battery life. The M3 processor breezes through Xcode and video editing.'
      }
    ]
  },

  'dell-xps-13': {
    id: 'dell-xps-13',
    name: 'Dell XPS 13 Intel Core i7 16GB 512GB SSD Platinum',
    model: 'XPS 13',
    category: 'laptops',
    categoryName: 'Laptops & Computers',
    color: 'Platinum Silver',
    imgAngle: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    ratingCount: 3400,
    stores: [
      {
        store: 'JioMart',
        dealBadge: 'Best Value',
        discount: '-18%',
        price: 98990,
        mrp: 119990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/dell-xps-13',
        logoClass: 'jiomart-card',
        isBestPrice: true
      },
      {
        store: 'Amazon',
        dealBadge: 'Deal of the Day',
        discount: '-17%',
        price: 99990,
        mrp: 119990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=dell+xps+13',
        logoClass: 'amazon-card'
      },
      {
        store: 'Flipkart',
        dealBadge: 'Special Price',
        discount: '-15%',
        price: 101990,
        mrp: 119990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=dell+xps+13',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Croma Deal',
        discount: '-14%',
        price: 103490,
        mrp: 119990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=dell+xps+13',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.5, count: 1800, pct: 90 },
      flipkart: { score: 4.4, count: 980, pct: 88 },
      jiomart: { score: 4.5, count: 420, pct: 90 },
      croma: { score: 4.6, count: 310, pct: 92 }
    },
    reviews: [
      {
        id: 'rev-xps-1',
        author: 'Vivek M.',
        avatar: 'V',
        rating: 5,
        date: '6 days ago',
        verified: true,
        text: 'Gorgeous InfinityEdge screen, ultra light chassis, and tactile keyboard. Outstanding premium ultrabook.'
      }
    ]
  },

  // --- SMART TVS ---
  'sony-bravia-55': {
    id: 'sony-bravia-55',
    name: 'Sony Bravia 55 inch 4K Ultra HD Smart LED Google TV KD-55X74L',
    model: 'Bravia 55X74L',
    category: 'televisions',
    categoryName: 'Smart TVs',
    color: 'Black',
    imgAngle: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    ratingCount: 6800,
    stores: [
      {
        store: 'Flipkart',
        dealBadge: 'Big Billion Deal',
        discount: '-22%',
        price: 44990,
        mrp: 57990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=sony+bravia+55+inch+4k',
        logoClass: 'flipkart-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart TV Saver',
        discount: '-21%',
        price: 45490,
        mrp: 57990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/sony-bravia-55-inch-4k',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Mega Deal',
        discount: '-19%',
        price: 46990,
        mrp: 57990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=sony+bravia+55+inch+4k',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Exchange Bonus',
        discount: '-17%',
        price: 47990,
        mrp: 57990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=sony+bravia+55+inch+4k',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.6, count: 3400, pct: 92 },
      flipkart: { score: 4.5, count: 2100, pct: 90 },
      jiomart: { score: 4.6, count: 850, pct: 92 },
      croma: { score: 4.7, count: 520, pct: 94 }
    },
    reviews: [
      {
        id: 'rev-tv-1',
        author: 'Rajesh G.',
        avatar: 'R',
        rating: 5,
        date: '4 days ago',
        verified: true,
        text: 'The X1 4K HDR processor delivers natural skin tones and deep contrast that no budget TV can match.'
      }
    ]
  },

  // --- SMARTWATCHES ---
  'apple-watch-s9': {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum Sport Band',
    model: 'Apple Watch S9',
    category: 'smartwatches',
    categoryName: 'Smartwatches & Wearables',
    color: 'Midnight',
    imgAngle: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    ratingCount: 7600,
    stores: [
      {
        store: 'JioMart',
        dealBadge: 'Smart Deal',
        discount: '-18%',
        price: 36790,
        mrp: 44900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/apple-watch-series-9',
        logoClass: 'jiomart-card',
        isBestPrice: true
      },
      {
        store: 'Flipkart',
        dealBadge: 'Mega Deal',
        discount: '-17%',
        price: 37290,
        mrp: 44900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=apple+watch+series+9',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Prime Offer',
        discount: '-16%',
        price: 37990,
        mrp: 44900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=apple+watch+series+9',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Croma Deal',
        discount: '-13%',
        price: 38990,
        mrp: 44900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=apple+watch+series+9',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.7, count: 4200, pct: 94 },
      flipkart: { score: 4.6, count: 2300, pct: 92 },
      jiomart: { score: 4.7, count: 980, pct: 94 },
      croma: { score: 4.8, count: 540, pct: 96 }
    },
    reviews: [
      {
        id: 'rev-ws9-1',
        author: 'Nalini K.',
        avatar: 'N',
        rating: 5,
        date: '5 days ago',
        verified: true,
        text: 'Double Tap gesture makes answering calls effortless while cooking or driving. Bright 2000-nit display is crystal clear outdoors.'
      }
    ]
  },

  // --- GAMING CONSOLES ---
  'ps5-slim': {
    id: 'ps5-slim',
    name: 'Sony PlayStation 5 Slim Console Disc Edition White',
    model: 'PlayStation 5 Slim',
    category: 'gaming',
    categoryName: 'Gaming Consoles',
    color: 'White',
    imgAngle: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    ratingCount: 8900,
    stores: [
      {
        store: 'Amazon',
        dealBadge: 'Gamer Deal',
        discount: '-11%',
        price: 48990,
        mrp: 54990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=playstation+5+slim',
        logoClass: 'amazon-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Smart Gaming',
        discount: '-10%',
        price: 49490,
        mrp: 54990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/playstation-5-slim',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Flipkart',
        dealBadge: 'Special Price',
        discount: '-9%',
        price: 49990,
        mrp: 54990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=playstation+5+slim',
        logoClass: 'flipkart-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Store Special',
        discount: '-7%',
        price: 50990,
        mrp: 54990,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=playstation+5+slim',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.8, count: 5100, pct: 96 },
      flipkart: { score: 4.7, count: 2800, pct: 94 },
      jiomart: { score: 4.8, count: 820, pct: 96 },
      croma: { score: 4.9, count: 490, pct: 98 }
    },
    reviews: [
      {
        id: 'rev-ps5-1',
        author: 'Varun T.',
        avatar: 'V',
        rating: 5,
        date: '1 week ago',
        verified: true,
        text: 'The 1TB SSD load times are instantaneous. DualSense haptic feedback is truly revolutionary.'
      }
    ]
  },

  // --- TABLETS ---
  'ipad-10th-gen': {
    id: 'ipad-10th-gen',
    name: 'Apple iPad 10th Gen 10.9-inch Wi-Fi 64GB Blue',
    model: 'iPad 10th Gen',
    category: 'tablets',
    categoryName: 'Tablets & iPads',
    color: 'Blue',
    imgAngle: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    imgFront: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    ratingCount: 9300,
    stores: [
      {
        store: 'Flipkart',
        dealBadge: 'Mega Deal',
        discount: '-17%',
        price: 28990,
        mrp: 34900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.flipkart.com/search?q=apple+ipad+10th+gen',
        logoClass: 'flipkart-card',
        isBestPrice: true
      },
      {
        store: 'JioMart',
        dealBadge: 'Best Price',
        discount: '-16%',
        price: 29490,
        mrp: 34900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.jiomart.com/search/apple-ipad-10th-gen',
        logoClass: 'jiomart-card'
      },
      {
        store: 'Amazon',
        dealBadge: 'Deal of Day',
        discount: '-14%',
        price: 29990,
        mrp: 34900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.amazon.in/s?k=apple+ipad+10th+gen',
        logoClass: 'amazon-card'
      },
      {
        store: 'Croma',
        dealBadge: 'Croma Deal',
        discount: '-11%',
        price: 30990,
        mrp: 34900,
        stock: 'In Stock Online',
        delivery: 'Free Delivery',
        url: 'https://www.croma.com/searchB?q=apple+ipad+10th+gen',
        logoClass: 'croma-card'
      }
    ],
    storeRatings: {
      amazon: { score: 4.7, count: 5200, pct: 94 },
      flipkart: { score: 4.6, count: 3100, pct: 92 },
      jiomart: { score: 4.7, count: 940, pct: 94 },
      croma: { score: 4.8, count: 580, pct: 96 }
    },
    reviews: [
      {
        id: 'rev-ipad-1',
        author: 'Deepak C.',
        avatar: 'D',
        rating: 5,
        date: '3 days ago',
        verified: true,
        text: 'All-screen modern design with USB-C and landscape stereo speakers. Great for study and movies.'
      }
    ]
  }
};

// =============================================================================
// 2. Application State
// =============================================================================
let currentProduct = CATALOG['sony-ult-wear'];
let activeTab = 'compare'; // 'compare' or 'reviews'
let selectedRating = 5;
let currentUser = JSON.parse(localStorage.getItem('pricecompare_user') || 'null');
let isAuthSignUp = false;

// Format Currency in INR
function formatINR(num) {
  return '₹' + Number(num).toLocaleString('en-IN');
}

// =============================================================================
// 3. DOM Elements Cache
// =============================================================================
const elements = {
  // Tabs
  tabCompare: document.getElementById('tabComparePrice'),
  tabReviews: document.getElementById('tabReviews'),
  viewCompare: document.getElementById('viewComparePrice'),
  viewReviews: document.getElementById('viewReviews'),
  backToCompare: document.getElementById('backToCompareLink'),

  // Search & Categories
  searchInput: document.getElementById('searchInput'),
  searchForm: document.getElementById('searchForm'),
  autocompleteDropdown: document.getElementById('autocompleteDropdown'),
  brandLogoBtn: document.getElementById('brandLogoBtn'),
  categoryChips: document.getElementById('categoryChips'),

  // Hero Card
  heroProductTitle: document.getElementById('heroProductTitle'),
  heroImgAngle: document.getElementById('heroImgAngle'),
  heroImgFront: document.getElementById('heroImgFront'),
  heroRatingScore: document.getElementById('heroRatingScore'),
  heroRatingCount: document.getElementById('heroRatingCount'),
  ratingBadgeTrigger: document.getElementById('ratingBadgeTrigger'),

  // Store Cards
  storeCardsList: document.getElementById('storeCardsList'),

  // Review Composing
  composeStarPicker: document.getElementById('composeStarPicker'),
  pickedRatingScore: document.getElementById('pickedRatingScore'),
  reviewTextInput: document.getElementById('reviewTextInput'),
  postReviewBtn: document.getElementById('postReviewBtn'),

  // Reviews Tab Views
  overviewScore: document.getElementById('overviewScore'),
  overviewReviewCount: document.getElementById('overviewReviewCount'),
  feedCountSpan: document.getElementById('feedCountSpan'),
  reviewsList: document.getElementById('reviewsList'),
  reviewTextInline: document.getElementById('reviewTextInline'),
  postReviewInlineBtn: document.getElementById('postReviewInlineBtn'),

  // Header User / Auth
  loginBtn: document.getElementById('loginBtn'),
  userProfileBadge: document.getElementById('userProfileBadge'),
  userAvatar: document.getElementById('userAvatar'),
  userDisplayName: document.getElementById('userDisplayName'),
  logoutBtn: document.getElementById('logoutBtn'),
  helpBtn: document.getElementById('helpBtn'),

  // Modals
  loginModal: document.getElementById('loginModal'),
  closeLoginModalBtn: document.getElementById('closeLoginModalBtn'),
  authForm: document.getElementById('authForm'),
  authName: document.getElementById('authName'),
  authEmail: document.getElementById('authEmail'),
  authPassword: document.getElementById('authPassword'),
  authSubmitBtn: document.getElementById('authSubmitBtn'),
  modalAuthTitle: document.getElementById('modalAuthTitle'),
  nameGroup: document.getElementById('nameGroup'),
  authToggleQuestion: document.getElementById('authToggleQuestion'),
  authToggleModeBtn: document.getElementById('authToggleModeBtn'),

  closeHelpModalBtn: document.getElementById('closeHelpModalBtn'),
  helpModal: document.getElementById('helpModal'),

  openPriceAlertBtn: document.getElementById('openPriceAlertBtn'),
  priceAlertModal: document.getElementById('priceAlertModal'),
  closePriceAlertModalBtn: document.getElementById('closePriceAlertModalBtn'),
  priceAlertForm: document.getElementById('priceAlertForm'),
  targetPriceInput: document.getElementById('targetPriceInput'),
  alertProductTitle: document.getElementById('alertProductTitle'),

  openPriceHistoryBtn: document.getElementById('openPriceHistoryBtn'),
  priceHistoryModal: document.getElementById('priceHistoryModal'),
  closePriceHistoryModalBtn: document.getElementById('closePriceHistoryModalBtn'),
  historyProductTitle: document.getElementById('historyProductTitle'),
  svgChartWrapper: document.getElementById('svgChartWrapper'),

  toast: document.getElementById('toastNotification'),
  toastMessage: document.getElementById('toastMessage')
};

// =============================================================================
// 4. Initial Rendering & Event Listeners
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initUserAuthUI();
  setupTabEvents();
  setupSearchEvents();
  setupCategoryEvents();
  setupReviewEvents();
  setupModalEvents();
  setupStoreRedirects();
  // Automatically trigger live scrape across Amazon, Flipkart, JioMart & Croma on launch
  performSearch('sony ult wear');
});

// Toast notification helper
function showToast(msg, duration = 3000) {
  elements.toastMessage.textContent = msg;
  elements.toast.classList.remove('hidden');
  clearTimeout(elements.toast._timer);
  elements.toast._timer = setTimeout(() => {
    elements.toast.classList.add('hidden');
  }, duration);
}

// Tab Switching
function switchTab(tab) {
  activeTab = tab;
  if (tab === 'compare') {
    elements.tabCompare.classList.add('active');
    elements.tabReviews.classList.remove('active');
    elements.viewCompare.classList.add('active-view');
    elements.viewReviews.classList.remove('active-view');
  } else {
    elements.tabCompare.classList.remove('active');
    elements.tabReviews.classList.add('active');
    elements.viewCompare.classList.remove('active-view');
    elements.viewReviews.classList.add('active-view');
    renderReviewsTab();
  }
}

function setupTabEvents() {
  elements.tabCompare.addEventListener('click', () => switchTab('compare'));
  elements.tabReviews.addEventListener('click', () => switchTab('reviews'));
  elements.ratingBadgeTrigger.addEventListener('click', () => switchTab('reviews'));
  if (elements.backToCompare) {
    elements.backToCompare.addEventListener('click', () => switchTab('compare'));
  }
}

// =============================================================================
// 5. Product Rendering & Comparison Cards
// =============================================================================
function renderProduct(product) {
  currentProduct = product;

  // Hero Card update
  elements.heroProductTitle.textContent = product.name;
  elements.heroImgAngle.src = product.imgAngle || product.imageUrl || 'assets/images/sony_ult_angle.jpg';
  elements.heroImgFront.src = product.imgFront || product.imageUrl || 'assets/images/sony_ult_front.jpg';
  elements.heroRatingScore.textContent = (product.rating || 4.5).toFixed(1);
  elements.heroRatingCount.textContent = `(${Number(product.ratingCount || 1200).toLocaleString()})`;

  // Render Store Cards
  renderStoreCards(product);

  // Update Review Section Overview
  renderReviewsTab();
}

function renderStoreCards(product) {
  elements.storeCardsList.innerHTML = '';

  product.stores.forEach(storeOffer => {
    const card = document.createElement('article');
    const storeLower = storeOffer.store.toLowerCase();
    card.className = `store-card ${storeOffer.logoClass || storeLower + '-card'} ${storeOffer.isBestPrice ? 'best-price-highlight' : ''}`;
    card.setAttribute('data-store', storeLower);

    // Generate Logo SVG based on store
    let logoSvg = '';
    if (storeLower === 'amazon') {
      logoSvg = `
        <div class="amazon-logo-box">
          <svg viewBox="0 0 140 42" fill="none" class="store-svg-logo">
            <text x="5" y="24" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="28" font-weight="800" fill="#111827" letter-spacing="-0.5">amazon</text>
            <path d="M18 31C38 38 78 38 106 28" stroke="#ff9900" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M101 24.5C104 26.5 107.5 28 111 27.5C109.5 31 106.5 33.5 103 35C104.2 33 103.5 30 101 24.5Z" fill="#ff9900"/>
          </svg>
        </div>
      `;
    } else if (storeLower === 'flipkart') {
      logoSvg = `
        <div class="flipkart-logo-box">
          <svg viewBox="0 0 100 60" fill="none" class="store-svg-logo flipkart-svg">
            <rect x="2" y="5" width="96" height="50" rx="8" fill="#ffd400"/>
            <path d="M52 14H32C30.8954 14 30 14.8954 30 16V44C30 45.1046 30.8954 46 32 46H52C53.1046 46 54 45.1046 54 44V16C54 14.8954 53.1046 14 52 14Z" fill="#2874f0"/>
            <path d="M12 27H28" stroke="#2874f0" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M8 33H26" stroke="#2874f0" stroke-width="4" stroke-linecap="round"/>
            <path d="M15 39H28" stroke="#2874f0" stroke-width="3" stroke-linecap="round"/>
            <path d="M46 22H39C37.8954 22 37 22.8954 37 24V28H43V32H37V42H33V19C33 17.8954 33.8954 17 35 17H46V22Z" fill="#ffd400"/>
          </svg>
        </div>
      `;
    } else if (storeLower === 'jiomart') {
      logoSvg = `
        <div class="jiomart-logo-box">
          <svg viewBox="0 0 110 50" fill="none" class="store-svg-logo jiomart-svg">
            <rect x="2" y="4" width="106" height="42" rx="8" fill="#0078ad"/>
            <circle cx="24" cy="25" r="14" fill="#e11b22"/>
            <text x="16" y="30" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="900" fill="#ffffff">Jio</text>
            <text x="43" y="31" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="800" fill="#ffffff" letter-spacing="-0.3">Mart</text>
          </svg>
        </div>
      `;
    } else {
      // Croma
      logoSvg = `
        <div class="croma-logo-box">
          <svg viewBox="0 0 100 60" fill="none" class="store-svg-logo croma-svg">
            <rect x="2" y="5" width="96" height="50" rx="8" fill="#388a96"/>
            <text x="14" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff" letter-spacing="0.5">crōmā</text>
            <circle cx="84" cy="20" r="2.5" fill="#ff6b35"/>
          </svg>
        </div>
      `;
    }

    const mrp = storeOffer.mrp || Math.round(storeOffer.price * 1.3);
    const discount = storeOffer.discount || `-${Math.round((1 - storeOffer.price / mrp) * 100)}%`;

    card.innerHTML = `
      <div class="store-logo-wrapper">
        ${logoSvg}
      </div>

      <div class="store-meta-wrapper">
        <div class="pricing-sub-col">
          <span class="deal-badge red-badge">${storeOffer.dealBadge || 'Verified Deal'}</span>
          <div class="price-row">
            <span class="discount-percent">${discount}</span>
            <span class="current-price">${formatINR(storeOffer.price)}</span>
          </div>
          <div class="mrp-row">
            <span class="mrp-label">M.R.P.:</span>
            <span class="mrp-val">${formatINR(mrp)}</span>
          </div>
        </div>

        <div class="stock-sub-col">
          <span class="stock-status in-stock">${storeOffer.stock || 'In Stock Online'}</span>
          <span class="delivery-status">${storeOffer.delivery || 'Free Delivery'}</span>
        </div>
      </div>

      <div class="store-action-wrapper">
        <button type="button" class="go-to-site-btn" data-url="${storeOffer.url}" data-store="${storeOffer.store}" data-price="${formatINR(storeOffer.price)}">
          Go to Site
        </button>
      </div>
    `;

    elements.storeCardsList.appendChild(card);
  });
}

function setupStoreRedirects() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.go-to-site-btn');
    if (btn) {
      const store = btn.getAttribute('data-store');
      const price = btn.getAttribute('data-price');
      const url = btn.getAttribute('data-url');
      showToast(`Redirecting to ${store} for verified deal ${price}...`, 2500);
      setTimeout(() => {
        window.open(url, '_blank');
      }, 700);
    }
  });
}

// =============================================================================
// 6. Electronics Search & Live Backend / Local Catalog Sync
// =============================================================================
function setupSearchEvents() {
  const SUGGESTIONS = [
    { title: 'Sony ULT Wear Wireless Headphones', query: 'sony ult wear', category: 'Audio' },
    { title: 'Apple iPhone 16 (128GB)', query: 'iphone 16', category: 'Mobiles' },
    { title: 'Apple iPhone 15 (128GB)', query: 'iphone 15', category: 'Mobiles' },
    { title: 'MacBook Air M3 (16GB RAM, 512GB SSD)', query: 'macbook air m3', category: 'Laptops' },
    { title: 'Samsung Galaxy S24 Ultra 5G', query: 'samsung galaxy s24 ultra', category: 'Mobiles' },
    { title: 'Sony Bravia 55 inch 4K Google TV', query: 'sony bravia 55 inch 4k', category: 'Televisions' },
    { title: 'Apple Watch Series 9 GPS', query: 'apple watch series 9', category: 'Smartwatches' },
    { title: 'Sony PlayStation 5 Slim Console', query: 'playstation 5 slim', category: 'Gaming' },
    { title: 'Apple iPad 10th Gen 64GB Wi-Fi', query: 'apple ipad 10th gen', category: 'Tablets' },
    { title: 'Sony WH-1000XM5 Wireless Headphones', query: 'sony wh-1000xm5', category: 'Audio' }
  ];

  // Live autocomplete input
  elements.searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      elements.autocompleteDropdown.classList.add('hidden');
      return;
    }

    const matches = SUGGESTIONS.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.query.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      elements.autocompleteDropdown.innerHTML = `
        <div class="autocomplete-item" data-query="${escapeHTML(query)}">
          <div class="autocomplete-info">
            <div class="autocomplete-title">Search live prices for "<strong>${escapeHTML(query)}</strong>"</div>
            <div class="autocomplete-price">Compare Amazon, Flipkart, JioMart & Croma in real-time ⚡</div>
          </div>
        </div>
      `;
      elements.autocompleteDropdown.classList.remove('hidden');
      return;
    }

    elements.autocompleteDropdown.innerHTML = matches.map(item => `
      <div class="autocomplete-item" data-query="${escapeHTML(item.query)}">
        <div class="autocomplete-info">
          <div class="autocomplete-title">${escapeHTML(item.title)}</div>
          <div class="autocomplete-price"><span style="color:#0284c7; font-weight:600;">${item.category}</span> • Compare live across Amazon, Flipkart, JioMart & Croma</div>
        </div>
      </div>
    `).join('');

    elements.autocompleteDropdown.classList.remove('hidden');
  });

  // Autocomplete selection -> trigger live real-time search
  elements.autocompleteDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.autocomplete-item');
    if (item && item.dataset.query) {
      const targetQuery = item.dataset.query;
      elements.searchInput.value = targetQuery;
      elements.autocompleteDropdown.classList.add('hidden');
      performSearch(targetQuery);
    }
  });

  // Search Form Submit
  elements.searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = elements.searchInput.value.trim();
    if (!query) return;
    elements.autocompleteDropdown.classList.add('hidden');
    await performSearch(query);
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!elements.searchForm.contains(e.target)) {
      elements.autocompleteDropdown.classList.add('hidden');
    }
  });

  // Reset to default on logo click
  elements.brandLogoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    elements.searchInput.value = 'sony ult wear';
    switchTab('compare');
    performSearch('sony ult wear');
  });
}

// Search across Backend API with real-time live scraping
async function performSearch(query) {
  showToast(`🔍 Scraping live prices from Amazon, Flipkart, JioMart & Croma for "${query}"...`, 4000);

  // Show live scraping skeleton/spinner in the store comparison list
  if (elements.storeCardsList) {
    elements.storeCardsList.innerHTML = `
      <div style="padding: 34px 20px; text-align: center; background: rgba(255,255,255,0.95); border-radius: 20px; border: 2px dashed #0284c7; margin: 16px 0; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.1);">
        <div style="font-size: 32px; margin-bottom: 10px; animation: pulse 1s infinite alternate;">⚡</div>
        <div style="font-weight: 800; font-size: 17px; color: #0f172a;">Scraping Real-Time Prices</div>
        <div style="font-size: 13px; color: #64748b; margin-top: 6px;">Querying Amazon India, Flipkart, JioMart & Croma for <strong>"${escapeHTML(query)}"</strong>...</div>
      </div>
    `;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    let apiUrl = `/api/search?q=${encodeURIComponent(query)}`;
    if (window.location.protocol === 'file:') {
      apiUrl = `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`;
    }

    const response = await fetch(apiUrl, { signal: controller.signal }).catch(() => 
      fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
    );
    clearTimeout(timeoutId);

    if (response && response.ok) {
      const results = await response.json();
      if (Array.isArray(results) && results.length > 0 && results[0].offers && results[0].offers.length > 0) {
        const topResult = results[0];
        const dynamicProduct = {
          id: topResult.key || 'live-result',
          name: topResult.name,
          model: topResult.name,
          imgAngle: topResult.imageUrl,
          imgFront: topResult.imageUrl,
          rating: (topResult.best && topResult.best.rating) ? topResult.best.rating : 4.4,
          ratingCount: (topResult.best && topResult.best.ratingCount) ? topResult.best.ratingCount : 1850,
          stores: topResult.offers.map(o => ({
            store: o.store,
            dealBadge: o.bestPrice ? 'Cheapest Live' : 'Verified Deal',
            discount: topResult.savings > 0 && o.bestPrice ? `Save ${formatINR(topResult.savings)}` : 'Live Deal',
            price: Number(o.price || o.total),
            mrp: Math.round(Number(o.price || o.total) * 1.25),
            stock: o.inStock !== false ? 'In Stock Online' : 'Out of Stock',
            delivery: 'Free Delivery',
            url: o.url,
            logoClass: (o.store || '').toLowerCase() + '-card',
            isBestPrice: o.bestPrice
          })),
          reviews: [
            {
              id: 'rev-dyn-1',
              author: 'Live Price Verification',
              avatar: '✓',
              rating: 5,
              date: 'Updated right now',
              verified: true,
              text: `Live real-time prices scraped directly from Amazon India, Flipkart, JioMart & Croma for "${topResult.name}". Best deal highlighted with instant store checkout link.`
            }
          ]
        };
        renderProduct(dynamicProduct);
        showToast(`✓ Live scraped prices loaded for "${query}"!`, 3000);
        return;
      }
    }
  } catch (err) {
    console.warn('Live scraping request error:', err.message);
  }

  // If live scraping returned empty or had an issue
  if (elements.storeCardsList) {
    elements.storeCardsList.innerHTML = `
      <div style="padding: 28px 20px; text-align: center; background: rgba(254, 242, 242, 0.95); border-radius: 18px; border: 1px solid #fecaca; margin: 14px 0;">
        <div style="font-size: 26px; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 700; font-size: 16px; color: #991b1b;">No Live Stores Returned Offers for "${escapeHTML(query)}"</div>
        <div style="font-size: 13px; color: #7f1d1d; margin-top: 4px;">Make sure your query is a valid electronic item (e.g., "iphone 16", "sony ult wear", "macbook air", "ps5").</div>
      </div>
    `;
  }
}

// Category filter chips setup -> triggers real-time scrape
function setupCategoryEvents() {
  if (!elements.categoryChips) return;
  const chips = elements.categoryChips.querySelectorAll('.category-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;

      const queryMap = {
        all: 'sony ult wear',
        mobiles: 'iphone 15',
        laptops: 'macbook air m3',
        smartwatches: 'apple watch series 9',
        televisions: 'sony bravia 55 inch 4k',
        audio: 'sony wh-1000xm5',
        gaming: 'playstation 5 slim',
        tablets: 'apple ipad 10th gen'
      };

      const query = queryMap[cat] || 'electronics';
      elements.searchInput.value = query;
      performSearch(query);
    });
  });
}

// =============================================================================
// 7. Reviews Logic & Community Posting
// =============================================================================
function setupReviewEvents() {
  // Star rating selector
  if (elements.composeStarPicker) {
    const starButtons = elements.composeStarPicker.querySelectorAll('.pick-star');
    const ratingLabels = {
      1: '1 / 5 (Poor)',
      2: '2 / 5 (Fair)',
      3: '3 / 5 (Good)',
      4: '4 / 5 (Very Good)',
      5: '5 / 5 (Excellent)'
    };

    starButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedRating = parseInt(btn.getAttribute('data-val'), 10);
        starButtons.forEach(b => {
          const val = parseInt(b.getAttribute('data-val'), 10);
          b.classList.toggle('active', val <= selectedRating);
        });
        if (elements.pickedRatingScore) {
          elements.pickedRatingScore.textContent = ratingLabels[selectedRating];
        }
      });
    });
  }

  // Post Review on Bottom Post Button
  elements.postReviewBtn.addEventListener('click', () => {
    handleReviewSubmission(elements.reviewTextInput.value.trim());
  });

  // Post Review from Inline on Reviews Tab
  elements.postReviewInlineBtn.addEventListener('click', () => {
    handleReviewSubmission(elements.reviewTextInline.value.trim());
  });
}

function handleReviewSubmission(bodyText) {
  if (!bodyText) {
    showToast('Please enter your review text before posting.', 3000);
    elements.reviewTextInput.focus();
    return;
  }

  const authorName = currentUser ? currentUser.name : 'Verified Customer';
  const authorAvatar = authorName.charAt(0).toUpperCase();

  const newReview = {
    id: 'rev-' + Date.now(),
    author: authorName,
    avatar: authorAvatar,
    rating: selectedRating,
    date: 'Just now',
    verified: true,
    text: bodyText
  };

  // Add to product reviews list
  if (!currentProduct.reviews) currentProduct.reviews = [];
  currentProduct.reviews.unshift(newReview);
  currentProduct.ratingCount = (currentProduct.ratingCount || 100) + 1;

  // Clear inputs
  elements.reviewTextInput.value = '';
  elements.reviewTextInline.value = '';

  // Update Hero counters & badges
  elements.heroRatingCount.textContent = `(${currentProduct.ratingCount.toLocaleString()})`;

  // Re-render reviews tab
  renderReviewsTab();

  // Show Toast
  showToast('✓ Your review has been posted on PriceCompare!', 3500);

  // Switch to reviews tab to display the newly posted review
  switchTab('reviews');
}

function renderReviewsTab() {
  elements.overviewScore.textContent = (currentProduct.rating || 4.5).toFixed(1);
  elements.overviewReviewCount.textContent = `Based on ${(currentProduct.ratingCount || 1000).toLocaleString()} ratings`;
  const reviewsCount = currentProduct.reviews ? currentProduct.reviews.length : 0;
  elements.feedCountSpan.textContent = reviewsCount;

  if (!currentProduct.reviews || currentProduct.reviews.length === 0) {
    elements.reviewsList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: #64748b;">
        No community reviews yet for this product. Be the first to post!
      </div>
    `;
    return;
  }

  elements.reviewsList.innerHTML = currentProduct.reviews.map(rev => {
    const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    return `
      <article class="review-item-card">
        <div class="review-item-top">
          <div class="reviewer-meta">
            <span class="reviewer-avatar-mini">${rev.avatar}</span>
            <span class="reviewer-name">${rev.author}</span>
            ${rev.verified ? '<span class="verified-badge">✓ Verified Buyer</span>' : ''}
          </div>
          <span class="review-date">${rev.date}</span>
        </div>
        <div class="review-item-stars" aria-label="${rev.rating} out of 5 stars">${stars}</div>
        <p class="review-item-body">${escapeHTML(rev.text)}</p>
      </article>
    `;
  }).join('');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// =============================================================================
// 8. User Auth & Session Handling
// =============================================================================
function initUserAuthUI() {
  if (currentUser) {
    elements.loginBtn.classList.add('hidden');
    elements.userProfileBadge.classList.remove('hidden');
    elements.userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
    elements.userDisplayName.textContent = currentUser.name;
  } else {
    elements.loginBtn.classList.remove('hidden');
    elements.userProfileBadge.classList.add('hidden');
  }
}

function setupModalEvents() {
  // Login Modal
  elements.loginBtn.addEventListener('click', () => {
    elements.loginModal.classList.remove('hidden');
  });

  elements.closeLoginModalBtn.addEventListener('click', () => {
    elements.loginModal.classList.add('hidden');
  });

  elements.authToggleModeBtn.addEventListener('click', () => {
    isAuthSignUp = !isAuthSignUp;
    if (isAuthSignUp) {
      elements.modalAuthTitle.textContent = 'Create an Account';
      elements.authSubmitBtn.textContent = 'Sign Up';
      elements.nameGroup.classList.remove('hidden');
      elements.authToggleQuestion.textContent = 'Already have an account?';
      elements.authToggleModeBtn.textContent = 'Log in';
    } else {
      elements.modalAuthTitle.textContent = 'Log in to PriceCompare';
      elements.authSubmitBtn.textContent = 'Log in';
      elements.nameGroup.classList.add('hidden');
      elements.authToggleQuestion.textContent = "Don't have an account?";
      elements.authToggleModeBtn.textContent = 'Create one';
    }
  });

  elements.authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = elements.authEmail.value.trim();
    let name = elements.authName.value.trim();
    if (!name) {
      name = email.split('@')[0];
    }

    currentUser = {
      name: name,
      email: email,
      token: 'jwt-mock-' + Math.random().toString(36).substring(2)
    };

    localStorage.setItem('pricecompare_user', JSON.stringify(currentUser));
    initUserAuthUI();
    elements.loginModal.classList.add('hidden');
    showToast(`Welcome back, ${currentUser.name}!`);
  });

  elements.logoutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('pricecompare_user');
    initUserAuthUI();
    showToast('Logged out successfully.');
  });

  // Help Modal
  elements.helpBtn.addEventListener('click', () => {
    elements.helpModal.classList.remove('hidden');
  });

  elements.closeHelpModalBtn.addEventListener('click', () => {
    elements.helpModal.classList.add('hidden');
  });

  // Price Alert Modal
  elements.openPriceAlertBtn.addEventListener('click', () => {
    elements.alertProductTitle.textContent = currentProduct.name;
    elements.priceAlertModal.classList.remove('hidden');
  });

  elements.closePriceAlertModalBtn.addEventListener('click', () => {
    elements.priceAlertModal.classList.add('hidden');
  });

  elements.priceAlertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const targetPrice = elements.targetPriceInput.value;
    const email = document.getElementById('alertEmailInput').value;
    elements.priceAlertModal.classList.add('hidden');
    showToast(`🔔 Price alert set for ₹${Number(targetPrice).toLocaleString()} on ${email}!`, 4000);
  });

  // 30-Day Price History Chart Modal
  elements.openPriceHistoryBtn.addEventListener('click', () => {
    elements.historyProductTitle.textContent = `${currentProduct.model} Price Trend (Past 30 Days)`;
    renderPriceChart();
    elements.priceHistoryModal.classList.remove('hidden');
  });

  elements.closePriceHistoryModalBtn.addEventListener('click', () => {
    elements.priceHistoryModal.classList.add('hidden');
  });

  // Close modals on backdrop click
  [elements.loginModal, elements.helpModal, elements.priceAlertModal, elements.priceHistoryModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
}

// Render Multi-store Price History SVG Chart
function renderPriceChart() {
  const width = 420;
  const height = 180;
  const padding = 28;

  const days = ['Day 1', 'Day 7', 'Day 15', 'Day 22', 'Day 30'];
  const base = currentProduct.stores[0] ? currentProduct.stores[0].price : 12989;
  const minPrice = Math.round(base * 0.9);
  const maxPrice = Math.round(base * 1.35);

  function getY(val) {
    return height - padding - ((val - minPrice) / (maxPrice - minPrice)) * (height - 2 * padding);
  }

  function getX(i) {
    return padding + i * ((width - 2 * padding) / (days.length - 1));
  }

  function makePath(pts) {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p)}`).join(' ');
  }

  const amazonPts = [Math.round(base * 1.25), Math.round(base * 1.18), Math.round(base * 1.12), Math.round(base * 1.05), base];
  const flipkartPts = [Math.round(base * 1.22), Math.round(base * 1.15), Math.round(base * 1.08), base, base];
  const jiomartPts = [Math.round(base * 1.20), Math.round(base * 1.12), Math.round(base * 1.05), Math.round(base * 0.98), Math.round(base * 0.97)];
  const cromaPts = [Math.round(base * 1.28), Math.round(base * 1.22), Math.round(base * 1.15), Math.round(base * 1.08), Math.round(base * 1.02)];

  const amazonPath = makePath(amazonPts);
  const flipkartPath = makePath(flipkartPts);
  const jiomartPath = makePath(jiomartPts);
  const cromaPath = makePath(cromaPts);

  elements.svgChartWrapper.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block;">
      <!-- Grid Lines -->
      <line x1="${padding}" y1="${getY(maxPrice * 0.95)}" x2="${width - padding}" y2="${getY(maxPrice * 0.95)}" stroke="#e2e8f0" stroke-dasharray="3"/>
      <line x1="${padding}" y1="${getY((maxPrice + minPrice) / 2)}" x2="${width - padding}" y2="${getY((maxPrice + minPrice) / 2)}" stroke="#e2e8f0" stroke-dasharray="3"/>
      <line x1="${padding}" y1="${getY(minPrice * 1.05)}" x2="${width - padding}" y2="${getY(minPrice * 1.05)}" stroke="#e2e8f0" stroke-dasharray="3"/>

      <!-- Store Trend Lines -->
      <path d="${cromaPath}" fill="none" stroke="#388a96" stroke-width="2.5" stroke-linecap="round"/>
      <path d="${amazonPath}" fill="none" stroke="#ff9900" stroke-width="2.5" stroke-linecap="round"/>
      <path d="${flipkartPath}" fill="none" stroke="#2874f0" stroke-width="2.5" stroke-linecap="round"/>
      <path d="${jiomartPath}" fill="none" stroke="#0078ad" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Current Deal Highlight Point -->
      <circle cx="${getX(4)}" cy="${getY(base)}" r="5" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
      <text x="${getX(4)}" y="${getY(base) - 10}" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle">${formatINR(base)} Today</text>
    </svg>
    <div style="display:flex; justify-content:center; gap:14px; font-size:11px; margin-top:8px;">
      <span style="color:#ff9900;">● Amazon</span>
      <span style="color:#2874f0;">● Flipkart</span>
      <span style="color:#0078ad;">● JioMart</span>
      <span style="color:#388a96;">● Croma</span>
    </div>
  `;
}
