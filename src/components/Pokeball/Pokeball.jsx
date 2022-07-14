import React, { useEffect, useRef, useState } from "react";

import { useFrame } from "@react-three/fiber";
import {
  AnimationMixer,
  DoubleSide,
  LoopOnce,
  NearestFilter,
  TextureLoader,
} from "three";
import useGLTF from "../../hooks/useGLTF";

const ERROR_DITTO =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png";

export const Pokeball = (props) => {
  const [gltf] = useGLTF("pokeball_anim.gltf");
  //Please, consider purchasing this 3D model if you want to use it for another purpose
  //Available at https://skfb.ly/owppr
  const textureLoader = new TextureLoader();
  textureLoader.crossOrigin = "Anonymous";
  console.log("pokemon", props.pokemon);
  const texture = textureLoader.load(
    props.pokemon ? props.pokemon.sprites.front_default : ERROR_DITTO
  );
  texture.magFilter = NearestFilter;
  const pokeball = useRef();

  const [active, setActive] = useState(true);

  let mixer;
  mixer = new AnimationMixer(gltf.scene);

  useEffect(() => {
    if (gltf.animations.length && active) {
      gltf.animations.forEach((animationClip) => {
        const animation = mixer.clipAction(animationClip);
        console.log(animation.time);
        animation.setLoop(LoopOnce);
        animation.clampWhenFinished = true;
        animation.timeScale = 1;
        animation.play();
      });
    }
    if (gltf.animations.length && !active) {
      gltf.animations.forEach((animationClip) => {
        const animation = mixer.clipAction(animationClip);
        console.log(animation.time);
        animation.time = animation.getClip().duration - animation.time;
        animation.setLoop(LoopOnce);
        animation.clampWhenFinished = true;
        animation.timeScale = -1;
        animation.play();
      });
    }
  }, [active]);
  useFrame(({ clock }, delta) => {
    pokeball.current.rotation.y = 0.1 * Math.sin(clock.getElapsedTime());
    pokeball.current.position.y =
      props.position[1] + 0.1 * Math.sin(clock.getElapsedTime());
    mixer?.update(delta);
  });
  return (
    <group {...props} ref={pokeball}>
      <mesh
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        castShadow
        receiveShadow
        onClick={(event) => setActive(!active)}
      >
        <primitive object={gltf.scene} />
        <shadowMaterial />
      </mesh>
      <mesh receiveShadow>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial map={texture} alphaTest={0.5} side={DoubleSide} />
      </mesh>
    </group>
  );
};
