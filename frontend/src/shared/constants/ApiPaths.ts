const isProduction =
  process.env.NODE_ENV === 'production' ||
  process.env.VERCEL_ENV === 'production';

export const API_PATH = {
  BASE: isProduction
    ? 'https://yt-subtitles-parser.vercel.app/api'
    : `http://localhost:6050/api`,
  CARS: '/cars',
  MARKS: '/cars/marks',
};
