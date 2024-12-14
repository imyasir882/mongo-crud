const mongoose = require('mongoose');

// Define the schema
const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true, // Fixed the spelling of 'require'
        unique: true,
    },
    studentName: { // Fixed the spelling of 'studnetName'
        type: String,
        required: true, // Fixed the spelling of 'require'
    },
    age: {
        type: Number,
    },
});

// Export the model
module.exports = mongoose.model('Item', studentSchema);
