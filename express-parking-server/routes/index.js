var express = require('express');
var router = express.Router();
var fs = require('fs');
var dir_file = '././data.json';
/* GET home page. */
router.get('/', function (req, res, next) {

  fs.readFile(dir_file, 'utf-8', (e, text) => {
    if (e) {
      res.render('index', { title: 'Parking App' });
      
    } else {
      res.render('index', { title: 'Parking App', content: JSON.parse(text) });
    }
  })
});
router.post('/saveData', function (req, res) {
  fs.writeFile(dir_file, JSON.stringify(req.body), (e) => {
      res.redirect('/');
  });
});
module.exports = router;
