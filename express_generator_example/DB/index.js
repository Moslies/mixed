// db.js
const { Client } = require('pg');

// 数据库连接配置
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
});
// 连接数据库
async function connectDB() {
  try {
    await client.connect();
    console.log('数据库连接成功');
  } catch (err) {
    console.error('数据库连接失败:', err);
  }
}

// 导出数据库客户端和连接函数
module.exports = {
  client,
  connectDB
};