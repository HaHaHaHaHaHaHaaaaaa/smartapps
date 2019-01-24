const voiceRecognizer = swan.ai && swan.ai.getVoiceRecognizer();

Page({
    data: {
        notes: [],
        isRec: false,
        canUseAi:swan.ai || false
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        swan.authorize({
            scope: 'scope.record',
            success: res => {

            },
            fail: (err) => {
                swan.showToast({
                    title: err.errMsg
                })
            }
        });
    },
    longpressed: function (e) {
        const id = e.currentTarget.dataset.id;

        swan.showActionSheet({
            itemList: ['删除'],
            itemColor: '#da3131',
            success: res => {
                let c = swan.getStorageSync('notes');
                if (c) {
                    c = JSON.parse(c).filter(v => v.id !== id)
                    // console.log(c)
                    swan.setStorage({
                        key: 'notes',
                        data: JSON.stringify(c)
                    });;
                }
                this.setData('notes', this.data.notes.filter(v => v.id !== id))
            }
        });
    },
    onVoiceClicked: function (e) {
        // console.log(voiceRecognizer)
       voiceRecognizer && voiceRecognizer.start({ longSpeech: false })
    },
    onVoiceCanceled: function (e) {
       voiceRecognizer && voiceRecognizer.stop()
    },
    onItemClicked: function (e) {
        const item = e.currentTarget.dataset.item;
        swan.navigateTo({
            url: '/pages/content/content?item=' + JSON.stringify(item)
        });
    },
    onRecClicked: function () {
        swan.chooseImage({
            success: (res) => {
                let image = res.tempFilePaths[0];
                swan.ai.ocrBankCard({
                    image,
                    success: (res) => {
                        //console.log(res.result);
                        this.insertBankCard(res.result)
                    }
                });
            }
        });
    },
    onAddClicked: function () {
        swan.navigateTo({
            url: '/pages/add/add'
        });
    },
    insertBankCard: function (obj) {
        const names = ["不能识别", "借记卡", "信用卡"]
        const note = {
            id: Date.now(),
            title: obj.bank_name + ' ' + names[obj.bank_card_type],
            category: '未分类',
            date: new Date().toISOString().split('T')[0],
            content: obj.bank_card_number
        }
        let c = swan.getStorageSync('notes');

        // add
        if (c) {
            c = JSON.parse(c)
            c.unshift(note)
            swan.setStorageSync('notes', JSON.stringify(c));
        } else {
            swan.setStorageSync('notes', JSON.stringify([note]));
        }
        this.setData('notes', c || [note])
    },

    insertVoice: function (content) {

        const note = {
            id: Date.now(),
            title: '语音记事',
            category: '未分类',
            date: new Date().toISOString().split('T')[0],
            content: content
        }
        let c = swan.getStorageSync('notes');

        // add
        if (c) {
            c = JSON.parse(c)
            c.unshift(note)
            swan.setStorageSync('notes', JSON.stringify(c));
        } else {
            swan.setStorageSync('notes', JSON.stringify([note]));
        }
        this.setData('notes', c || [note])
    },

    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
       voiceRecognizer && voiceRecognizer.onStart(() => {
            // console.log('voice start');
            this.setData('isRec', true)
        });
        voiceRecognizer &&voiceRecognizer.onRecognize(res => {
            // console.log('voice recognize', res);
        });
        voiceRecognizer &&voiceRecognizer.onFinish(res => {
            //    console.log('voice end', res);
            this.setData('isRec', false)
            this.insertVoice(res.result)
        });
        voiceRecognizer &&voiceRecognizer.onError(err => {
            // console.log('voice error', err);
            swan.showToast({
                content: err.errorMsg
            })
            this.setData('isRec', false)
        });
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        let c = swan.getStorageSync('notes');
        if (c) {
            // console.log(c)
            this.setData('notes', JSON.parse(c))
        } else {
            this.setData('notes', [])
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