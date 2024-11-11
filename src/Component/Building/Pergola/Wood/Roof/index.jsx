/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react'

import { getDistanceAndCount } from '../../../../../Utils/Function';
import { ConstProps, ConstWoodPergolaProps } from '../../../../../Utils/Constants';
import { TrussModel, RectModel } from '../CommonModel';

const { width, length, height, pitch, overhang, freeOverhang, roofAlpha } = ConstProps;
const { roofBowHeight, pillarSize } = ConstWoodPergolaProps;

const Roof = () => {

    const RectTrussInfoArr_1 = useMemo(() => {
        const { distance, count } = getDistanceAndCount(0.4, width);
        const modelSize = 0.05

        let data = [];
        new Array(count + 1).fill("").forEach((_, index) => {
            data.push({
                width: 0.05,
                length: 0.05,
                height: length + overhang + freeOverhang,
                pos_x: distance * index - width / 2,
                pos_y: width / 2 *  Math.tan(roofAlpha) + roofBowHeight + modelSize * 2,
                pos_z: 0,
                alpha: [roofAlpha, 0, 0]
            })
        })

        return data
    }, [])

    const RectTrussInfoArr_2 = useMemo(() => {
        let data = [];
        const offset = 0.01;

        new Array(2).fill("").forEach((_, index) => {            
            data.push({
                width: pillarSize,
                length: roofBowHeight,
                height: length,
                pos_x: (width / 2 - pillarSize / 2) * Math.pow(-1, index),
                pos_y: pillarSize + roofBowHeight / 3 - offset,
                pos_z: 0,
                alpha: [roofAlpha, 0, 0]
            })
        })
        new Array(2).fill("").forEach((_, index) => {            
            data.push({
                width: pillarSize,
                length: roofBowHeight,
                height: width - pillarSize * 2,
                pos_x: 0,
                pos_y: index === 0 ? -roofBowHeight / 2 + offset : length / 2 * pitch / 12 + roofBowHeight / 2 - offset,
                pos_z: (length / 2 - pillarSize / 2) * Math.pow(-1, index),
                alpha: [0, Math.PI / 2, 0]
            })
        })

        return data;
    }, [])

    const TrussInfoArr_1 = useMemo(() => {
        const { distance, count } = getDistanceAndCount(0.6, length);

        let data = [];
        new Array(count + 1).fill("").forEach((_, index) => {
            data.push({
                pos_y: (length * pitch / 12) / count * (count - index) + roofBowHeight / 4 * 3,
                pos_z: distance * index - length / 2,
            })
        })

        return data
    }, [])

    const TrussInfoArr_2 = useMemo(() => {
        const distance = 0.3;
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_x: (width / 2 - distance * index_j) * Math.pow(-1, index_i + 1),
                    pos_y: length / 2 *  Math.tan(roofAlpha),
                    alpha_local: [roofAlpha, 0, 0],
                    alpha_global: [0, Math.PI / 2, 0]
                })
            })
        })

        return data;
    }, [])

    const TrussInfoArr_3 = useMemo(() => {
        const distance = 0.3;
        let data = [];

        new Array(2).fill("").forEach((_, index_i) => {
            new Array(2).fill("").forEach((_, index_j) => {
                data.push({
                    pos_y: (length / 2 - distance * index_j) *  Math.tan(roofAlpha) * (index_i === 0 ? 1 : -1),
                    pos_z: (length / 2 - distance * index_j) * Math.pow(-1, index_i + 1),
                })
            })
        })

        return data;
    }, [])
    
    return (
        <group position={[0, height, 0]}>
            {RectTrussInfoArr_1.map((item, index) => <RectModel key={`rect-top-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.alpha} />)}
            {RectTrussInfoArr_2.map((item, index) => <RectModel key={`rect-edge-model-${index}`} modelSize={[item.width, item.length, item.height]} position={[item.pos_x, item.pos_y, item.pos_z]} rotation_1={item.alpha} />)}
            {TrussInfoArr_1.map((item, index) => <TrussModel key={`hor-rail-model-${index}`} modelLength={width} position={[0, item.pos_y, item.pos_z]} />)}
            {TrussInfoArr_2.map((item, index) => <TrussModel key={`ver-rail-model-${index}`} modelLength={length} position={[item.pos_x, item.pos_y, 0]} rotation_1={item.alpha_local} rotation_2={item.alpha_global} />)}
            {TrussInfoArr_3.map((item, index) => <TrussModel key={`hor-rail-model-${index}`} modelLength={width} position={[0, item.pos_y, item.pos_z]} />)}
        </group>
    )
}

export default Roof