Page({
    data: {
        items: [
            {
                icon: '../../images/setting.png',
                name: '清空缓存',
                url: '/pages/setting/setting',
            },
            {
                icon: '../../images/about.png',
                name: '免责声明',
                url: '/pages/declaration/declaration'
            },

        ]
    },
    itemClick: function (e) {
        const item = e.currentTarget.dataset.item
        if (item.name === '清空缓存') {
            swan.showModal({
                title: '警告',
                content: '清空缓存将删除所有本地记事!',
                cancelColor: '#999999',
                confirmColor: '#0099cc',
                success: function (res) {
                    if (res.confirm) {
                        swan.showLoading({
                            title: '清理中...'
                        });
                        swan.removeStorage({
                            key: 'notes',
                            success: () => {
                            },
                            fail: () => {

                            },
                            complete: () => {
                                swan.hideLoading()
                            }
                        });
                    }
                }
            });

        } else {
            swan.navigateTo({
                url: item.url
            });
        }
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
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