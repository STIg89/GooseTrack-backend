const express = require('express');
const reviewCtrl = require('../../controllers/reviews/review');
const { validateBody, auth } = require('../../middlewares');
const { reveiwSchema, updateRewSchema } = require('../../schemas');

const router = express.Router();

router.get('/', reviewCtrl.getAll);
router.get('/user', auth, reviewCtrl.getAllByUser); //http://localhost:4000/api/reviews/user -повертає всі відгуки по користувачу
router.get('/:id', auth, reviewCtrl.getRewById); //http://localhost:4000/api/reviews/647cdff38d86cb6632235e88

/*----------------------POST------------------------------
http://localhost:4000/api/reviews/
{
    "rating": 2,<--requied
    "comment":"test udate 3"
}
*/

router.post('/', auth, validateBody(reveiwSchema), reviewCtrl.addReview);
/*----------------------PUT------------------------------
http://localhost:4000/api/reviews/647cf7ad844c932c509c4514

{
    "rating": 4,
    "comment":"test udate 3"
}
*/
router.put(
  '/:id',
  auth,
  validateBody(updateRewSchema),
  reviewCtrl.updateReview
);
router.delete('/:id', auth, reviewCtrl.deleteReview);

module.exports = router;
