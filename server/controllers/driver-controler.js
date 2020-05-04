const dataEntity = require("../models/driver-model");

create = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Data are not valid",
    });
  }

  try {
    const newObj = new dataEntity(body);
    const dataObj = await newObj.save();

    return res.status(200).json({
      success: true,
      data: dataObj,
      message: "Success created!",
    });
  } catch (error) {
    return this.handlerError(error);
  }
};

updateById = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a valid data to update",
    });
  }

  try {
    const updateObj = await dataEntity.findOne({ _id: req.params.id });

    if (updateObj) {
      let objKeys = Object.keys(body);

      objKeys.forEach((key) => {
        updateObj[key] = body[key];
      });

      await updateObj.save();
      return res.status(200).json({
        success: true,
        data: updateObj,
        message: "Data success updated!",
      });
    } else
      return res.status(404).json({
        success: false,
        message: "Not data found!",
      });
  } catch (error) {
    return this.handlerError(error);
  }
};

// The following updates directly into MongoDB and you want to avoid them unless you want to skip the middlewares and field validations.
/*
UserModel.find()                   // find all users
         .skip(100)                // skip the first 100 items
         .limit(10)                // limit to 10 items
         .sort({firstName: 1}      // sort ascending by firstName
         .select({firstName: true} // select firstName only
         .exec()                   // execute the query
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })
*/
updateByIdDirect = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide data to update",
    });
  }

  try {
    const dataReturn = await dataEntity.findOneAndUpdate(
      // const dataReturn = await dataEntity.findByIdAndUpdate(
      { _id: req.params.id },
      body,
      {
        new: true,
      }
    );

    if (dataReturn)
      return res.status(200).json({
        success: true,
        data: dataReturn,
        message: "Success updated!",
      });
    else
      return res
        .status(400)
        .send({ success: false, message: `Data not found` });
  } catch (error) {
    return this.handlerError(error);
  }
};

deleteById = async (req, res) => {
  try {
    const deleteObj = await dataEntity.findOneAndDelete({ _id: req.params.id });

    if (deleteObj)
      return res.status(200).json({
        success: true,
        message: "Success deleted!",
      });
    else
      return res
        .status(404)
        .send({ success: false, message: `Data not found` });
  } catch (error) {
    return this.handlerError(error);
  }
};

getById = async (req, res) => {
  try {
    const dataObj = await dataEntity.findOne({ _id: req.params.id });

    if (dataObj) return res.status(200).json({ success: true, data: dataObj });
    else
      return res
        .status(400)
        .json({ success: false, message: "Not data found" });
  } catch (error) {
    return this.handlerError(error);
  }
};

getAll = async (req, res) => {
  try {
    const dataObj = await dataEntity.find().populate("transport");
    return res.status(200).json({ success: true, data: dataObj });
  } catch (error) {
    return this.handlerError(error);
  }
};

handlerError = (error) => {
  console.log("=============Error=========", error);
  return res.status(500).send({
    success: false,
    message: error && error.message ? error.message : `Unexpected error`,
  });
};

module.exports = {
  create,
  updateById,
  deleteById,
  getById,
  getAll,
};
