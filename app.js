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
                        console.log(rs.userInfo)
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
        const c =swan.getStorageSync('category');
        console.log(c)
        if(c && c.length){
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
        }]));
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
