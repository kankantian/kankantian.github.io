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




getPercent();
