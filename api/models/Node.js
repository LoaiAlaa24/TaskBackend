const mongoose = require('mongoose');

const nodeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
      unique:true
  },
  parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node',
  },parentName: {
        type: String,
        min: 0
    },
    childlist:{

    type:String


    }

});

mongoose.model('Node', nodeSchema);
