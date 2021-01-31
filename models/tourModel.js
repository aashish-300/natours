const slugify = require('slugify');

const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    required: [true, 'name filled is required'],
    unique: true,
    type: String,
    trim: true, //removes spaces from first and last 
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a max group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    required: [true, 'price filled is required'],
    type: Number,
  },
  rating: {
    default: 4.6,
    type: Number,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default:false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

//virtual data aren't in database, but they are calculated after retrieving data from database
tourSchema.virtual('durationWeekend').get(function() {
  return this.duration/7;
})

// DOCUMENT MIDDLEWARE: runs before .save() and .create() but not in .insetOne(/insertMany()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true });
  next();
})

tourSchema.pre('save', function(next) {
  console.log('Next middleware is being called!');
  next();
});

// DOCUMENT MIDDLEWARE: runs after .save() and .create() but not in .insetOne()/insertMany()
tourSchema.post('save', function(doc, next) {
  console.log(doc);
  next();
})

//QUERY MIDDLEWARE:
tourSchema.pre(/^find/ , function(next) {
  this.find({secretTour: { $ne: true } });
  this.start = Date.now();
  next();
})

tourSchema.post(/^find/ , function(docs, next) {
  console.log(`Time taken is ${Date.now() - this.start}  milliseconds`);
  next();
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
