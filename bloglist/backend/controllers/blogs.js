const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
  } catch(exception) {
    next(exception);
  };
});

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    if(!user){
      return response.status(401).json({ error: 'invalid user' });
    };

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id,
    });
  
    if(blog.title === undefined || blog.author === undefined){
      return response.status(400).send({ error: 'Bad Request' });
    }
  
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch(exception) {
    next(exception);
  };
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user;
    if(!user){
      return response.status(401).json({ error: 'invalid user' });
    }
    
    const blog = await Blog.findById(request.params.id);
    if(!blog){
      return response.status(204).send({ error: 'blog does not exist' });
    }
    if(blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    }
    else {
      return response.status(401).send({ error: 'user not the owner of this blog'});
    }
  } catch(exception) {
    next(exception);
  };
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: request.body.user.id,
    };
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, context: 'query' },
    );
    if(result === null){
      response.status(404).end();
    }
    response.status(201).end();
  } catch(exception) {
    next(exception);
  };
});

module.exports = blogsRouter;
