const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let tenVaDiaChi = new Schema(
  {
    Co: String,
    LucDia: String,
    Nuoc: String, 
    SoNguoi: String, 
    Ten: String,
  },
  {collection: 'Ten va Dia Chi'}          //tên của collection trong MongoDB
);
tenVaDiaChi.index({Co:'text', LucDia:'text', Nuoc: 'text', SoNguoi: 'text', Ten: 'text'})
module.exports = mongoose.model('Ten va Dia Chi', tenVaDiaChi);





