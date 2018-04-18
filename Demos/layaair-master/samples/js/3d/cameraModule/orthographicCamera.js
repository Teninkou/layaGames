Laya3D.init(1024, 768, true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

/**
* (pos.x pos.y) 屏幕位置
*  pos.z 深度取值范围(-1,1);
* */
var pos = new Laya.Vector3(310,500,0);
var _translate = new Laya.Vector3(0, 0, 0);

var dialog = Laya.stage.addChild(new Laya.Image("../../res/cartoon2/background.jpg"));

var scene = Laya.stage.addChild(new Laya.Scene());

var camera = scene.addChild(new Laya.Camera(0, 0.1, 1000));
camera.transform.rotate(new Laya.Vector3(-45, 0, 0), false, false);
camera.transform.translate(new Laya.Vector3(5, -10, 500));
camera.orthographic = true;
//正交投影垂直矩阵尺寸
camera.orthographicVerticalSize = 10;

var directionLight = scene.addChild(new Laya.DirectionLight());

var layaMonkey = scene.addChild(Laya.Sprite3D.load("../../res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"));
layaMonkey.once(Laya.Event.HIERARCHY_LOADED, this, function () {

    layaMonkey.transform.localScale = new Laya.Vector3(3, 3, 3);
				//转换2D屏幕坐标系统到3D正交投影下的坐标系统
    camera.convertScreenCoordToOrthographicCoord(pos, _translate);
    layaMonkey.transform.position = _translate;
				
	Laya.stage.on(Laya.Event.RESIZE, null, function() {
        camera.convertScreenCoordToOrthographicCoord(pos, _translate);
		layaMonkey.transform.position = _translate;
    });
});

