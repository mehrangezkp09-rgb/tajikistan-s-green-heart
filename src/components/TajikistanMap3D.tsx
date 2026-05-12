import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Sky, Cloud, Clouds } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

type Hotspot = {
  id: string;
  position: [number, number, number];
  title: string;
  desc: string;
  color: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "pamir",
    position: [-3.2, 2.4, -1.5],
    title: "Памир",
    desc: "«Крыша мира». Тающие ледники — индикатор климатического кризиса.",
    color: "#7dd3fc",
  },
  {
    id: "fann",
    position: [-0.8, 1.8, 1.2],
    title: "Фанские горы",
    desc: "Бирюзовые озёра под угрозой загрязнения от туризма.",
    color: "#86efac",
  },
  {
    id: "tigrovaya",
    position: [2.4, 0.6, 2.2],
    title: "Тигровая балка",
    desc: "Уникальный тугайный лес — дом бухарского оленя.",
    color: "#fde68a",
  },
  {
    id: "vakhsh",
    position: [3.2, 0.4, -0.8],
    title: "Долина Вахша",
    desc: "Крупнейшая река: гидроэнергия и экологический баланс.",
    color: "#a5b4fc",
  },
];

function Terrain({ onPick }: { onPick: (h: Hotspot) => void }) {
  const noise2D = useMemo(() => createNoise2D(() => 0.42), []);
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(14, 10, 120, 90);
    const pos = geo.attributes.position;
    const colors: number[] = [];
    const cLow = new THREE.Color("#3a6b4a");
    const cMid = new THREE.Color("#7aa86b");
    const cHigh = new THREE.Color("#e8efe5");
    const cWater = new THREE.Color("#1a3a5c");
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      let h =
        noise2D(x * 0.18, y * 0.18) * 1.4 +
        noise2D(x * 0.45, y * 0.45) * 0.4 +
        noise2D(x * 1.0, y * 1.0) * 0.12;
      // valley/river along x
      const river = Math.exp(-Math.pow(y - 0.2 + Math.sin(x * 0.6) * 0.6, 2) * 1.4);
      h -= river * 0.9;
      pos.setZ(i, h);
      const c = new THREE.Color();
      if (h < -0.2) c.copy(cWater);
      else if (h < 0.5) c.copy(cLow);
      else if (h < 1.4) c.copy(cMid);
      else c.copy(cHigh);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [noise2D]);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial vertexColors flatShading roughness={0.95} metalness={0.02} />
      </mesh>
      {HOTSPOTS.map((h) => (
        <Hotspot3D key={h.id} h={h} onPick={onPick} />
      ))}
      <Trees noise2D={noise2D} />
    </group>
  );
}

function Trees({ noise2D }: { noise2D: (x: number, y: number) => number }) {
  const items = useMemo(() => {
    const list: { p: [number, number, number]; s: number }[] = [];
    for (let i = 0; i < 90; i++) {
      const x = (Math.random() - 0.5) * 13;
      const y = (Math.random() - 0.5) * 9;
      const h =
        noise2D(x * 0.18, y * 0.18) * 1.4 +
        noise2D(x * 0.45, y * 0.45) * 0.4;
      if (h > 0.4 && h < 1.3) {
        list.push({ p: [x, y, h], s: 0.3 + Math.random() * 0.4 });
      }
    }
    return list;
  }, [noise2D]);
  return (
    <>
      {items.map((t, i) => (
        <group key={i} position={t.p}>
          <mesh position={[0, 0, t.s * 0.5]}>
            <cylinderGeometry args={[0.04, 0.06, t.s, 6]} />
            <meshStandardMaterial color="#5a3a22" />
          </mesh>
          <mesh position={[0, 0, t.s * 1.1]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[t.s * 0.45, t.s * 1.1, 7]} />
            <meshStandardMaterial color="#3f7a48" flatShading />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Hotspot3D({ h, onPick }: { h: Hotspot; onPick: (h: Hotspot) => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.z = h.position[2] + Math.sin(t * 2 + h.position[0]) * 0.08 + 0.4;
    }
  });
  return (
    <group position={h.position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onPick(h);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "";
        }}
        scale={hover ? 1.4 : 1}
      >
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={h.color}
          emissive={h.color}
          emissiveIntensity={hover ? 1.6 : 0.9}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[0.25, 0.32, 32]} />
        <meshBasicMaterial color={h.color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[0, 0, 0.6]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider whitespace-nowrap glass text-foreground">
          {h.title}
        </div>
      </Html>
    </group>
  );
}

function CloudsLayer() {
  return (
    <Clouds material={THREE.MeshBasicMaterial}>
      <Cloud seed={1} segments={20} bounds={[8, 1, 4]} volume={5} color="#e8f0e6" position={[0, 5, 0]} opacity={0.35} />
      <Cloud seed={2} segments={16} bounds={[6, 1, 3]} volume={4} color="#cfe0c8" position={[3, 4, -2]} opacity={0.25} />
    </Clouds>
  );
}

export function TajikistanMap3D() {
  const [active, setActive] = useState<Hotspot | null>(null);
  return (
    <div className="relative w-full h-[78vh] min-h-[520px] rounded-3xl overflow-hidden glass grain">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [6, 6, 8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0e1f17"]} />
        <fog attach="fog" args={["#0e1f17", 14, 30]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={2.2}
          color="#ffe6b8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <hemisphereLight args={["#a8d5a0", "#1b2e1f", 0.6]} />
        <Suspense fallback={null}>
          <Terrain onPick={setActive} />
          <CloudsLayer />
          <Sky distance={450} sunPosition={[10, 4, 6]} inclination={0.5} azimuth={0.25} turbidity={6} rayleigh={2} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>

      <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2 text-xs text-muted-foreground">
        Вращайте • Колесо для зума • Нажмите на маркер
      </div>

      {active && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm glass rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <span className="h-2 w-2 rounded-full" style={{ background: active.color }} />
            Зона интереса
          </div>
          <h3 className="mt-1 text-2xl font-display">{active.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{active.desc}</p>
          <button
            onClick={() => setActive(null)}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}
