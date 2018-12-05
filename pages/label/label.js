Page({
    data: {
        items: [{
            id: 999999999,
            name: "自定义标签 +"
        }]
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        console.log('onload')
        this.setData('items', [{
            id: 999999999,
            name: "自定义标签 +"
        }])
        let c = swan.getStorageSync('category')

        if (c) {
            c = JSON.parse(c)
            this.setData('items', c.concat(this.getData('items')))
        }
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
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
    },
    longpressed: function (e) {
        const id = e.currentTarget.dataset.item.id;
        if (id === 999999999) {
            return
        }
        swan.showActionSheet({
            itemList: ['删除'],
            itemColor: '#da3131',
            success: res => {
                let c = swan.getStorageSync('category');
                if (c) {
                    c = JSON.parse(c).filter(v => v.id !== id)
                    console.log(c)
                    swan.setStorage({
                        key: 'category',
                        data: JSON.stringify(c)
                    });;
                }
                this.setData('items', this.data.items.filter(v => v.id !== id))
            }
        });
    },
    onTagClicked: function (e) {
        const item = e.currentTarget.dataset.item;

        swan.navigateTo({
            url: item.id === 999999999 ? '/pages/create/create' : '/pages/notelist/notelist?name=' + item.name
        });
    }
});