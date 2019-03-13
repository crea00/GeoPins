const user = {
  _id: '1',
  name: 'Jerome',
  email: '654321su@gmail.com',
  picture: 'https://cloudinary.com/asdf'
};

module.exports = {
  Query: {
    me: () => user
  }
}