function onload() {
    adddiv();
}

function adddiv() {  //循环添加子分类
    var st = document.getElementById('st');

    var str = '';

    for (var i = 0; i < 4; i++) {
        str += '<div class="types">' +
            '<div class="stypes">' +
            '<div data-id="1" class="energy">' +
            '<image src="image/fm/music_icon.png" />' +
            '<text>活力早晨</text>' +
            '</div>' +
            '</div>' +
            '<div class="stypes">' +
            '<div data-id="1" class="energy">' +
            '<image src="image/fm/music_icon.png" />' +
            '<text>活力早晨</text>' +
            '</div>' +
            '</div>' +
            '<div class="stypes">' +
            '<div data-id="1" class="energy">' +
            '<image src="image/fm/music_icon.png" />' +
            '<text>活力早晨</text>' +
            '</div>' +
            '</div>' +
            '<div class="stypes">' +
            '<div data-id="1" class="energy">' +
            '<image src="image/fm/music_icon.png" />' +
            '<text>活力早晨</text>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
    st.innerHTML = str;
}
