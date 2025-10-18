require('dotenv').config();

const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Post = require('./models/postModel');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

async function seedPosts() {
  await Post.deleteMany({}); // clear previous posts

  for (let i = 0; i < 10; i++) {
    const post = new Post({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(2),
      image: faker.image.url({ width: 640 }),
      author: faker.person.fullName(),
      likes: faker.number.int({ min: 0, max: 100 }),
    });

    await post.save();
  }

  console.log('Posts seeded!');
  mongoose.disconnect();
}

seedPosts();
