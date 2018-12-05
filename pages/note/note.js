Page({
    data: {
        notes: [
            /* {
                id: 1,
                title: '周末会议',
                category: '工作',
                date: '2018-12-01',
                content: '本周末有重要会议本周末有重要会议本周末有重要会议本周末有重要会议本周末有重要会议本周末有重要会议本周末有重要会议'
            }, {
                id: 2,
                title: '上午有事',
                category: '生日',
                date: '2018-12-01',
                content: '去办理业务'
            }, {
                id: 3,
                title: '重要',
                category: '纪念日',
                date: '2018-12-01',
                content: '接待某公司高层'
            } */
        ]
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
    },
    longpressed: function (e) {
        const id = e.currentTarget.dataset.id;

        swan.showActionSheet({
            itemList: ['删除'],
            itemColor: '#da3131',
            success: res => {
                let c = swan.getStorageSync('notes');
                if (c) {
                    c=JSON.parse(c).filter(v=>v.id!==id)
                    console.log(c)
                    swan.setStorage({
                        key: 'notes',
                        data: JSON.stringify(c)
                    });;
                }
                this.setData('notes', this.data.notes.filter(v => v.id !== id))
            }
        });
    },
    onItemClicked: function (e) {
        const item = e.currentTarget.dataset.item;
        swan.navigateTo({
            url: '/pages/content/content?item=' + JSON.stringify(item)
        });
    },
    onAddClicked: function () {
        swan.navigateTo({
            url: '/pages/add/add'
        });
    },

    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        let c = swan.getStorageSync('notes');
        if (c) {
            console.log(c)
            this.setData('notes', JSON.parse(c))
        }

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
    onBtnClick: function (e) {
        const type = e.currentTarget.dataset.type;

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});