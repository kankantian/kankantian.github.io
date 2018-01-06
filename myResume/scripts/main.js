//事件加载函数
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    } else {
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
//动态绘制弧形
function canvas(id,point,wid){
    //获取canvas对象
    var canvas = document.getElementById(id);
    //设置宽度及绘制半径
    //alert(canvas.offsetWidth);
    var canwidth = canvas.offsetWidth;
    var radius = canvas.offsetWidth/2 - 10;
    var angle=0;
    var draw = function(angle){
        var rad = angle*Math.PI/180;   //canvas绘制圆形进度
        //检测浏览器是否支持canvas对象
        if(canvas.getContext){
            //获取对应的canvas 2d对象
            var ctx = canvas.getContext("2d");
            var arc = {
                x:canwidth/2,
                y:canwidth/2,
                r:radius
            }

            ctx.beginPath();
            ctx.clearRect(0,0,canwidth,canwidth);
            ctx.strokeStyle="#F1652A";
            ctx.lineWidth=wid;
            ctx.arc(arc.x, arc.y, arc.r, 0, rad, false);
            ctx.stroke();
        }
    }
    //定时器实现动态绘制
    var time = setInterval(function(){
            angle+=4;
            draw(angle);
            if(angle>point*360){
                clearInterval(time);
            }
     },20);
}

//百分比转换为小数
function toPoint(percent){
    var str=percent.replace("%","");
    str= str/100;
    return str;
}
//获取技能得分百分比
function getPercent(){
    var percents = document.getElementsByClassName("percent");
    for(var i=0;i<percents.length;i++){
        function getViewPort(){
            var viewHeight=window.innerHeight||document.documentElement.clientHeight;
            var viewWidth=window.innerWidth||document.documentElement.clientWidth;
            // console.log(viewHeight,viewWidth);
            if(system.iphone){
                //document.body.style.width=viewWidth;
                document.getElementsByTagName('canvas')[i].width=viewWidth/4;
                document.getElementsByTagName('canvas')[i].height=viewWidth/4;
                var id = document.getElementsByTagName("canvas")[i].getAttribute("id"); //获取相应canvas的id属性
                var point = toPoint(percents[i].childNodes[0].nodeValue); //获取相应技能的百分比数据
                canvas(id,point,5);
            }
            if(system.win){
                document.getElementsByTagName('canvas')[i].width=160;
                document.getElementsByTagName('canvas')[i].height=160;
                var id = document.getElementsByTagName("canvas")[i].getAttribute("id"); //获取相应canvas的id属性
                var point = toPoint(percents[i].childNodes[0].nodeValue); //获取相应技能的百分比数据
                canvas(id,point,10);
            }
            if(system.android){
                //document.body.style.width=viewWidth;
                document.getElementsByTagName('canvas')[i].width=viewWidth/4;
                document.getElementsByTagName('canvas')[i].height=viewWidth/4;
                var id = document.getElementsByTagName("canvas")[i].getAttribute("id"); //获取相应canvas的id属性
                var point = toPoint(percents[i].childNodes[0].nodeValue); //获取相应技能的百分比数据
                canvas(id,point,5);
            }
        }


        getViewPort();

    }
}
/* 识别移动设备
 * 检测相应的设备*/
var ua=navigator.userAgent;
var system={
    win:false,
    mac:false,
    x11:false,
    //mobile
    iphone:false,
    ipad:false,
    ios:false,
    android:false,
    winMobile:false
};

var p=navigator.platform;
system.win=p.indexOf('Win')==0;
system.mac=p.indexOf('Mac')==0;
system.x11=(p=='x11')||(p.indexOf('Linux')==0);

system.iphone=ua.indexOf('iPhone')>-1;
system.ipad=ua.indexOf('iPad')>-1;
system.android=ua.indexOf('Android')>-1;

//图片预加载
(function () {
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    /**
     * @param imgList 要加载的图片地址列表，['aa/asd.png','aa/xxx.png']
     * @param callback 每成功加载一个图片之后的回调，并传入“已加载的图片总数/要加载的图片总数”表示进度
     * @param timeout 每个图片加载的超时时间，默认为5s
     */
    var loader = function (imgList, callback, timeout) {
        timeout = timeout || 5000;
        imgList = isArray(imgList) && imgList || [];
        callback = typeof(callback) === 'function' && callback;

        var total = imgList.length,
            loaded = 0,
            imgages = [],
            _on = function () {
                loaded < total && (++loaded, callback && callback(loaded / total));
            };

        if (!total) {
            return callback && callback(1);
        }

        for (var i = 0; i < total; i++) {
            imgages[i] = new Image();
            imgages[i].onload = imgages[i].onerror = _on;
            imgages[i].src = imgList[i];
        }

        /**
         * 如果timeout * total时间范围内，仍有图片未加载出来（判断条件是loaded < total），通知外部环境所有图片均已加载
         * 目的是避免用户等待时间过长
         */
        setTimeout(function () {
            loaded < total && (loaded = total, callback && callback(loaded / total));
        }, timeout * total);

    };

    "function" === typeof define && define.cmd ? define(function () {
        return loader
    }) : window.imgLoader = loader;
})();

imgLoader(['../images/bg.png','../images/photo1.jpg'], function(percentage){
    console.log(percentage)
});


getPercent();
