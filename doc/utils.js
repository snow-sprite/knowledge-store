// 将长字符转为短字符
function (content) {
    var ele = '<div>' + content +'</div>';
    var text = $(ele).text();
    var len = text.split('').length;
    // 判断字符
    for (var i = 0; i < len; i++) {
        let singleStr = text.charAt(i);
        if (singleStr.match(/[^X00-XFF]/g) !== null) {
            len = text.replace(/[^X00-XFF]/g, 'xx').length;
        }
    }
    if (len > 400) {
        return true;
    }
    return false;
};
