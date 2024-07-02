

exports.gettest = async (req, res, next) => {
  // const query = 'SELECT * FROM chat_request';
  // sequelize.query(query, (err, results) => {
  //   if (err) {
  //     throw err;
  //   }
  //   //here
  // });
  res.render('general/indexx', { rooms: results });
};