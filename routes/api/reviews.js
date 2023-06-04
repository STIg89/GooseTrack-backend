const express = require('express');
const reviewCtrl = require('../../controllers/reviews/review');
const { validateBody, authenticate } = require('../../middlewares');
const { reveiwSchema, updateRewSchema } = require('../../schemas');

const router = express.Router();

router.get('/', reviewCtrl.getAll);
router.get('/user', authenticate, reviewCtrl.getAllByUser); //http://localhost:4000/api/reviews/user -повертає всі відгуки по користувачу
router.get('/:id', authenticate, reviewCtrl.getRewById); //http://localhost:4000/api/reviews/647cdff38d86cb6632235e88

/*----------------------POST------------------------------
http://localhost:4000/api/reviews/
{
    "rating": 2,<--requied
    "comment":"test udate 3"
}
*/

router.post(
  '/',
  authenticate,
  validateBody(reveiwSchema),
  reviewCtrl.addReview
);
/*----------------------PUT------------------------------
http://localhost:4000/api/reviews/647cf7ad844c932c509c4514

{
    "rating": 4,
    "comment":"test udate 3"
}
*/
router.put(
  '/:id',
  authenticate,
  validateBody(updateRewSchema),
  reviewCtrl.updateReview
);
router.delete('/:id', authenticate, reviewCtrl.deleteReview);

module.exports = router;
