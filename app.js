/* globals App */

App({
    onLaunch(event) {
        // console.log('onLaunch'); 
        swan.authorize({
            scope: 'scope.userInfo',
            success: res => {
                this.globalData.hasLog = true;
                swan.getUserInfo({
                    success: rs => {
                        // console.log(rs.userInfo)
                        this.globalData.userInfo = rs.userInfo;
                        this.globalData.hasLog = true
                    }, fail: err => {
                        console.log(err)
                    }
                })
            },
            fail: (err) => {
                // swan.showToast({
                //     title: err.errMsg
                // })
            }
        });
        const c = swan.getStorageSync('category');
        // console.log(c)
        if (c && c.length && true) {
            return
        }
        swan.setStorageSync('category', JSON.stringify([{
            id: 1,
            name: "工作"
        }, {
            id: 2,
            name: "生日"
        }, {
            id: 3,
            name: "纪念日"
        }, {
            id: 4,
            name: "未分类"
        }]));
    },
    setWeb: function () {
        swan.setMetaDescription && swan.setMetaDescription({
            content: '一款利用本地存储为您提供本地记事功能，支持语音转换文字记事，银行卡扫描转换文字启事',
            success: function (res) {
                console.log('设置成功');
            },
            fail: function (res) {
                console.log('设置失败');
            },
            complete: function (res) {
                console.log('设置失败');
            }
        });

        swan.setMetaKeywords && swan.setMetaKeywords({
            content: '记事本，本地记事本，明日时尚，语音记事',
            success: function (res) {
                console.log('设置成功');
            },
            fail: function (res) {
                console.log('设置失败');
            },
            complete: function (res) {
                console.log('设置失败');
            }
        });

        swan.setDocumentTitle && swan.setDocumentTitle({
            title: '明日时尚记事本'
        });

    },

    onShow(event) {
        // console.log('onShow');

    },
    onPageNotFound(event) {

    },
    onError(event) {
        // console.log(event)
    },

    globalData: {
        userInfo: {},
        hasLog: false
    }
});
