// init_user_db.js
const { client, connectDB } = require('./index');  // 同时引入 connectDB

async function initDatabase() {
  try {
    // 先建立数据库连接
    await connectDB();
    
    // 创建用户表
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('用户表创建成功');
    
    // 插入测试数据
    await client.query(`
      INSERT INTO users (name, email) 
      VALUES ('测试用户', 'test@example.com')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('测试数据插入成功');
    
  } catch (err) {
    console.error('数据库初始化失败:', err);
  } finally {
    // 无论成功还是失败，都尝试关闭连接
    try {
      await client.end();
      console.log('数据库连接已关闭');
    } catch (closeErr) {
      console.error('关闭数据库连接失败:', closeErr);
    }
  }
}

initDatabase();