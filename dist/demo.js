(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var classCallCheck=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},createClass=function(){function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}}(),Dep=function(){function e(){classCallCheck(this,e),this.deps=[]}return createClass(e,[{key:"add",value:function(e){this.deps.push(e)}},{key:"notify",value:function(){for(var e=0;e<this.deps.length;e++)this.deps[e]();this.deps.length=0}}]),e}(),NAME="idb-js";function log_error(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";throw new Error(NAME+"："+e)}function log(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";console.log(NAME+"："+e)}var indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction,IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange,isObject=function(e){return"[object Object]"===Object.prototype.toString.call(e)},isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},DB=function(){function r(e){var n=e.dbName,t=e.version;classCallCheck(this,r),this.dbName=n,this.version=t,this.db=null,this.idb=null,this.table=[],this._status=!1,this._dep_=new Dep}return createClass(r,[{key:"open",value:function(e){var t=this,n=function(){},r=function(){};if(e&&(n=e.success?e.success:n,r=e.error?e.error:r),0!=this.table.length||this._status)if("function"==typeof n){var o=indexedDB.open(this.dbName,this.version);o.onerror=function(e){r(e.currentTarget.error.message)},o.onsuccess=function(e){t.db=e.target.result,n(t.db),t._dep_.notify()},o.onupgradeneeded=function(e){t.idb=e.target.result;for(var n=0;n<t.table.length;n++)t.__create_table(t.idb,t.table[n])}}else log_error("open中success必须是一个function类型");else log_error("打开前要先用add_table添加表")}},{key:"close_db",value:function(){var e=this;this.__action(function(){e.db.close()})}},{key:"delete_db",value:function(){indexedDB.deleteDatabase(name)}},{key:"clear_table",value:function(e){var n=this,t=e.tableName;this.__action(function(){return n.__create_transaction(t,"readwrite").clear()})}},{key:"add_table",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this._status=!1,this.table.push(e)}},{key:"queryAll",value:function(e){var n=this,r=e.tableName,t=e.success,o=void 0===t?function(){}:t;if("function"==typeof o){this.__action(function(){var t=[];n.__create_transaction(r,"readonly").openCursor().onsuccess=function(e){return n.__cursor_success(e,{condition:function(){return!0},handler:function(e){var n=e.currentValue;return t.push(n)},over:function(){return o(t)}})}})}else log_error("queryAll方法中success必须是一个Function类型")}},{key:"query",value:function(e){var n=this,r=e.tableName,o=e.condition,t=e.success,i=void 0===t?function(){}:t;if("function"==typeof i)if("function"==typeof o){this.__action(function(){var t=[];n.__create_transaction(r,"readonly").openCursor().onsuccess=function(e){return n.__cursor_success(e,{condition:o,handler:function(e){var n=e.currentValue;return t.push(n)},over:function(){return i(t)}})}})}else log_error("in query,condition is required,and type is function");else log_error("query方法中success必须是一个Function类型")}},{key:"insert",value:function(e){var t=this,r=e.tableName,o=e.data,n=e.success,i=void 0===n?function(){}:n;isArray(o)||isObject(o)?"function"==typeof i?this.__action(function(){var n=t.__create_transaction(r,"readwrite");isArray(o)?o.forEach(function(e){return n.put(e)}):n.put(o),i()}):log_error("insert方法中success必须是一个Function类型"):log_error("in insert，data type is Object or Array")}},{key:"delete",value:function(e){var n=this,t=e.tableName,o=e.condition,r=e.success,i=void 0===r?function(){}:r;if("function"==typeof i)if("function"==typeof o){this.__action(function(){var r=[];n.__create_transaction(t,"readwrite").openCursor().onsuccess=function(e){return n.__cursor_success(e,{condition:o,handler:function(e){var n=e.currentValue,t=e.cursor;r.push(n),t.delete()},over:function(){0!=r.length?i(r):log_error("in delete ,数据库中没有任何符合condition的元素")}})}})}else log_error("in delete,condition is required,and type is function");else log_error("delete方法中success必须是一个Function类型")}},{key:"delete_by_primaryKey",value:function(e){var n=this,t=e.tableName,r=e.target,o=e.success,i=void 0===o?function(){}:o,a=e.error,c=void 0===a?function(){}:a;"function"==typeof i?this.__action(function(){var e=n.__create_transaction(t,"readwrite").delete(r);e.onsuccess=function(){return i()},e.onerror=function(){return c()}}):log_error("in delete_by_primaryKey，success必须是一个Function类型")}},{key:"update_by_primaryKey",value:function(e){var n=this,r=e.tableName,o=e.target,t=e.success,i=void 0===t?function(){}:t,a=e.handle;"function"==typeof i?"function"==typeof a?this.__action(function(){var t=n.__create_transaction(r,"readwrite");t.get(o).onsuccess=function(e){var n=e.target.result;a(n),t.put(n),i(n)}}):log_error("in update_by_primaryKey，handle必须是一个Function类型"):log_error("in update_by_primaryKey，success必须是一个Function类型")}},{key:"update",value:function(e){var n=this,t=e.tableName,o=e.condition,i=e.handle,r=e.success,a=void 0===r?function(){}:r;if("function"==typeof i)if("function"==typeof a)if("function"==typeof o){this.__action(function(){var r=[];n.__create_transaction(t,"readwrite").openCursor().onsuccess=function(e){return n.__cursor_success(e,{condition:o,handler:function(e){var n=e.currentValue,t=e.cursor;i(n),r.push(n),t.update(n)},over:function(){0!=r.length?a(r):log_error("in update ,数据库中没有任何符合condition的元素")}})}})}else log_error("in update,condition is required,and type is function");else log_error("in update,success必须是一个function类型");else log_error("in update,handle必须是一个function类型")}},{key:"query_by_primaryKey",value:function(e){var n=this,t=e.tableName,r=e.target,o=e.success,i=void 0===o?function(){}:o;if("function"==typeof i){this.__action(function(){n.__create_transaction(t,"readonly").get(r).onsuccess=function(e){var n=e.target.result;i(n||null)}})}else log_error("in query_by_primaryKey,success必须是一个Function类型")}},{key:"query_by_index",value:function(e){var n=this,t=e.tableName,r=e.indexName,o=e.target,i=e.success,a=void 0===i?function(){}:i;if("function"==typeof a){this.__action(function(){n.__create_transaction(t,"readonly").index(r).get(o).onsuccess=function(e){var n=e.target.result;a(n||null)}})}else log_error("in query_by_index,success必须是一个Function类型")}},{key:"__cursor_success",value:function(e,n){var t=n.condition,r=n.handler,o=n.over,i=e.target.result;if(i){var a=i.value;t(a)&&r({cursor:i,currentValue:a}),i.continue()}else o()}},{key:"__create_transaction",value:function(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"readwrite";if(!e||!n)throw new Error("in __create_transaction,tableName and mode is required");return this.db.transaction(e,n).objectStore(e)}},{key:"__action",value:function(e){var n=function(){e()};this.db?n():this._dep_.add(n)}},{key:"__create_table",value:function(e,n){var t=n.tableName,r=n.option,o=n.indexs,i=void 0===o?[]:o;if(!e.objectStoreNames.contains(t)){var a=e.createObjectStore(t,r),c=!0,s=!1,u=void 0;try{for(var l,d=i[Symbol.iterator]();!(c=(l=d.next()).done);c=!0){var f=l.value;this.__create_index(a,f)}}catch(e){s=!0,u=e}finally{try{!c&&d.return&&d.return()}finally{if(s)throw u}}}}},{key:"__create_index",value:function(e,n){var t=n.key,r=n.option;e.createIndex(t,t,r)}}]),r}();function Idb(e){var t=e.dbName,n=e.version,r=void 0===n?(new Date).getTime():n,o=e.tables,i=void 0===o?[]:o,a=new DB({dbName:t,version:r}),c=!0,s=!1,u=void 0;try{for(var l,d=i[Symbol.iterator]();!(c=(l=d.next()).done);c=!0){var f=l.value;a.add_table(f)}}catch(e){s=!0,u=e}finally{try{!c&&d.return&&d.return()}finally{if(s)throw u}}return new Promise(function(e,n){a.open({success:function(){log("数据库 "+t+" 已经打开"),e(a)},error:function(e){n(e)}})})}module.exports=Idb;

},{}],2:[function(require,module,exports){

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
      { key: 'sourceTitle'},
      { key: 'createTime' },
    ]
  }
]

module.exports = {
    VERSION,
    DB_NAME,
    TABLES
}
},{}],3:[function(require,module,exports){

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
},{"../../conf/tables":2,"idb-js":1}]},{},[3]);
