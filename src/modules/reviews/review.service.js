import Users from '../users/users.model.js';
import Reviews from './review.model.js';

export class ReviewsSchema {
  async createReviews(data) {
    return await Reviews.create(data);
  }

  async findAllReviews() {
    return await Reviews.findAll();
  }

  async findOneReview(id) {
    return await Reviews.findOne({
      where: {
        id,
        status: true,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
  }

  async updateReview(review, data) {
    return await review.update(data);
  }

  async deleteReview(review) {
    return await review.update({ status: false });
  }
}
