const dataEntity = require("../models/transport-model");

async function handlerError(req, res, error) {
  console.log("handlerError", error);
  return res.status(500).send({
    success: false,
    error,
    message: error && error.message ? error.message : `Unexpected error`,
  });
}

async function create(req, res) {
  let body = req.body;

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
    return await handlerError(req, res, error);
  }
}

async function updateById(req, res) {
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

      console.log("antes", body.routes);
      if (body.routes == "" || body.routes == null)
        updateObj.routes = undefined;
      else {
        body.routes = JSON.parse(body.routes);
      }
      console.log("despues", body.routes);

      objKeys.forEach((key) => {
        if (typeof key == "string") updateObj[key] = body[key];
      });

      if (body.driver == "" || body.driver == null)
        updateObj.driver = undefined;

      if (body.driverHelper == "" || body.driverHelper == null)
        updateObj.driverHelper = undefined;

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
    return await handlerError(req, res, error);
  }
}

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
async function updateByIdDirect(req, res) {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide data to update",
    });
  }

  try {
    if (body.routes == "" || body.routes == null) updateObj.routes = undefined;
    else body.routes = JSON.parse(body.routes);

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
    return await handlerError(req, res, error);
  }
}

async function deleteById(req, res) {
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
    return await handlerError(req, res, error);
  }
}

async function getById(req, res) {
  try {
    const dataObj = await dataEntity
      .findOne({ _id: req.params.id })
      .populate("driver")
      .populate("driverHelper");

    if (dataObj) return res.status(200).json({ success: true, data: dataObj });
    else
      return res
        .status(400)
        .json({ success: false, message: "Not data found" });
  } catch (error) {
    return await handlerError(req, res, error);
  }
}

async function getByDriverId(req, res) {
  try {
    console.log(req.params.id);
    const dataObj = await dataEntity
      .find({ driver: req.params.id })
      .populate("driver", "name")
      .populate("driverHelper", "name");

    if (dataObj) return res.status(200).json({ success: true, data: dataObj });
    else
      return res
        .status(400)
        .json({ success: false, message: "Not data found" });
  } catch (error) {
    return await handlerError(req, res, error);
  }
}

async function getByDriverIdHelper(req, res) {
  try {
    console.log(req.params.id);
    const dataObj = await dataEntity
      .find({ driverHelper: req.params.id })
      .populate("driver")
      .populate("driverHelper");

    if (dataObj) return res.status(200).json({ success: true, data: dataObj });
    else
      return res
        .status(400)
        .json({ success: false, message: "Not data found" });
  } catch (error) {
    return await handlerError(req, res, error);
  }
}

async function getAll(req, res) {
  try {
    const dataObj = await dataEntity
      .find()
      .populate("routes")
      .populate("driver", "name")
      .populate("driverHelper", "name");
    return res.status(200).json({ success: true, data: dataObj });
  } catch (error) {
    return await handlerError(req, res, error);
  }
}

module.exports = {
  create,
  updateById,
  updateByIdDirect,
  deleteById,
  getById,
  getByDriverId,
  getByDriverIdHelper,
  getAll,
};
