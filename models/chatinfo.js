var mongoose=require('mongoose');
var chatinfosSchema=require('../schemas/chatinfos');

module.exports = mongoose.model('Chatinfos',chatinfosSchema);