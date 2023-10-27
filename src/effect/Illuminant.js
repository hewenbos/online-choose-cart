import * as THREE  from 'three'

export class Illuminant{
    constructor(scene) {
        this.scene = scene
        // 平行光的坐标位置
        this.dirPosList = [
            [0, 5, 10],
            [-10, 5, 0],
            [0, 5, -10],
            [10, 5, 0]
        ]

        this.createParallelLight()

    }

    //创建平行光
    createParallelLight(){
        this.dirPosList.forEach(item=>{
            // 从上方照射的白色平行光，强度为 0.5。
            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            //设置平行光偏移位置
            directionalLight.position.set(...item)

            //将平行光添加到场景中
            this.scene.add(directionalLight)
        })
    }

}