// đây là Express - Web Server cho website pokedex
const express = require('express');		    //phải mượn Express
const baiHoc2Routes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use('/baiHoc2', baiHoc2Routes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong

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
  // res.send('câu trả lời / của router');
  console.log('câu trả lời thanhPho của router')
})
