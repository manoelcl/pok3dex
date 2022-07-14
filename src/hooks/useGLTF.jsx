import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const useGLTF = (asset) => {
  const gltf = useLoader(GLTFLoader, asset);

  gltf.scene.traverse((node) => {
    if (node.isMesh || node.isLight) node.castShadow = true;
    if (node.isMesh || node.isLight) node.receiveShadow = true;
  });

  return [gltf];
};

export default useGLTF;
