var app = getApp()
Page({
    data: {
        hasLog: false,
        userInfo: Object,
        items: [
            {
                icon: '../../images/lock.png',
                name: '关于我们',
                url: '/pages/about/about'
            }/* ,
            {
                icon: '../../images/lock.png',
                name: '用户反馈',
                url:'/pages/feedback/feedback'
            },
            {
                icon: '../../images/lock.png',
                name: '免责声明',
                url:'/pages/declaration/declaration'
            }, */

        ]
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        console.log(app.globalData.userInfo)
        if (!app.globalData.hasLog) {
            swan.authorize({
                scope: 'scope.userInfo',
                success: (res) => {
                    app.globalData.hasLog = true;
                    swan.getUserInfo({
                        success: (rs) => {
                            console.log(rs.userInfo)
                            this.setData('userInfo', rs.userInfo)
                            app.globalData.userInfo = rs.userInfo
                            app.globalData.hasLog = true
                            this.setData('hasLog', true)
                        }, fail: err => {
                            console.log(err)
                        }
                    })
                },
                fail: (err) => {
                    console.log(err)
                    swan.showToast({
                        title: err.errMsg
                    })
                }
            });
        } else {
            console.log('已授权登录', app.globalData.userInfo)
            this.setData('userInfo', app.globalData.userInfo)
            this.setData('hasLog', true)
        }
    },
    formSubmitHandle: function (e) {
        console.log('form表单submit：', e.detail.value);
        const ob = e.detail.value


    },
    bdAppLogin: function () {
        swan.authorize({
            scope: 'scope.userInfo',
            success: (res) => {
                console.log(res)
                app.globalData.hasLog = true;
                swan.getUserInfo({
                    success: (rs) => {
                        console.log(rs.userInfo)
                        app.globalData.userInfo = rs.userInfo
                    }, fail: err => {
                        console.log(err)
                    }
                })
            },
            fail: (err) => {
                swan.showToast({
                    title: '噢，登录失败...'
                })
            }
        });
    },
    itemClick: function (e) {
        swan.navigateTo({
            url: e.currentTarget.dataset.url
        });
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