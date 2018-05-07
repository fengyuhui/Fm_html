var sortingList = [{
    id: 1, typeName: "小学一年级"
}, {
    id: 2, typeName: "小学二年级"
}, {
    id: 3, typeName: "小学三年级"
}, {
    id: 4, typeName: "小学四年级"
}, {
    id: 5, typeName: "小学五年级"
}, {
    id: 6, typeName: "小学六年级"
}];

var showType = false;//是否显示分类选项列表
var isplaying = false;//音乐是否播放中
var sortingIndex = -1;
var sortingId = -1;
var subTypeId = -1;
var subTypeIndex = -1;
// var homeUrl = "https://w.xueyouyou.vip";
var homeUrl = "https://w.xueyouyou.vip";
var mp3UrlHeader = "https://mp3.xueyouyou.vip/";
var iconUrlHeader = "https://w.xueyouyou.vip";
var curplay = {};//音乐json
var currentTime = "00:00";

var subtypesList = [
    {id: '1', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '2', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '3', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '4', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },
    { id: '5', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '6', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '7', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '8', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },
    { id: '9', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '10', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '11', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '12', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },
    { id: '13', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '14', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '15', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '16', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },
    { id: '13', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '14', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '15', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }, { id: '16', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },{ id: '13', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },
    { id: '13', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' },{ id: '13', typeName: '活力早餐', iconLocation: 'image/fm/music_icon.png' }
]

function onload() {
         //加载分类
        loadTypes();
        setInterval("playAlrc()",1000);
        var typeValue = document.getElementById('typeValue');
        typeValue.innerHTML = sortingList[0].typeName;
        addTypes();

}

function addSubType() {  //循环添加子分类
    var st = document.getElementById('st');

    var str = '';

    console.log("subtypesList.length"+subtypesList.length);

    for (var i = 1; i < subtypesList.length+1; i++) {
        var j = i-1;
        if((i - 1)%4 == 0){
            str += '<div class="types">';
        }
        str += '<div class="stypes">' +
            '<div data-id='+subtypesList[i-1].id+' data-index = '+j+' class="energy" onclick="choiceSub(this)">' +
            '<image src='+subtypesList[i-1].iconLocation+' />' +
            '<text>'+subtypesList[i-1].typeName+'</text>' +
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
        '<text id = "cancel" onclick = "hideTypes()">取消</text>' +
        '<text id = "ok" onclick = "hideTypes()">确定</text>' +
        '</div>'+
        '<div class="scroll" >' +
        '<div class="sorting-item">';

    console.log("sortingList.length"+sortingList.length);

    for (var i = 0; i < sortingList.length; i++) {
        str+='<div class="backgrounddiv" onclick="selectSorting(this)" data-id='+sortingList[i].id+' data-index='+i+'>' +
            '<text decode="emsp">&emsp;'+sortingList[i].typeName+'&emsp;</text>' +
            '</div>';
    }


    st.innerHTML = str;
}



function showTypes(){ //显示分类选项列表
    document.getElementById('showTypes').style.display='block';
    document.getElementById('mask').style.display='block';
}

function loadTypes(){
    //加载分类
    jQuery.ajax({
        type: "post",
        url: homeUrl+"/getSortinglists",
        dataType: "jsonp", //跨域设置
        success: function(res) {
            //sortingList =  res.sortingList;
            console.log("fail"+JSON.stringify(res));
            console.log("here");
        },
        fail: function(res){
            console.log("fail"+res);
        }
    });
}

function selectSorting(e){//选择分类并刷新数据
    var id=e.getAttribute("data-id");
    var index=e.getAttribute("data-index");

    //先恢复先前选中的分类的样式
    if(document.getElementsByClassName('activebackgrounddiv')[0]!=null){
        document.getElementsByClassName('activebackgrounddiv')[0].setAttribute("class","backgrounddiv");
    }

    e.setAttribute("class","activebackgrounddiv");
    sortingId = id;
    sortingIndex = index;
    var typeName = document.getElementById('typeValue');
    typeName.innerHTML = sortingList[index].typeName;

    //加载子分类
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getSubtypelist?key=' + sortingList[index].id,
        dataType: "jsonp", //跨域设置
        success: function(res) {
            subtypesList =  res.sortingList;
        }
    });

    //显示子分类
    addSubType();
}

function choiceSub(e){//选择子分类并刷新数据
    var id=e.getAttribute("data-id");
    var index=e.getAttribute("data-index");
    subTypeId = id;
    subTypeIndex = index;
    var subTypeValue = document.getElementById('subTypeValue');
    var bgMusic = document.getElementById('bgMusic');
    subTypeValue.innerHTML = subtypesList[index].typeName;

    //根据子分类来获取音频：
    jQuery.ajax({
        type: "post",
        url: homeUrl+'//getFirstSong?id' + subtypesList [index].id,
        dataType: "jsonp", //跨域设置
        success: function(res) {
            curplay =  res.songs;
            if(!res.songs.location){
                console.log("mp3链接不存在");
            }
            else{
                console.log("获取成功");

                //播放音乐
                //记得清空一波
                //清空先空着，记得补上
                isplaying = true;
                bgMusic.setAttribute("src",mp3UrlHeader+res.songs.location);
            }
        },
        fail:function(res){
            console.log(res);
            console.log("获取失败");
        }
    });
}

function hideTypes(){//隐藏分类选择项列表
    showType = false;
    document.getElementById('showTypes').style.display='none';
    document.getElementById('mask').style.display='none';
}

function playMusic(id){//根据音乐id获取音乐并播放
    var bgMusic = document.getElementById('bgMusic');
    //根据id来获取音频：
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getSong?id=' + id,
        dataType: "jsonp", //跨域设置
        success: function(res) {
            curplay =  res.songs;
            if(!res.songs.location){
                console.log("mp3链接不存在");
            }
            else{
                console.log("获取成功");

                //播放音乐
                //记得清空一波
                //清空先空着，记得补上
                isplaying = true;
                bgMusic.setAttribute("src",mp3UrlHeader+res.songs.location);
            }
        },
        fail:function(res){
            console.log(res);
            console.log("获取失败");
        }
    });
}

function play(){//控制播放or暂停
    var bgMusic = document.getElementById('bgMusic');
    var icon = document.getElementById('isPlaying');
    if(isplaying){
        bgMusic.pause();
        icon.setAttribute("src","image/fm/play_start.png");
        isplaying = false;
    }
    else{
        bgMusic.play();//播放
        icon.setAttribute("src","image/fm/play_stop.png");
        isplaying = true;
    }
}

function playAlrc(){//获取音频播放状态
    var bgMusic = document.getElementById('bgMusic');
    var starttime = document.getElementById('starttime');
    var endtime = document.getElementById('endtime');
    // if(bgMusic.playState==3){//正常播放
    //     isplaying = true;
    //     icon.setAttribute("src","image/fm/play_stop.png");
    // }
    // else if(bgMusic.playState==8){//播放完毕
    //
    // }
    // else if(bgMusic.playState==2){//暂停播放
    //     icon.setAttribute("src","image/fm/play_start.png");
    //     isplaying = false;
    // }
    //
    // if(bgMusic.controls.currentPositionString!=null){
    //     starttime.innerHTML = bgMusic.controls.currentPositionString;
    // }
    // if(bgMusic.currentMedia.durationString!=null){
    //     endtime.innerHTML = bgMusic.currentMedia.durationString;
    // }
    // console.log()

    console.log("bgMusic.controls.currentPositionString"+bgMusic.currentTime);
    starttime.innerHTML = secondToDate(bgMusic.currentTime);
    if(bgMusic.paused)
    {
        console.log("pause");
    }

}

function secondToDate(result) {
    var h = Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    if(m<10){
        m = "0"+m;
    }
    if(s<10){
        s = "0"+s;
    }
    return result =  m + ":" + s ;
}