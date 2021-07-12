const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
