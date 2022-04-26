function toArray(collection) {
  let i = collection.length - 1
  var ret = new Array(i)
  while (i--) {
    ret[i] = collection[i]
  }
  return ret
}

$('#search-btn').click(e => {
  let input = $('#keyword').val()
  console.log(input)
  xidb.query('digest', {content: input}).then(res => {
    let content = ''
    console.log(res)
    if (res && res.list) {
      for(let i=0; i < res.list.length; i++){
        item = res.list[i]
        content += `<div class='item'> 
                      <p class='content'>${item.content} </p>
                      <div class='meta'>
                        <span>${item.source}</span> 
                        <span>${item.source}</span> 
                      </div>
                    </div>`
      }
      console.log('content', content)
    }
    $('#content-list').children().remove()
    console.log(content)
    $('#content-list').append(content)
  })
})

$(document).ready(() => {
  xidb.queryAll('digest').then(res => {
    if (res && res.list) {
      let content = ''
      xidb.queryAll('digest').then(res => {
        if (res && res.list) {
          let content = ''
          for(let i=0; i < res.list.length; i++){
            item = res.list[i]
            content += `<div class='item'> 
                          <p class='content'>${item.content} </p>
                          <div class='meta'>
                            <span>${item.source}</span> 
                            <span>${item.createTime}</span> 
                          </div>
                        </div>`
          }
          $('#content-list').append(content)
        }
      })
    }
  })
})
// xidb.insert('digest', {content: 'ccccc', source: '白卡卡鸡'})