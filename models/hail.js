var mongoose=require('mongoose');
var hailsSchema=require('../schemas/hails');

module.exports = mongoose.model('Hails',hailsSchema);