export const marketplaceCategories = [
  {
    id: 'plumbing',
    label: 'Plumbing',
    iconPath:
      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  }, // using a gear-like icon as placeholder
  {
    id: 'laundry',
    label: 'Laundry',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  }, // box/basket icon
  { id: 'electrical', label: 'Electrical', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' }, // lightning bolt
  {
    id: 'cleaning',
    label: 'Cleaning',
    iconPath:
      'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  }, // building/cleaning
  {
    id: 'gardening',
    label: 'Gardening',
    iconPath:
      'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  }, // star/sparkles representing outside
]

export const marketplaceProviders = [
  {
    id: 1,
    serviceTitle: 'Expert Home Cleaning',
    providerName: 'Amina Mwangi',
    providerAvatar: 'https://i.pravatar.cc/150?u=amina',
    trustedCount: 12,
    verified: true,
    rating: 4.9,
    reviewsCount: 124,
    experience: '5 years exp.',
    responseSpeed: 'Fast response',
    reviewSnippet: '"Reliable and arrived on time. Highly recommended by my neighbor."',
    stats: {
      completed: '842',
      responseRate: '98%',
      repeatRate: '65%',
    },
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    saved: false,
  },
  {
    id: 2,
    serviceTitle: 'Master Plumbing & Repair',
    providerName: 'John Okelo',
    providerAvatar: 'https://i.pravatar.cc/150?u=johnokelo',
    trustedCount: 8,
    verified: true,
    rating: 5.0,
    reviewsCount: 56,
    experience: '12 years exp.',
    responseSpeed: '1h arrival',
    reviewSnippet: '"The best in Kilimani. Fixed my leak in 20 minutes. Very professional."',
    stats: {
      completed: '1.2k',
      responseRate: '100%',
      repeatRate: '82%',
    },
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80',
    saved: true,
  },
  {
    id: 3,
    serviceTitle: 'Premium Laundry Services',
    providerName: 'Grace N.',
    providerAvatar: 'https://i.pravatar.cc/150?u=gracen',
    trustedCount: 24,
    verified: true,
    rating: 4.8,
    reviewsCount: 210,
    experience: '3 years exp.',
    responseSpeed: 'Same day pickup',
    reviewSnippet: '"They got a tough coffee stain out of my favorite shirt. Excellent service!"',
    stats: {
      completed: '2.5k',
      responseRate: '95%',
      repeatRate: '78%',
    },
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80',
    saved: false,
  },
]
