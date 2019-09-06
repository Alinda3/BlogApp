const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true , maxlength:50},
  description: { type: String, required: true },
  date: { type: Date, required: true },
  category : [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  
}, {
  timestamps: true,
});

const BlogItem = mongoose.model('BlogItem', blogSchema);

module.exports = BlogItem;