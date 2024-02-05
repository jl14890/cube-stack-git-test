import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame, useLoader, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrbitControls, Text } from '@react-three/drei'
import { useControls } from 'leva';

import * as THREE from 'three';

import './assets/Span/Fontspring-DEMO-span-light.otf';
import "./App.css"


function CameraFacingText({ position, textContent }) {
  const textRef = useRef();

  useFrame(({ camera }) => {
    textRef.current.lookAt(camera.position);
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={1}
      color={'#000000'} // Text color
    // other Text properties as needed
    >
      {textContent}
    </Text>
  );
}


const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF }); // White material
whiteMaterial.envMapIntensity = 0.5

function GLTFController({ position }) {
  const gltf = useLoader(GLTFLoader, new URL('./assets/ps4.glb', import.meta.url).href);
  const originalMaterials = useRef({});
  const meshRef = useRef();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        originalMaterials.current[child.name] = child.material; // Store original material
        child.material = whiteMaterial; // Apply white material
      }
    });
  }, [gltf.scene]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Adjust rotation speed by changing 0.5
    }
  });

  //handling the hover + material change effect
  const handlePointerOver = (e) => {
    e.object.traverse((child) => {
      if (child.isMesh) {
        child.material = originalMaterials.current[child.name]; // Revert to original material
      }
    });
  };
  const handlePointerOut = (e) => {
    e.object.traverse((child) => {
      if (child.isMesh) {
        child.material = whiteMaterial; // Apply white material
      }
    });
  };


  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

function GLTFCig({ position }) {
  const gltf = useLoader(GLTFLoader, new URL('./assets/cig.glb', import.meta.url).href);
  const originalMaterials = useRef({});
  const meshRef = useRef();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        originalMaterials.current[child.name] = child.material; // Store original material
        child.material = whiteMaterial; // Apply white material
      }
    });
  }, [gltf.scene]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.5; // Adjust rotation speed by changing 0.5
    }
  });

  const handlePointerOver = (e) => {
    e.object.traverse((child) => {
      if (child.isMesh) {
        child.material = originalMaterials.current[child.name]; // Revert to original material
      }
    });
  };

  const handlePointerOut = (e) => {
    e.object.traverse((child) => {
      if (child.isMesh) {
        child.material = whiteMaterial; // Apply white material
      }
    });
  };

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

function GLTFCham({ position }) {
  const gltf = useLoader(GLTFLoader, new URL('./assets/champagne.glb', import.meta.url).href)
  const originalMaterials = useRef({});
  const meshRef = useRef();

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        originalMaterials.current[child.name] = child.material; // Store original material
        child.material = whiteMaterial; // Apply white material
      }
    });
  }, [gltf.scene]);


  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Adjust rotation speed by changing 0.5
    }
  });

  const handlePointerOver = (e) => {
    e.object.traverse((child) => {
      if (child.isMesh) {
        child.material = originalMaterials.current[child.name]; // Revert to original material
      }
    });
  };

  const handlePointerOut = (e) => {
    e.object.traverse((child) => {
      if (child.isMesh) {
        child.material = whiteMaterial; // Apply white material
      }
    });
  };

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

// function GLTFController({ position }) {
//   const gltf = useLoader(GLTFLoader, 'src/assets/ps4.glb')
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.material = whiteMaterial;
//     }
//   });
//   return <primitive object={gltf.scene} position={position} />;
// }

// function GLTFCig({ position }) {
//   const gltf = useLoader(GLTFLoader, 'src/assets/cig.glb')
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.material = whiteMaterial;
//     }

//   });
//   return <primitive object={gltf.scene} position={position} />;
// }

// function GLTFCham({ position }) {
//   const gltf = useLoader(GLTFLoader, 'src/assets/champagne.glb')
//   gltf.scene.traverse((child) => {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.material = whiteMaterial;
//     }
//   });
//   return <primitive object={gltf.scene} position={position} />;
// }






const App = () => {

  const [showCubes, setShowCubes] = useState(true);
  useControls({
    'Show Cubes': {
      value: showCubes,
      onChange: (value) => setShowCubes(value),
    },
  });

  //define a cube
  const Cube = ({ position, args, color }) => {
    const meshRef = useRef();

    useFrame(() => {
      // meshRef.current.rotation.x += 0.01;
      // meshRef.current.rotation.y += 0.001;
    });
    return (
      <mesh position={position} ref={meshRef}>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} wireframe={true} />
      </mesh>
    );
  };


  //define a plane
  const Circle = ({ position, args, color, metalness, roughness }) => {
    const meshRef = useRef();

    return (
      <mesh position={position} ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={args} />
        <meshStandardMaterial
          color={color}
          metalness={metalness} // Adjust metalness here, default is 0.5
          roughness={roughness} // Adjust roughness here, default is 0.5
          envMapIntensity={1} // Control the intensity of the reflection
        />
      </mesh>
    );
  };

  const [cubes, setCubes] = useState([
    { id: 'A', size: 1, color: 'red' },
    { id: 'B', size: 2, color: 'green' },
    { id: 'C', size: 3, color: 'blue' },
  ]);


  const [cubeAPosition, setCubeAPosition] = useState(0);
  const [cubeBPosition, setCubeBPosition] = useState(0);
  const [cubeCPosition, setCubeCPosition] = useState(0);


  useEffect(() => {
    // Find the index of CubeA in the current order
    const cubeAIndex = cubes.findIndex(cube => cube.id === 'A');
    const cubeBIndex = cubes.findIndex(cube => cube.id === 'B');
    const cubeCIndex = cubes.findIndex(cube => cube.id === 'C');

    // Calculate CubeA's Y position based on its current index
    const newPositionA = calculatePosition(cubeAIndex)[1];
    const newPositionB = calculatePosition(cubeBIndex)[1];
    const newPositionC = calculatePosition(cubeCIndex)[1];

    // Update the state with the new Y position
    setCubeAPosition(newPositionA);
    setCubeBPosition(newPositionB);
    setCubeCPosition(newPositionC);

  }, [cubes]); // This effect depends on the 'cubes' state and runs whenever it changes


  const shuffleCubes = () => {

    setCubes(prevCubes => {
      let array = [...prevCubes];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    });
  };


  const calculatePosition = (index) => {
    let yPosition = 0;
    for (let i = 0; i < index; i++) {
      yPosition += cubes[i].size;
    }
    yPosition += cubes[index].size / 2;
    return [0, yPosition, 0];
  };


  const handleMouseClick = (event) => {
    if (event.button === 1) { // Checks if the middle mouse button was clicked
      shuffleCubes();
    }
  };



  return (
    <div>
      <Canvas
        shadows
        gl={{ alpha: true }}
        camera={{ position: [-3, 2, 15], fov: 50 }}>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          target={[0, 1, 0]}
        />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        {/* <Text
          position={[0, 0, -5]} // Adjust 'z' to position the text behind your meshes
          fontSize={1}
          color="white" // Text color
        >
          Your Text Here
        </Text> */}


        {/* wire frame cubes */}
        {showCubes && cubes.map((cube, index) => (
        <Cube
          key={cube.id}
          position={calculatePosition(index)}
          args={[cube.size, cube.size, cube.size]}
          color={cube.color}
        />
      ))}

        {/* <CameraFacingText position={[0,5,0]} textContent={"hello"} /> */}

        <GLTFController position={[0, cubeAPosition, 0]} />
        <GLTFCig position={[0, cubeBPosition, 0]} />
        <GLTFCham position={[0, cubeCPosition, 0]} />

        <Circle
          position={[0, 0, 0]}
          args={[5, 64]}
          color={"white"}
          metalness={0} // Fully metallic
          roughness={1} // Quite smooth
        />

        {/* <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[1]} />
          <meshStandardMaterial color={"skyblue"} />
        </mesh>
         */}

        <Environment
          preset="apartment"
          // background blur={1}
          background={false} />
      </Canvas>
      <div className="text-behind">JOHN LUO<br />PORTRAIT</div>
      <div className="text-front" onClick={shuffleCubes}>SHUFFLE</div>
    </div>
  );

};

export default App;
