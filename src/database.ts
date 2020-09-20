import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost/module_security', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('database is connected'))
  .catch((err) => console.log('Error Database', err));
