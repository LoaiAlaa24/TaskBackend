const mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Node = mongoose.model('Node');

module.exports.getNodeParent = function(req, res, next) {
    if (!Validations.isString(req.params.parentName)) {
        return res.status(422).json({
            err: null,
            msg: 'nodeId parameter must be a valid ObjectId.',
            data: null
        });
    }
    Node.find({parentName:req.params.parentName}).exec(function(err, node) {
        if (err) {
            return next(err);
        }
        if (!node) {
            return res
                .status(404)
                .json({ err: null, msg: 'Node not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Node retrieved successfully.',
            data: node
        });
    });
};

module.exports.updateNode = function(req,res){ //update node's parent

    if (!Validations.isObjectId(req.body.parentId)) {
        return res.status(422).json({
            err: null,
            msg: 'nodeId parameter must be a valid ObjectId.',
            data: null
        });
    }

    Node.findOneAndUpdate(
        {name:req.params.name},
        {$set: {parentId: req.body.parentId,
            parentName:req.body.name}},
        {new: true},function(err, node){
            if(err){
                return res.status(422).json({
                    err: null,
                    msg: 'can not update the node.',
                    data: null
                });

            }else{
                return res.status(200).json({
                    err: null,
                    msg: 'success.',
                    data: node
                });


            }


        });


}

module.exports.getNode = function(req, res) { //get the node by ID
  if (!Validations.isObjectId(req.params.nodeId)) {
    return res.status(422).json({
      err: null,
      msg: 'nodeId parameter must be a valid ObjectId.',
      data: null
    });
  }
  const node = Node.findById(req.params.nodeId).exec();
  if (!node) {
    return res
      .status(404)
      .json({ err: null, msg: 'node not found.', data: null });
  }
  res.status(200).json({
    err: null,
    msg: 'Node retrieved successfully.',
    data: node
  });
};


module.exports.getNodes = function(req, res, next) { // get all nodes
    Node.find({}).exec(function(err, nodes) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'Nodes retrieved successfully.',
            data: nodes
        });
    });
};

findParentsHelper=function(x,array){ // a recursive function to get all the parents

    if(x==undefined){
        return array;


    }
    else{

        Node.findById(x).exec(  function (err, node) {

            if(node != undefined){


                array.push(node["name"]);
                x = node["parentId"];
                return findParentsHelper(x, array);}
            else{

                return array;

            }


        });





    }}

    module.exports.findChildren=function(req,res,next){ // get children of the node

        if (!Validations.isString(req.params.name)) {
            return res.status(422).json({
                err: null,
                msg: 'name parameter must be a valid name(String).',
                data: null
            });
        }

        Node.find({parentName: req.params.name}).exec(function (err, node) {
            if (err) {
                return next(err);
            }
            if (!node) {
                return res
                    .status(404)
                    .json({err: null, msg: 'node not found.', data: null});
            }




            return res.status(200).json({err:null ,
                msg : 'success'
                , data:node });
        });


}





module.exports.findParents=function(req,res,next){ // get the parents of the node

    r=[];

    if (!Validations.isString(req.params.name)) {
        return res.status(422).json({
            err: null,
            msg: 'name parameter must be a valid name(String).',
            data: null
        });
    }

    Node.find({name: req.params.name}).exec(function (err, node) {
        if (err) {
            return next(err);
        }
        if (!node) {
            return res
                .status(404)
                .json({err: null, msg: 'node not found.', data: null});
        }



        if(node[0]["parentId"] != undefined){
            x=node[0]["parentId"];
        findParentsHelper(x,r);}


setTimeout(function(){return res.status(200).json({err:null , msg : 'success' , data:r })} , 150);

    });


}






module.exports.createNode = function (req, res)  { // create a node

    const valid =
        req.body.name &&
        Validations.isString(req.body.name) ;

    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'name(String) is a required field ',
            data: null
        });
    }
    Node.create(req.body, function(err, node) {
        if (err) {
          return  res.status(422).json({
                err: null,
                msg: 'A node with the same name already exist.',
                data: null
            });
        }
      return  res.status(201).json({
            err: null,
            msg: 'Node was created successfully.',
            data: node
        });
    });
}


