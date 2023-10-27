
//创建汽车类 Car
export class Car{
    constructor(model,scene,camera,controls) {
        this.model = model
        this.scene = scene
        this.camera = camera
        this.controls = controls
    }
    //将汽车模型添加到场景中
    init(){
        this.scene.add(this.model)
    }
}