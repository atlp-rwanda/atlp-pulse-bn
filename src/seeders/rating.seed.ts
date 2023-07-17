import { Rating } from '../models/ratings';

const seedRatings = async () => {
  await Rating.deleteMany({});

  return null;
};

export default seedRatings;
