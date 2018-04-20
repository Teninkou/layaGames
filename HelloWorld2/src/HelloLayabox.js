//初始化舞台
/*发光滤镜 阴影滤镜等需要webgl*/
Laya.init(1334, 750, Laya.WebGL);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//需要切换的图片资源路径
this.t1 = "res/img/t1.jpg";
this.zm = "res/img/zm.jpg";
this.zm2 = "res/img/zm2.jpg";
// 建立容器
var img = new Laya.Sprite();
//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换图片
this.img.on(Laya.Event.CLICK, this, putinImg);
//添加到舞台
Laya.stage.addChild(img);
this.flag = true;
/*初始化图片显示*/
putinImg();
// 加载图片
function putinImg(p) {
    // console.log(p)
    //清空图片
    this.img.graphics.clear();
    //获得要切换的图片资源路径
    var imgUrl = (this.flag = !this.flag) ? this.zm2 : this.t1;
    this.img.filters = [null];/*保证filter不为undefined*/
    if (!this.flag) {
        creteRedFilter(this.img);
        createGlowFilter(this.img)
        // addMask(this.img)
    } else {
        this.img.mask = null;
        // creteRedFilter(this.img);
        // createShadeFilter(this.img)
        createBlurFilter(this.img)
    }
    //加载显示图片，坐标位于50,50
    this.img.loadImage(imgUrl, 50, 50, 250, 250);
}

function addMask(img) {
    //创建遮罩对象
    var cMask = new Laya.Sprite();
    //画一个圆形的遮罩区域
    var radius = 75;/*x,y也设置为半径，因为遮罩的坐标为中心点*/
    cMask.graphics.drawCircle(radius, radius, radius, "#FFFFFF");
    //移动到圆形所在的位置坐标
    cMask.pos(50, 50);
    //实现img显示对象的遮罩效果
    img.mask = cMask;
}

/**创建红色滤镜位图**/
function creteRedFilter(img) {
    //颜色滤镜矩阵,红色
    var colorMatrix =
        [
            0, 0, 0, 0, 0, //R
            0, 0, 0, 0, 0, //G
            1, 0, 0, 0, 0, //B
            0, 0, 0, 1, 0, //A
        ];
    //创建红色颜色滤镜
    var redFilter = new Laya.ColorFilter(colorMatrix);
    //添加红色颜色滤镜效果
    var glowFilter = img.filters[1];
    img.filters = [redFilter];
    // img.filters = glowFilter ? [redFilter, glowFilter] : [glowFilter];
}
/**创建发光滤镜位图**/
function createGlowFilter(img) {
    //创建发光滤镜位图
    var glowFilter = new Laya.GlowFilter("#00ff00", 7, 0, 0);
    //添加发光滤镜
    var redFilter = img.filters[0];
    img.filters = redFilter ? [redFilter, glowFilter] : [glowFilter];
}
/**创建阴影滤镜位图**/
function createShadeFilter(img) {
    //创建阴影滤镜
    var glowFilter = new Laya.GlowFilter("#000000", 8, 8, 8);
    //添加阴影滤镜
    var redFilter = img.filters[0];
    img.filters = redFilter ? [redFilter, glowFilter] : [glowFilter];
}

/**创建糊滤滤镜位图**/
function createBlurFilter(img) {
    //创建模糊滤镜实例
    var blurFilter = new Laya.BlurFilter();
    //设置模糊强度
    blurFilter.strength = 5;
    //添加滤镜效果
    img.filters = [blurFilter];
}