import { RepeatWrapping, TextureLoader } from "three";
import { useDispatch } from "react-redux";
// import { GLTFLoader } from "three/examples/jsm/Addons.js";

import { MarbleImg, MetalImg, StoneWallImg, SurfaceImg, WoodImg1, WoodImg2, GrassImg, RoofPanelTileImage, RoofRidgeTileImage } from "./TextureSource";
import { loadInitTexture } from "../Redux/Features/Texture/textureSlice";

export const InitiallyAssetsLoad = async () => {
    const dispatch = useDispatch();
    const textureLoader = new TextureLoader();

    try {
        const [surfaceTexture, woodTexture1, woodTexture2, marbleTexture, metalTexture, stoneWallTexture, grassTexture, roofPanelTileTexture, roofRidgeTileTexture] = await Promise.all([
            textureLoader.loadAsync(SurfaceImg),
            textureLoader.loadAsync(WoodImg1),
            textureLoader.loadAsync(WoodImg2),
            textureLoader.loadAsync(MarbleImg),
            textureLoader.loadAsync(MetalImg),
            textureLoader.loadAsync(StoneWallImg),
            textureLoader.loadAsync(GrassImg),
            textureLoader.loadAsync(RoofPanelTileImage),
            textureLoader.loadAsync(RoofRidgeTileImage),
        ]);
        
        dispatch(loadInitTexture({ surfaceTexture, woodTexture1, woodTexture2, marbleTexture, metalTexture, stoneWallTexture, grassTexture, roofPanelTileTexture, roofRidgeTileTexture }));
    } catch (error) {
        console.error('Error loading texture paths: ', error);
    }
};

export const extrudeSettings = (depth, bevelThickness, bevelSize, bevelOffset, bevelSegments) => {
    const setting = {
        steps: 1,
        depth: depth,
        bevelEnabled: true,
        bevelThickness: bevelThickness ?? 0,
        bevelSize: bevelSize ?? 0,
        bevelOffset: bevelOffset ?? 0,
        bevelSegments: bevelSegments ?? 1
    }
    
    return setting;
}

export const getDistanceAndCount = (initDistance, length) => {
    let count, distance = 0;
    
    const tempCount = Math.floor(length / initDistance);
    if (length === tempCount * initDistance) {
        count = tempCount;
        distance = initDistance;
    } else if (length - tempCount * initDistance < initDistance / 2) {
        count = tempCount;
        distance = length / count;
    } else {
        count = tempCount + 1;
        distance = length / count;
    }

    return {
        distance, count
    }
}

export const textureAnisotropy = (gl, texture, repeatX, repeatY, rotate) => {
    if(texture !== null && texture !== undefined){
        texture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 50);
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.rotation = rotate ? rotate : 0;
        texture.repeat.set(repeatX, repeatY);
        texture.needsUpdate = true;
    }
}