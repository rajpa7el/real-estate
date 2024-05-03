const test = (req, res) => {
    res.send({
      message: "Api route is working",
    });
  };
  
module.exports = { test };