//引入threeJs
import * as THREE from 'three'
//创建 场景、摄像机 、 渲染器 、 轨道控制器 全局变量
let scene , camera , renderer , controls
//引入加载模型方法
import {GLTFLoaderManager} from '../model/loadManager.js'
//映入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//导入汽车类
import {Car} from '../model/Car.js'
//导入光源类s
import {Illuminant} from '../effect/Illuminant.js'

//获取要渲染的dom
const app = document.querySelector('.app')
//初始化场景
function init(){
    //创建场景
    scene = new THREE.Scene()

    //创建摄像机
    camera = new THREE.PerspectiveCamera(75, app.clientWidth/app.clientHeight , 0.1,1000)
    //设置摄像机初始位置
    camera.position.z = 5

    //创建渲染器
    renderer = new THREE.WebGLRenderer({
        //设置抗锯齿
        antialias:true
    })

    //允许在场景中使用阴影贴图
    renderer.shadowMap.enabled = true

    //设置渲染器大小
    renderer.setSize(app.clientWidth,app.clientHeight)

    //调用加载模型方法
    GLTFLoaderManager('glb/Lamborghini.glb',(gltf)=>{
        const model = gltf.scene

        //实例化汽车类
        const car =    new Car(model,scene)
        //调用init方法
        car.init()
        //实例化光源类
        new Illuminant(scene)
    })

    //将渲染器添加到dom上
    app.appendChild(renderer.domElement)
}

//初始化轨道控制器
function createControls(){
    //创建轨道控制器
    controls = new OrbitControls(camera,renderer.domElement)

    //开启阻尼效果
    controls.enableDamping = true
}

//初始化坐标轴
function createHelper(){
    //创建坐标轴
    const axes = new THREE.AxesHelper(5)
    //将坐标轴添加到场景中
    scene.add(axes)
}


//窗口适配
function resizeRender(){
    window.addEventListener('resize',()=>{
        renderer.setSize(app.clientWidth,app.clientHeight)
        camera.aspect=app.clientWidth/app.clientHeight
        camera.updateProjectionMatrix()
    })
}

//循环渲染
function  renderLoop(){
    renderer.render(scene,camera)
    controls.update()
    requestAnimationFrame(renderLoop)
}

//开始方法
function start(){
    init()
    createControls()
    createHelper()
    resizeRender()
    renderLoop()
}
start()

