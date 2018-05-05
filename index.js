var sortingList  = [{
    key: 1, value: "小学一年级"
}, {
    key: 2, value: "小学二年级"
}, {
    key: 3, value: "小学三年级"
}, {
    key: 4, value: "小学四年级"
}, {
    key: 5, value: "小学五年级"
}, {
    key: 6, value: "小学六年级"
}];

var subtypesList = [
    {subtypesId: '1', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '2', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '3', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '4', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '5', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '6', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '7', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '8', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '9', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '10', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '11', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '12', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '13', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '14', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '15', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '16', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }
]

function onload() {

        adddiv();
}

function adddiv() {  //循环添加子分类
    var st = document.getElementById('st');

    var str = '';

    console.log("subtypesList.length"+subtypesList.length);

    for (var i = 1; i < subtypesList.length+1; i++) {
        if((i - 1)%4 == 0){
            str += '<div class="types">';
        }
        str += '<div class="stypes">' +
            '<div data-id='+subtypesList[i-1].subtypesId+' class="energy">' +
            '<image src='+subtypesList[i-1].subtypeIcon+' />' +
            '<text>'+subtypesList[i-1].subtypeName+'</text>' +
            '</div>' +
            '</div>';
        if(i%4 == 0 && i!=0){
            str += '</div>';
        }


        // str += '<div class="types">' +
        //     '<div class="stypes">' +
        //     '<div data-id="1" class="energy">' +
        //     '<image src="image/fm/music_icon.png" />' +
        //     '<text>活力早晨</text>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div class="stypes">' +
        //     '<div data-id="1" class="energy">' +
        //     '<image src="image/fm/music_icon.png" />' +
        //     '<text>活力早晨</text>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div class="stypes">' +
        //     '<div data-id="1" class="energy">' +
        //     '<image src="image/fm/music_icon.png" />' +
        //     '<text>活力早晨</text>' +
        //     '</div>' +
        //     '</div>' +
        //     '<div class="stypes">' +
        //     '<div data-id="1" class="energy">' +
        //     '<image src="image/fm/music_icon.png" />' +
        //     '<text>活力早晨</text>' +
        //     '</div>' +
        //     '</div>' +
        //     '</div>';
    }
    st.innerHTML = str;
}
