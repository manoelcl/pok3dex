import "./App.css";
import Pokeball from "./components/Pokeball";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DoubleSide, Fog } from "three";
import usePokemon from "./hooks/usePokemon";

function App() {
  const { currentPokemon, nextPokemon, previousPokemon } = usePokemon();

  return (
    <div className="App">
      <h1>Pok3Dex</h1>
      <h2>
        {"# " + currentPokemon?.order || "No number"}{" "}
        {currentPokemon?.species?.name || "No name available"}
      </h2>
      <button onClick={previousPokemon} className="previous">
        Previous
      </button>
      <button onClick={nextPokemon} className="next">
        Next
      </button>
      <div className="canvas">
        <Canvas
          camera={{ fov: 75, position: [0, 0, 3] }}
          style={{ backgroundImage: "linear-gradient( hotpink, white)" }}
          shadows
        >
          {/* <Suspense fallback={false}></Suspense> */}

          <fog attach="fog" color={"#ffeeee"} near={1.5} far={25}></fog>
          <ambientLight intensity={0.1} />
          <pointLight intensity={1} position={[-3, 1, -0.5]} color={"cyan"} />
          <pointLight intensity={0.75} position={[0, 0, 2]} color={"white"} />
          <pointLight intensity={1} position={[3, 1, -0.5]} color={"hotpink"} />
          <directionalLight
            castShadow
            position={[0, 3, 1]}
            color={"#ffffff"}
            intensity={1.5}
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadow-camera-left={-2}
            shadow-camera-right={2}
            shadow-camera-bottom={-2}
            shadow-camera-top={2}
            shadow-bias={-0.0002}
          />
          {currentPokemon ? (
            <Pokeball pokemon={currentPokemon} position={[0, 0, 0]} />
          ) : null}

          <mesh
            receiveShadow
            scale={[1, 1, 1]}
            rotation={[-90, 0, 0]}
            position={[0, -2, 0]}
          >
            <circleGeometry args={[50, 32]} />
            <meshStandardMaterial color={"#00ff11"} side={DoubleSide} />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
