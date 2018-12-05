Page({
    data: {
        title: String
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
    },

    formSubmitHandle: function (e) {
        console.log('form表单submit：', e.detail.value);
        const title = e.detail.value.title
        if (!title || title.trim() === '') {
            swan.showToast({
                title: '名称不能为空',
                icon: 'none'
            })
        } else {
            let c = JSON.parse(swan.getStorageSync('category'));
            console.log(c)
            c.push({ id: Date.now(), name: title })

            var pages = getCurrentPages()

            var prePage = pages[pages.length - 2]

            prePage.setData('items', c.concat([{
                id: 999999999,
                name: "自定义标签 +"
            }]))

            swan.setStorageSync('category', JSON.stringify(c));
            swan.navigateBack()
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
    }
});