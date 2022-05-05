const TABLE = 'digest'

chrome.contextMenus.create({
	title: "收集到DiBox",
	contexts: ['selection'],
	onclick: function(params) {
		// window.xidb('digest', { content: '测试数据', source: '百度网', createTime: '1678786888'})
		
		chrome.tabs.getSelected(null, function(tab) {
			let saveVo = {
				content: params.selectionText,
				source: tab.url,
				sourceTitle: tab.title,
				createTime: Date.now()
			}
			console.log('saveVo', tab)
			xidb.insert(TABLE, saveVo).then(res => console.log(res))
		})
	}
})