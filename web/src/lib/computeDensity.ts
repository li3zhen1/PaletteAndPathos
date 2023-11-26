import * as d3 from "d3";
import type { ImageEmotionAndColorCutData, EmotionKey, PCAKey } from "./EmotionAndColorCutData";

export async function loadPrecomputedDensity(x: EmotionKey|PCAKey, y: EmotionKey|PCAKey) {
    const response = await fetch(`/${x}_${y}.json`);
    const data = await response.json();
    return data;
}

export function computeDensity(
    data: ImageEmotionAndColorCutData[],
    _size: [number, number], 
    _axis: [EmotionKey | PCAKey, EmotionKey | PCAKey]
) {
    const [width, height] = _size;

    const desityScale = (300 * 300) / (width * height);

    // normalize to 0-1
    const _data = data
        .filter((it) => it.category === "Moma")
        .map((d) => {
            return [d[_axis[0]] * width, height * (1 - d[_axis[1]])] as [
                number,
                number,
            ];
        });

    const __data = data
        .filter((it) => it.category !== "Moma")
        .map((d) => {
            return [d[_axis[0]] * width, height * (1 - d[_axis[1]])] as [
                number,
                number,
            ];
        });

    const density = d3
        .contourDensity()
        .x((d) => d[0])
        .y((d) => d[1])
        .bandwidth(10)
        .size([width, height])
        .thresholds(
            [
                0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.0012,
                0.016, 0.032, 0.048, 0.064, 0.096, 0.128,
            ].map((it) => it * desityScale),
        )(_data);

    const _density = d3
        .contourDensity()
        .x((d) => d[0])
        .y((d) => d[1])
        .bandwidth(5)
        .size([width, height])
        .thresholds(
            [0.5, 1.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0].map(
                (it) => it * desityScale,
            ),
        )(
        // .bandwidth(10)
        __data,
    );

    return {
        moma: { density },
        wiki: { density: _density },
        width: width,
        height: height,
    };
}