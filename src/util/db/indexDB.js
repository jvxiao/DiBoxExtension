import IDB from 'idb-js'

const indexDB = window.indexedDB || window.webkitindexeDB

const request = indexDB.open('digest', 1)

request.onupgradeneeded = (e) => {
  db = e.target.result

  let bookStore = db.createObjectStore('store', {
    autoIncrement: true,
    keyPath: 'indexKey'
  })
  bookStore.createIndex('title', 'title', { unique: false })
}

request.onsuccess = () => {
  db = t.target.result 

  var newBook = {
    title: '132'
  }

  let trans = request.transaction('store', 'readwrite')

  trans.onerror = (e) => {
    console.log(trans.error)
  }

  let store = trans.objectStore('store')

  var addRes= strore.add(newBook)
  addRes.onsuccess = () => {
    console.log()
  }
}