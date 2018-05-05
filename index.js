var sortingList = [{
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

var showType = false;

var subtypesList = [
    {subtypesId: '1', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '2', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '3', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '4', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '5', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '6', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '7', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '8', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '9', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '10', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '11', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '12', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '13', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '14', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '15', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '16', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '13', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '14', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '15', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }, { subtypesId: '16', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },{ subtypesId: '13', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },
    { subtypesId: '13', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' },{ subtypesId: '13', subtypeName: '活力早餐', subtypeIcon: 'image/fm/music_icon.png' }
]

function onload() {
        addTypes();
        addSubType();
}

function addSubType() {  //循环添加子分类
    var st = document.getElementById('st');

    var str = '';

    console.log("subtypesList.length"+subtypesList.length);

    for (var i = 1; i < subtypesList.length+1; i++) {
        if((i - 1)%4 == 0){
            str += '<div class="types">';
        }
        str += '<div class="stypes">' +
            '<div data-id='+subtypesList[i-1].subtypesId+' class="energy" onclick="a()">' +
            '<image src='+subtypesList[i-1].subtypeIcon+' />' +
            '<text>'+subtypesList[i-1].subtypeName+'</text>' +
            '</div>' +
            '</div>';
        if(i%4 == 0 && i!=0){
            str += '</div>';
        }
    }
    st.innerHTML = str;
}

function addTypes() {  //循环添加分类
    var st = document.getElementById('showTypes');

    var str = '';

    str+='<div class="ensureitem">' +
        '<text id = "cancel">取消</text>' +
        '<text id = "ok" bindtap=\'ensure_type\'>确定</text>' +
        '</div>'+
        '<div class="scroll" >' +
        '<div class="sorting-item">';

    console.log("sortingList.length"+sortingList.length);

    for (var i = 0; i < sortingList.length; i++) {
        str+='<div class="backgrounddiv">' +
            '<text decode="emsp">&emsp;'+sortingList[i].value+'&emsp;</text>' +
            '</div>';
    }


    st.innerHTML = str;
}



function showTypes(){ //显示分类选项列表
    document.getElementById('showTypes').style.display='block';
    document.getElementById('mask').style.display='block';
}

function a(){
    alert("ere");
}
