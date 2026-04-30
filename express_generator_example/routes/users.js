// routes/users.js
var express = require('express');
var router = express.Router();
var { client } = require('../DB/index');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    // 查询用户表（如果不存在会报错，后续可以添加创建表的逻辑）
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '数据库查询失败' });
  }
});

/* POST 添加用户 */
router.post('/', async function(req, res, next) {
  try {
    const { name, email } = req.body;
    
    // 检查必填字段
    if (!name || !email) {
      return res.status(400).json({ error: '姓名和邮箱不能为空' });
    }
    
    // 插入新用户
    const result = await client.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '添加用户失败' });
  }
});


module.exports = router;