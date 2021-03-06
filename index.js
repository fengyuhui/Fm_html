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
var old_type = -1;//old_sorting_id
var music_title = "";
var sortingIndex = -1;
var sortingId = -1;
var subTypeId = -1;
// var homeUrl = "https://w.xueyouyou.vip";
var homeUrl = "https://w.xueyouyou.vip";
var mp3UrlHeader = "https://mp3.xueyouyou.vip/";
var iconUrlHeader = "https://w.xueyouyou.vip";
var curplay = {};//音乐json

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

        curplay.id = -1;

        //如果有历史缓存
        if(localStorage.getItem("music_id")!=null){ //如果有过播放记录，那么读缓存、加载子分类并播放
            getPlayStorage();
            //加载子分类
            jQuery.ajax({
                type: "post",
                url: homeUrl+'/getSubtypelist?key=' + sortingId,
                dataType: "json", //跨域设置
                success: function(res) {
                    subtypesList =  res.sortingList;
                }
            });

            //显示第一个分类下的子分类
            addSubType();
            //播放
            playMusic(curplay.id);
        }
        else{
            //初始化分类名称
            var typeValue = document.getElementById('typeValue');
            typeValue.innerHTML = sortingList[0].typeName;
            sortingId = sortingList[0].id;
            old_type = sortingList[0].id;
            addTypes();//加载分类到分类选项列表

            sortingIndex = 0;

            //加载子分类
            jQuery.ajax({
                type: "post",
                url: homeUrl+'/getSubtypelist?key=' + sortingList[0].id,
                dataType: "json", //跨域设置
                success: function(res) {
                    subtypesList =  res.sortingList;
                }
            });

            //显示第一个分类下的子分类
            addSubType();
        }
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
        dataType: "json", //跨域设置
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
    old_type = id;
    var typeName = document.getElementById('typeValue');
    typeName.innerHTML = sortingList[index].typeName;

    //加载子分类
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getSubtypelist?key=' + sortingList[index].id,
        dataType: "json", //跨域设置
        success: function(res) {
            subtypesList =  res.sortingList;
        }
    });

    //显示子分类
    addSubType();
}

function choiceSub(e){//选择子分类并刷新数据
    var bgMusic = document.getElementById("bgMusic");
    var starttime = document.getElementById('starttime');
    var icon = document.getElementById('isPlaying');
    var endtime = document.getElementById('endtime');

    var id=e.getAttribute("data-id");
    var index=e.getAttribute("data-index");
    subTypeId = id;
    var subTypeValue = document.getElementById('subTypeValue');
    subTypeValue.innerHTML = subtypesList[index].typeName;

    // setPlayStorage();

    //根据子分类来获取音频：
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getFirstSong?id' + subtypesList [index].id,
        dataType: "json", //跨域设置
        success: function(res) {
            curplay =  res.songs;
            if(!res.songs.location){
                console.log("mp3链接不存在");
            }
            else{
                console.log("获取成功");

                //播放音乐
                //清空一波
                icon.setAttribute("src","image/fm/play_start.png");
                console.log("停止所有播放");
                bgMusic.pause();
                starttime.innerHTML = "00:00";
                endtime.innerHTML = "00:00";
                isplaying = true;
                bgMusic.setAttribute("src",mp3UrlHeader+res.songs.location);
                setPlayStorage();
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
    var starttime = document.getElementById('starttime');
    var icon = document.getElementById('isPlaying');
    var endtime = document.getElementById('endtime');
    //根据id来获取音频：
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getSong?id=' + id,
        dataType: "json", //跨域设置
        success: function(res) {
            curplay =  res.songs;
            if(!res.songs.location){
                console.log("mp3链接不存在");
            }
            else{
                console.log("获取成功");

                //播放音乐
                //清空一波
                icon.setAttribute("src","image/fm/play_start.png");
                console.log("停止所有播放");
                bgMusic.pause();
                starttime.innerHTML = "00:00";
                endtime.innerHTML = "00:00";
                isplaying = true;
                bgMusic.setAttribute("src",mp3UrlHeader+res.songs.location);
                setPlayStorage();
            }
        },
        fail:function(res){
            console.log(res);
            console.log("获取失败");

            //test数据
            bgMusic.setAttribute("src","http://t1.aixinxi.net/o_1ccn07dld1jfr18fo1akauvp1st0a.mp3");
            setPlayStorage();

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
    var icon = document.getElementById('isPlaying');
    var endtime = document.getElementById('endtime');
    var playprogress = document.getElementById("playprogress");
    var pslider = document.getElementById("pslider");
    if(bgMusic.playState==3){//正常播放
        isplaying = true;
        icon.setAttribute("src","image/fm/play_stop.png");
        console.log("正常播放");
    }
    else if(bgMusic.ended){//播放完毕
        icon.setAttribute("src","image/fm/play_start.png");
        isplaying = false;
        console.log("播放完毕");
    }
    else if(bgMusic.playState==2){//暂停播放
        icon.setAttribute("src","image/fm/play_start.png");
        isplaying = false;
        console.log("暂停播放");
    }
    //
    // if(bgMusic.controls.currentPositionString!=null){
    //     starttime.innerHTML = bgMusic.controls.currentPositionString;
    // }
    // if(bgMusic.currentMedia.durationString!=null){
    //     endtime.innerHTML = bgMusic.currentMedia.durationString;
    // }
    // console.log()

    starttime.innerHTML = secondToDate(bgMusic.currentTime);
    endtime.innerHTML = secondToDate(bgMusic.duration);
    playprogress.max = bgMusic.duration;
    if(playprogress.value!=playprogress.max){
        if(!bgMusic.paused){
            playprogress.value++;
           var add = Math.floor(((playprogress.value / playprogress.max) * 100))/100 *552;
            var str = '    width:38px;position: absolute;border-radius: 4px;height:51px;' +
                '    color: #ff4892;' +
                '    float:left;' +
                '    top: 54%;'+
               '    left:calc(6% + '+add+'px);'
            pslider.setAttribute("style",str);
        }
    }
    else{
        playprogress.value = 0;
        var str = '    width:38px;position: absolute;border-radius: 4px;height:51px;' +
            '    color: #ff4892;' +
            '    float:left;' +
            '    top: 54%;'+
            '    left:6%;'
        pslider.setAttribute("style",str);
    }

}

function secondToDate(result) {//转格式
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

function playOther(e){
    var bgMusic = document.getElementById("bgMusic");
    var starttime = document.getElementById('starttime');
    var icon = document.getElementById('isPlaying');
    var endtime = document.getElementById('endtime');
    var subTypeValue = document.getElementById('subTypeValue');
    var typeName = document.getElementById('typeValue');
    var signal = 0;

    //清空一波
    icon.setAttribute("src","image/fm/play_start.png");
    isplaying = false;
    console.log("停止播放，请求下一首");
    bgMusic.pause();
    starttime.innerHTML = "00:00";
    endtime.innerHTML = "00:00";

    if(e == 1){
        signal = 1;
    }
    else{
        signal = e.getAttribute("data-signal");
    }
    //获取下一首音频id：
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getOtherSong?id=' + subTypeId+'&music_id=' +curplay.id+'&signal='+signal,
        dataType: "json", //跨域设置
        success: function(res) {
            console.log("成功返回："+JSON.stringify(res));
            curplay.id = res.music_message.music_id;
            sortingId = res.music_message.sorting_id;
            subTypeId = res.music_message.subtype_id;

            //刷新一波界面
            typeName.innerHTML = res.music_message.sorting_name;
            subTypeValue.innerHTML = res.music_message.subtype_name;

            //查找一波sortingIndex
            for (var i = 0; i < sortingList.length; i++) {
                if (sortingId  == sortingList[i].id) {
                    sortingIndex = i;
                }
            }

            if(sortingId!=old_type){//跳分类了
                old_type = sortingId;
                //加载新子分类
                jQuery.ajax({
                    type: "post",
                    url: homeUrl+'/getSubtypelist?key=' + sortingId,
                    dataType: "json", //跨域设置
                    success: function(res) {
                        subtypesList =  res.sortingList;
                    }
                });

                //显示子分类
                addSubType();
            }

            //播放新音频
            playMusic(res.music_message.music_id);

        },
        fail:function(res){
            console.log("获取失败："+JSON.stringify(res));
        }
    });
}

//切换分类的小箭头
function switchType(e) {
    var signal = 0;
    signal = e.getAttribute("data-signal");

    //取循环sortingIndex
    if(signal == -1){
        if(sortingIndex == 0){
            sortingIndex = sortingList.length - 1;;
        }
        else{
            sortingIndex--;
        }
    }
    else if(signal == 1){
        if (sortingIndex<that.data.sortingList.length - 1){
            sortingIndex++;
        }
        else{
            sortingIndex = 0;
        }
    }

    //刷新一波界面
    var typeName = document.getElementById('typeValue');
    typeName.innerHTML = sortingList[sortingIndex].typeName;

    //加载子分类
    jQuery.ajax({
        type: "post",
        url: homeUrl+'/getSubtypelist?key=' + sortingList[sortingIndex].id,
        dataType: "json", //跨域设置
        success: function(res) {
            subtypesList =  res.sortingList;
        }
    });

    //显示子分类
    addSubType();

}

//转发，这个先不写
function onShareAppMessage(){
    
}

//记录历史缓存
function setPlayStorage(){
    localStorage.setItem("sortingId", sortingId);
    localStorage.setItem("sortingIndex", sortingIndex);
    localStorage.setItem("subTypeId", subTypeId);
    localStorage.setItem("sortingName", sortingList[sortingIndex].typeName);//供前台页面使用
    localStorage.setItem("subTypeName", $("#subTypeValue").val());//供前台页面使用
    if(curplay!={}){
        localStorage.setItem("musicId", curplay.id);
    }
    console.log("sortingId:"+sortingId+"subTypeId:"+subTypeId+"sortingName"+sortingList[sortingIndex].typeName+"subTypeName"+$("#subTypeValue").val()+"music_id"+curplay.id);
}

//取历史缓存
function getPlayStorage(){
    var subTypeValue = document.getElementById('subTypeValue');
    var typeName = document.getElementById('typeValue');

    if(localStorage.getItem("sortingId")!=null){
        console.log("读取sortingId缓存成功");
        sortingId = localStorage.getItem("sortingId");
        old_type = sortingId;
    }
    if(localStorage.getItem("sortingIndex")!=null){
        sortingIndex = localStorage.getItem("sortingIndex");
    }
    if(localStorage.getItem("subTypeId")!=null){
        subTypeId = localStorage.getItem("subTypeId");
    }
    if(localStorage.getItem("sortingName")!=null){
        typeName.innerHTML = localStorage.getItem("sortingName");
    }
    if(localStorage.getItem("subTypeName")!=null){
        subTypeValue.innerHTML = localStorage.getItem("subTypeName");
    }
    if(localStorage.getItem("musicId")!=null){
        curplay.id= localStorage.getItem("subTypeName");
    }
}