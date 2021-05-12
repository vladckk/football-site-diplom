import {Season} from './season';

export class Playerinfo {
  id: string;
  fullname: string;
  height: number;
  weight: number;
  position: string;
  birthdate: Date;
  birthdateString: string;
  image: any;
  currentSeason: Season;
  bio: string;
  achievements: string[];
  number: number;
  seasons: Season[];
}
