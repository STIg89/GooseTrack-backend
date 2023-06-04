const { Review } = require('../../models/review');
const { HttpError, ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  if (page <= 0) {
    page = 1;
  }
  const skip = (page - 1) * limit;
  const list = await Review.find({}, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name avatarURL');
  res.status(200).json({
    status: 'success',
    code: 200,
    data: list,
  });
};

const getAllByUser = async (req, res) => {
  const owner = req.user._id;
  let { page = 1, limit = 10 } = req.query;
  if (page <= 0) {
    page = 1;
  }
  console.log(owner);
  const skip = (page - 1) * limit;
  const list = await Review.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name avatarURL');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: list,
  });
};

const getRewById = async (req, res) => {
  const owner = req.user._id;
  const rewID = req.params.id;
  const rew = await Review.findOne(
    { _id: rewID, owner: owner },
    '-createdAt -updatedAt'
  ).populate('owner', 'name avatarURL');
  if (!rew) {
    throw HttpError(404, 'not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: rew,
  });
};

const addReview = async (req, res) => {
  const newReview = await Review.create({ ...req.body, owner: req.user._id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: newReview,
  });
};

const updateReview = async (req, res) => {
  const rewID = req.params.id;
  const owner = req.user._id;

  const updatedRew = await Review.findOneAndUpdate(
    { _id: rewID, owner: owner },
    req.body,
    { new: true }
  );
  console.log(updatedRew);
  if (updatedRew == null) {
    throw HttpError(404, 'not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: updatedRew,
  });
};

const deleteReview = async (req, res) => {
  const rewID = req.params.id;
  const owner = req.user._id;

  const rew = await Review.findOneAndDelete({ _id: rewID, owner: owner });
  if (rew === null) {
    throw HttpError(404, 'not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: rew,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addReview: ctrlWrapper(addReview),
  getAllByUser: ctrlWrapper(getAllByUser),
  getRewById: ctrlWrapper(getRewById),
  updateReview: ctrlWrapper(updateReview),
  deleteReview: ctrlWrapper(deleteReview),
};
