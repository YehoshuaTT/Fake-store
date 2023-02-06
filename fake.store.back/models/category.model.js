const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
  },
  img: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?b=1&s=170667a&w=0&k=20&c=LEhQ7Gji4-gllQqp80hLpQsLHlHLw61DoiVf7XJsSx0=",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

class CategoryClass {
  //Any special Database methods here
}

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
