Page({
    data: {
        index: 0,
        array: [], // category
        editdata: Object
    },
    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        console.log('onload')
        let c = swan.getStorageSync('category')
        if (c) {
            c = JSON.parse(c)
            this.setData('array', c.map(v => v.name))
        }
        if (options.editdata) {
            const ed = JSON.parse(options.editdata)
            this.setData('editdata', ed)
            if (ed.category) {
                this.setData('index', this.data.array.findIndex(v => ed.category == v))
            }
        }

    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    formSubmitHandle: function (e) {

        const ob = e.detail.value
        const note = {
            id: Date.now(),
            title: ob.title,
            category: this.getData('array')[this.getData('index')],
            date: new Date().toISOString().split('T')[0],
            content: ob.content
        }
        let c = swan.getStorageSync('notes');

        // add
        if (c) {
            c = JSON.parse(c)
            const ed = this.getData('editdata')
            if (ed) {
                // 修改
                c = c.map(v => {
                    if (v.id === ed.id) {
                        v.title = note.title
                        v.category = note.category
                        v.date = note.date
                        v.content = note.content
                    }
                    return v
                })

                var pages = getCurrentPages()
                console.log(pages)
                var prePage = pages[pages.length - 2]
                note.id = ed.id
                prePage.setData('items', note)

            } else {
                c.unshift(note)

            }
            swan.setStorageSync('notes', JSON.stringify(c));
        } else {
            swan.setStorageSync('notes', JSON.stringify([note]));
        }





        swan.navigateBack()

    },
    selectorChange: function (e) {
        console.log('picker-selector changed，值为', e.detail.value)
        this.setData(
            'index', e.detail.value
        );
    },

    onShow: function () {
        // 监听页面显示的生命周期函数
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});