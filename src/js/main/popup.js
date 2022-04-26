function toArray(collection) {
  let i = collection.length - 1
  var ret = new Array(i)
  while (i--) {
    ret[i] = collection[i]
  }
  return ret
}

function formatTime(fmt, timeStamp) {
  const date = new Date(timeStamp)
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}


$('#search-btn').click(e => {
  let input = $('#keyword').val()
  xidb.query('digest', {content: input}).then(res => {
    let content = ''
    if (res && res.list) {
      renderList(res)
    }
  })
})

$(document).ready(() => {
  xidb.queryAll('digest').then(res => {
    if (res && res.list) {
      let content = ''
      xidb.queryAll('digest').then(res => {
        if (res && res.list) {
          renderList(res)
        }
      })
    }
  })
})

function renderList(res) {
  let content = ''
  for(let i=0; i < res.list.length; i++){
    item = res.list[i]
    content += `
      <div class='item'> 
        <p class='content'>${item.content} </p>
        <div class='meta'>
          <a class='meta_source text-ellipse' href='${item.source}'>${item.source}</a>
          <span  class='meta_createTime'>${formatTime('YYYY-mm-dd HH:MM:SS', item.createTime)}</span> 
        </div>
      </div>
    `
  }
  $('#content-list').children().remove()
  $('#content-list').append(content)
}