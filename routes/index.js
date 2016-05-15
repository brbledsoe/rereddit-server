var express = require('express');
var router = express.Router();
var Post = require('../models/Posts');
var Comment = require('../models/Comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/posts', function(req, res, next){
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});


router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.post('/posts/:post/comments', function(req, res, next){
  var comment = new Comment(req.body);

  comment.save(function(err, post){
    if(err){return newxt(err); }

    res.json(post)
  })

});

router.get('/posts', function(req, res, next){

  Post.find({}, function(err, posts){
    res.json(posts);

  });
});


var query = Review.findById("57304036d2122ef547fd6cc0");

query.populate('comments');


module.exports = router;
