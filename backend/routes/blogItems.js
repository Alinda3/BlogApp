const router = require('express').Router();
let BlogItem = require('../models/blogItems.model');

router.route('/').get((req, res) => {
    BlogItem.find()
    .then(blogItems=> res.json(blogItems))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  console.log(title,description,date);
  const newBlogItem = new BlogItem({
    title,
    description,
    date
  });

  newBlogItem.save()
  .then(() => res.json('New Blog added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  BlogItem.findById(req.params.id)
    .then(blogItem => res.json(blogItem))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  BlogItem.findByIdAndDelete(req.params.id)
    .then(() => res.json('BLOG item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  BlogItem.findById(req.params.id)
    .then(blogItem => {
      blogItem.title = req.body.title;
      blogItem.description = req.body.description;
      blogItem.date = Date.parse(req.body.date);

      blogItem.save()
        .then(() => res.json('BLog updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;