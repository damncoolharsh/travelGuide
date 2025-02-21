import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export type Theme = 'dark' | 'light';

export interface DataType {
  id: number;
  title: string;
  video?: string;
  image?: string;
  audio?: string;
  index?: number;
  locationPoints: string;
  theme?: Theme;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export const MOCK_DATA: DataType[] = [
  {
    id: 1,
    title: 'Nature',
    video:
      'https://videos.pexels.com/video-files/4887658/4887658-uhd_1440_2732_25fps.mp4',
    address: {
      street: '456 Urban Ave',
      city: 'Stuttgart',
      state: 'BW',
      zip: '70173',
    },
    locationPoints: `48°46'56" N, 9°10'37" E`,
    theme: 'dark',
  },
  {
    id: 2,
    title: 'Mountain Landscape',
    video:
      'https://videos.pexels.com/video-files/30784838/13167684_2560_1440_30fps.mp4',
    address: {
      street: '789 Alpine Rd',
      city: 'Zermatt',
      state: 'VS',
      zip: '3920',
    },
    locationPoints: `45°58'10" N, 7°39'05" E`,
    theme: 'light',
  },
  {
    id: 3,
    title: 'Coastal Sunset',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    address: {
      street: '321 Ocean Dr',
      city: 'Malibu',
      state: 'CA',
      zip: '90265',
    },
    locationPoints: `34°01'31" N, 118°41'03" W`,
    theme: 'dark',
  },
  {
    id: 4,
    title: 'Historic City Map',
    video:
      'https://videos.pexels.com/video-files/2880734/2880734-hd_1920_1080_24fps.mp4',
    address: {
      street: '654 Heritage Ln',
      city: 'London',
      state: 'ENG',
      zip: 'WC2N 5DU',
    },
    locationPoints: `51°30'26" N, 0°07'39" W`,
    theme: 'dark',
  },
  {
    id: 5,
    title: 'Nature Trail',
    video:
      'https://videos.pexels.com/video-files/20623556/20623556-uhd_2560_1440_30fps.mp4',
    address: {
      street: '987 Forest Path',
      city: 'Black Forest',
      state: 'BW',
      zip: '78176',
    },
    locationPoints: `48°28'00" N, 8°15'00" E`,
    theme: 'light',
  },
];
