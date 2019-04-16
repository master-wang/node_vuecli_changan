var mongoose=require('mongoose');
var usersSchema=require('../schemas/dynaty');

module.exports = mongoose.model('Dynaty',usersSchema);