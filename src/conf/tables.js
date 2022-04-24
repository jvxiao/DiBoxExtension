
const VERSION = 1

const DB_NAME = 'test'

// 表配置
const TABLES = [
  { 
    // 表名称
    tableName: 'digest',  
    option: {
      keyPath: 'id',
      autoIncrement: true
    },
    // 列名称
    indexs: [
      { key: 'id', option: { unique: true }},
      { key: 'content' },
      { key: 'source' },
      { key: 'createTime' }
    ]
  }
]

module.exports = {
    VERSION,
    DB_NAME,
    TABLES
}