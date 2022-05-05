
const IDB = require('idb-js')
const { VERSION, DB_NAME, TABLES } = require('../../conf/tables')

const IDB_DIGETS_CONF = {
  dbName: DB_NAME ,
  version: VERSION,
  tables: [...TABLES]
}


let request = IDB(IDB_DIGETS_CONF)

// 插入数据
const insert = (tableName, data) => {
  return request.then(db => {
    const promise = new Promise((resolve, reject) => {
      db.insert({
        tableName: tableName,
        data: data,
        success: res => {  resolve(1), console.log('插入成功', res) }
      })
    })
    return promise
  })
}

// 查询数据

const queryAll = (tableName) => {
  const promise = new Promise((resolve, reject) => {
    request.then(db => {
      db.queryAll({
        tableName: tableName,
        success: res => { resolve({ total: res.length, list: res}), console.log('查询成功')}
      })
    })
  })
  return promise
}

// 条件查询
const query = (tableName, condition) => {
  const promise = new Promise((resolve, reject) => {
    request.then(db => {
      let keys = Object.keys(condition)
      db.query({
        tableName: tableName,
        condition: (item) => { return keys.every(key => condition[key] === item[key]) },
        success: res => { resolve({ total: res.length, list: res})}
      })
    })
  })
  return promise
}

//模糊查询
const queryByKeyword = (tableName, key, value) => {
  const promise = new Promise((resolve, reject) => {
    request.then(db => {
      db.query({
        tableName: tableName,
        condition: (item) => {
          let reg = new RegExp(value+'', 'g')
          return reg.test(item[key])
        },
        success: res => {resolve({ total: res.length, list: res})}
      })
    })
  })
  return promise
}

// 更新数据
const update = (tableName, condition, setData) => {
  const promise = new Promise((resolve, reject) => {
    request.then(db => {
      let keys = Object.keys(condition)
      let setDataKeys = Object.keys(setData)
      db.update({
        tableName: tableName,
        condition: (item) => { return keys.every(key => condition[key] === item[key]) },
        handle: (rows, err) => {
          console.log('err', err)
          setDataKeys.forEach(key => rows[key] = setData[key])
        },
        success: res => { resolve(res), console.log(res)}
      })
    })
  })
  return promise
}

// 删除数据
const del = (tableName, id) => {
  const promise = new Promise((resolve, reject) => {
    request.then(db => {
      db.delete({
        tableName: tableName,
        condition: item => item.id === id,
        success: res => { resolve(res), console.log(res)}
      })
    })
  })
  return promise
}

var XIDB = function() {
  this.insert = insert
  this.query = query
  this.queryAll = queryAll
  this.update = update
  this.del = del
  this.queryByKeyword = queryByKeyword
}

const xidb = new XIDB()

// xidb.insert('digest', {id: 1, content: 'ccc'})

window.xidb = xidb

// module.exports = XIDB


// module.XIDB = XIDB
// module.exports = {
//   insert, 
//   query, 
//   queryAll,
//   update,
//   del
// }