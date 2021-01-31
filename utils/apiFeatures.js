class APIFeature {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = {...this.queryString} ;
      console.log(queryObj);
  
      // 1) EXCLUDING FROM QUERY
      const excludeFields = ['limit', 'sort', 'page', 'fields'];
      excludeFields.forEach((el) => {
        delete queryObj[el];
      });
  
      // ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, e => `$${e}`);
      queryStr = JSON.parse(queryStr);
      // let query = Tour.find(queryStr);
      
      return this;
    }
  
    sort() {
      if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      }
  
      return this;
    }
  
    limit() {
      if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      }
      else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page*1 || 1;
      const limit = this.queryString.limit*1 || 100;
      const skip = (page-1) * limit;
      
      this.query = this.query.skip(skip).limit(limit);
      // if(this.queryString.page){
      //   const count = await Tour.countDocuments();
      //   if(skip>=count){
      //     throw new Error;
      //   }
      // }
  
      return this;
    }
  }

  module.exports = APIFeature;