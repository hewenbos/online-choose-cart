//引入加载模型构造函数
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//加载模型方法
export function GLTFLoaderManager(path,callback){
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
        path, gltf=>callback(gltf), ()=>{}, error=>{
            throw new Error(error)
        }
    )
}