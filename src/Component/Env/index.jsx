import { Environment, OrbitControls } from "@react-three/drei"
import { ConstProps } from "../../Utils/Constants"

const { height } = ConstProps;

const Env = () => {
    // const envHDR = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })

    return (
        <>
            {/* <Environment preset="park" background backgroundBlurriness={1} ground={{ height: 11, radius: 60, scale: 140 }} /> */}
            <Environment preset="warehouse" background backgroundBlurriness={1} backgroundIntensity={2} />
            <OrbitControls
                target={[0, height / 2, 0]}
                // enablePan={false}
                autoRotate={false}
                dampingFactor={0.2}
                minPolarAngle={0}
                maxPolarAngle={Infinity}
            />
            <directionalLight
                position={[3, 5, 4]}
                intensity={3}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                shadow-camera-far={50}
                shadow-camera-left={-10}
            />
            <directionalLight position={[-3, 5, -4]} intensity={2} />

            <directionalLight position={[4, 0, -6]} intensity={0.02} />
            <directionalLight position={[-4, 0, 6]} intensity={0.02} />
            <directionalLight position={[-4, 0, 6]} intensity={0.02} />
            <directionalLight position={[4, 0, -6]} intensity={0.02} />
        </>
    )
}

export default Env