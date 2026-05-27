/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CakeSize {
  name: string;      // e.g. "6\" Petite" or "8\" Classic"
  servings: string;  // e.g. "10-12 guests"
  dimensions: string;// e.g. "6\" diameter × 5\" height"
  priceAdded: number;// Price premium relative to basic price
}

export interface Cake {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  category: string; // e.g. "birthday", "wedding", "kids", "floral", "minimal", "luxury", "theme"
  imageUrl: string;
  galleryUrls?: string[];
  flavors: string[];
  sizes: CakeSize[];
  isBestseller: boolean;
  rating: number;
  ingredients: string[];
}

export interface Testimonial {
  id: string;
  authorName: string;
  roll: string;      // e.g. "Bride", "Mother of the Groom", "Corporate Host"
  location: string;  // e.g. "Summit, NJ", "Princeton, NJ", "Hoboken, NJ"
  text: string;
  rating: number;
  date: string;
}

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
  link?: string;
}

export interface CommissionInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  cakeType: string;
  portions: string;
  flavor: string;
  budget: string;
  referenceImageName?: string;
  referenceImageBase64?: string;
  message: string;
  dateCreated: string;
  status: 'pending' | 'reviewed' | 'accepted';
}
