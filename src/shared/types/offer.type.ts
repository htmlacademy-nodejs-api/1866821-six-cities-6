import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';
import {Location} from './location.type.js';
import {Facility} from './facility.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImagePath: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  facilities: Facility[];
  author: User;
  commentsNumber: number;
  location: Location
}
