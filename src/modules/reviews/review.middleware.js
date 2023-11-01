import { AppError, catchAsync } from '../../errors/index.js';
import { ReviewsSchema } from './review.service.js';

const reviewServices = new ReviewsSchema();

export const validatedExistReviews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewServices.findOneReview(id);

  if (!review) {
    return next(new AppError('review not found', 404));
  }

  req.user = review.user;
  req.review = review;
  next();
});
