// đây là Express - Web Server cho website pokedex
const express = require('express');		    //phải mượn Express
const baiHoc2Routes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use('/baiHoc2', baiHoc2Routes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong

let tenVaDiaChiModel = require('./ten-va-dia-chi.model');

const mongoose = require('mongoose');     //phải mượn Mongoose

const PORT = 5600;


mongoose.connect('mongodb+srv://dima:dimaduc@cluster0.ybo8t.mongodb.net/pokedex-db?retryWrites=true&w=majority', { useNewUrlParser: true })
        .catch(error => console.log('không kết nối được với mongoDB: ' + error));
        // nếu không kết nối được thì thông báo lỗi
const connection = mongoose.connection; //  <=> giữa server và DB

// sau đó, mở kết nối để 2 bên nói chuyện
// hiện ra, thông báo là nói chuyện đc rồi
connection.once('open', function() {
  console.log("Đã nói chuyện với MongoDB");    
})

// server bắt đầu nghe và đợi câu hỏi ở phòng PORT 5600
app.listen(PORT, function() {		          //chạy Web Server ở địa chỉ phòng này
  console.log("đã bắt đầu server của bai hoc đang đợi câu hỏi và ở phòng Port: " + PORT);
});

baiHoc2Routes.route('/').get(function(req, res) {
  // res.send('câu trả lời / của router');
  console.log('câu trả lời / của router')
})

baiHoc2Routes.route('/doAn').get(function(req, res) {
  // res.send('câu trả lời / của router');
  console.log('câu trả lời doAn của router')
})

baiHoc2Routes.route('/thanhPho').get(function(req, res) {

  let nameThanhPho = req.query.nameThanhPho
  console.log(nameThanhPho)
  // res.send('câu trả lời / của router');
  // console.log('câu trả lời thanhPho của router')

  tenVaDiaChiModel.find({}, function(err, timThanhPho){
    if (err) {
      console.log(err);
      res.json('Không kết nối với MongoDB')
    }
    else {
      // console.log('đã tìm thấy ' + timThanhPho.length + ' Thanh Pho')
      res.json(timThanhPho)
    }
  }).sort({[nameThanhPho]:1, name:1})

})


baiHoc2Routes.route('/thanhPho/TP').get(function(req, res) {

  let chonThanhPhoName = req.query.chonThanhPhoName
  console.log(chonThanhPhoName)

  if(chonThanhPhoName = 'All'){
    console.log(chonThanhPhoName)

    tenVaDiaChiModel.find({}, function(err, timThanhPho){
      if (err) {
        console.log(err);
        res.json('Không kết nối với MongoDB')
      }
      else {
        console.log('đã tìm thấy ' + timThanhPho.length + ' Thanh Pho')
      }
    }).sort({[nameThanhPho]:1, name:1})

  }
  else{
    console.log('Tìm thành phố trong '+chonThanhPhoName)
    tenVaDiaChiModel.find({chonThanhPhoName: chonThanhPhoName}, function(err, timThanhPhoKhac){
      // res.json(timThanhPhoKhac)
      console.log(timThanhPhoKhac)
    })
  }

})


