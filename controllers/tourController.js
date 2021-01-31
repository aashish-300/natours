const Tour = require('../models/tourModel');
const APIFeature = require('../utils/apiFeatures');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.alias = (req,res,next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,duration,difficulty';
  next();  

}

exports.checkbody = (req, res, next) => {
  console.log(req.body);
  if (!(req.body.name && req.body.price))
    return res.send('body should contains name and price tag');
  next();
};

// exports.checkId = (req, res, next, val) => {
//   console.log(`tours id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'INVALID ID' });
//   }
//   next();
// };
// class APIFeature {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }

//   filter() {
//     const queryObj = {...this.queryString} ;
//     console.log(queryObj);

//     // 1) EXCLUDING FROM QUERY
//     const excludeFields = ['limit', 'sort', 'page', 'fields'];
//     excludeFields.forEach((el) => {
//       delete queryObj[el];
//     });

//     // ADVANCE FILTERING
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, e => `$${e}`);
//     queryStr = JSON.parse(queryStr);
//     // let query = Tour.find(queryStr);
    
//     return this;
//   }

//   sort() {
//     if(this.queryString.sort){
//       const sortBy = this.queryString.sort.split(',').join(' ');
//       this.query = this.query.sort(sortBy);
//     }

//     return this;
//   }

//   limit() {
//     if(this.queryString.fields){
//       const fields = this.queryString.fields.split(',').join(' ');
//       this.query = this.query.select(fields);
//     }
//     else {
//       this.query = this.query.select('-__v');
//     }

//     return this;
//   }

//   paginate() {
//     const page = this.queryString.page*1 || 1;
//     const limit = this.queryString.limit*1 || 100;
//     const skip = (page-1) * limit;
    
//     this.query = this.query.skip(skip).limit(limit);
//     // if(this.queryString.page){
//     //   const count = await Tour.countDocuments();
//     //   if(skip>=count){
//     //     throw new Error;
//     //   }
//     // }

//     return this;
//   }
// }
exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY  
    // const queryObj = {...req.query} ;
    // console.log(queryObj);

    // // 1) EXCLUDING FROM QUERY
    // const excludeFields = ['limit', 'sort', 'page', 'fields'];
    // excludeFields.forEach((el) => {
    //   delete queryObj[el];
    // });

    // // ADVANCE FILTERING
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, e => `$${e}`);
    // queryStr = JSON.parse(queryStr);
    // let query = Tour.find(queryStr);
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SORTING 
    // if(req.query.sort){
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // }

    // LIMITING FIELDS
    // if(req.query.fields){
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // }
    // else {
    //   query = query.select('-__v');
    // }

    // PAGINATION
    // page=2,limit=10, skip=10
    // const page = req.query.page*1 || 1;
    // const limit = req.query.limit*1 || 100;
    // const skip = (page-1) * limit;
    
    // query = query.skip(skip).limit(limit);
    // if(req.query.page){
    //   const count = await Tour.countDocuments();
    //   if(skip>=count){
    //     throw new Error;
    //   }
    // }

    // EXECUTION
    const features =  new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
                        
    const tours = await features.query;

  res.status(200).json({
      requested: req.requestTime,
      message: 'success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail' ,message: err});
  }
};

exports.getTour = async (req, res) => {
  // const { id } = req.params;
  // eslint-disable-next-line radix
  // const tour = tours.find((e) => e.id === parseInt(id));

  // if (!tour) {
  //   return res.status(404).json({ status: 'fail', message: 'INVALID ID' });
  // }
  try {
    console.log(req.params.id);
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.createNewTour = async (req, res) => {
  // const ID = tours[tours.length - 1].id + 1;
  // console.log(ID);
  // const data = {
  //   id: ID,
  //   message: 'success',
  //   data: req.body,
  // };
  // tours.push(data);

  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => console.log(err)
  // );
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(tour);
    res.status(200).json({
      message: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = (req, res) => {
  try {
    console.log(req.params.id);
    Tour.findByIdAndDelete(req.params.id, () => {
      console.log('tour has been deleted!');
    });
    res.status(204).json({
      message: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail' });
  }
};

exports.getTourStat = async (req, res) => {
  try {
      const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4 } } },

      {
        $group: { //divides groups on the basis of result of difficulty like easy medium and difficult
        _id: {$toUpper: '$difficulty'},
        numTour: { $sum: 1 },
        avgRating: { $avg:'$ratingsAverage' },
        maxRating: { $max: '$ratingsAverage' },
        minRating: { $min: '$ratingsAverage' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
        },
      },
        {
          $sort: { minPrice:1 },
        },
        // {
        //   $match: { _id: { $ne: 'EASY' }},
        // }
    ]);
    console.log(stats);
    res.status(200).json({ 
      message: 'success',
      data: { 
        stats,
      }
    });
  }
  catch(err) {
    res.status(404).json({ status: 'fail' , message: err.message});
  }
}


exports.getMonthlyPlan = async(req, res) => {
  try {
    const year = req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind : '$startDates',//divides array into separate result
      },
      {
        $match: { 
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: { 
          _id: { $month: '$startDates' },
          num: { $sum: 1 }, 
          tours: { $push: '$name' },
        }
      },
      {//to add new field
        $addFields: { month: '$_id'}
      },
      {
        //to remove the field
        $project: { 
          _id: 0
        }
      },
      {
        $sort: { 
          num: -1
        }
      }

    ]);
    res.status(200).json({
      status: 'success',
      results: plan.length,
      data: [
        plan,
      ]
    });
  }
  catch(err) {
    res.status(404).json({ status: 'fail', message: err.message});
  }
}