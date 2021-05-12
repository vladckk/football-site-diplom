import {Season} from './season';

export class Player {
  // tslint:disable-next-line:variable-name
  _id: string;
  fullname: string;
  height: number;
  weight: number;
  position: string;
  seasons: Season[];
  birthdate: string;
  inClub: boolean;
  image: any;
  currentseason: Season;
  nationality: string;
  bio: string;
}
