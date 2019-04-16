var mongoose=require('mongoose');
var boardsSchema=require('../schemas/boards');

module.exports = mongoose.model('Boards',boardsSchema);