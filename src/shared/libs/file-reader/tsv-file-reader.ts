//import { IFileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import {readFileSync} from 'node:fs';
import {IFileReader} from './index.js';
import {Offer, OfferType} from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements IFileReader {
  private rawData = '';
  constructor(private readonly filename: string) {
    super();
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, previewImagePath, photos,isPremium, isFavorite, rating, type, roomsNumber, guestsNumber, price, facilities, name, mail, password, isPro, customAvatarPath, baseAvatarPath, commentsNumber, location]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city,
        previewImagePath,
        photos: photos.split(';'),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number.parseInt(rating, 10),
        type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        roomsNumber: Number.parseInt(roomsNumber, 10),
        guestsNumber: Number.parseInt(guestsNumber, 10),
        price: Number.parseInt(price, 10),
        facilities: facilities.split(';')
          .map((facilityName) => ({name: facilityName})),
        author: {
          name,
          mail,
          password,
          isPro: isPro === 'true',
          customAvatarPath,
          baseAvatarPath
        },
        commentsNumber: Number.parseInt(commentsNumber, 10),
        location: {
          latitude: Number.parseFloat(location.split('-')[0]),
          longitude: Number.parseFloat(location.split('-')[1])
        },
      }));
  }
}
