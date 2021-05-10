const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    grade: String
}, 
{
   'collection': 'studentsCollection'
});

module.exports = mongoose.model('studentsCollection', studentSchema);