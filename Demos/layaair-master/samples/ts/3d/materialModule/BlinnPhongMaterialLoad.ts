class BlinnPhongMaterialLoad {
    private rotation:Laya.Vector3 = new Laya.Vector3(0, 0.01, 0);
    constructor() {
        Laya3D.init(0, 0, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();

        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        var camera: Laya.Camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 0.9, 1.5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.direction = new Laya.Vector3(1, -1, -1);

        var layaMonkey: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.Mesh.load("../../res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm"))) as Laya.MeshSprite3D;
        //加载材质
        layaMonkey.meshRender.material = Laya.StandardMaterial.load("../../res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/Materials/T_Diffuse.lmat");
        layaMonkey.transform.localScale = new Laya.Vector3(0.3, 0.3, 0.3);
        layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);

        Laya.timer.frameLoop(1, this, function (): void {
            layaMonkey.transform.rotate(this.rotation, false);
        });
    }
}
new BlinnPhongMaterialLoad();