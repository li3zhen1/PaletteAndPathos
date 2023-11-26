import * as d3 from "d3";
import Color from "color";

export type EmotionKey = "amusement" | "awe" | "contentment" | "excitement" | "anger" | "disgust" | "fear" | "sadness" | "something else";

export const EmotionKeys: EmotionKey[] = ["contentment", "excitement", "anger", "amusement", "awe", "disgust", "fear", "sadness", "something else"];

export type ColorCutKey = "cutBy2_0" | "cutBy2_1" | "cutBy4_0" | "cutBy4_1" | "cutBy4_2" | "cutBy4_3" | "cutBy8_0" | "cutBy8_1" | "cutBy8_2" | "cutBy8_3" | "cutBy8_4" | "cutBy8_5" | "cutBy8_6" | "cutBy8_7";

export type NumericColorCutKey = `${ColorCutKey}_h` | `${ColorCutKey}_s` | `${ColorCutKey}_l` | "h_delta" | "s_delta" | "l_delta" | "r_delta" | "g_delta" | "b_delta";

export const ColorCutKeys: ColorCutKey[] = ["cutBy2_0", "cutBy2_1", "cutBy4_0", "cutBy4_1", "cutBy4_2", "cutBy4_3", "cutBy8_0", "cutBy8_1", "cutBy8_2", "cutBy8_3", "cutBy8_4", "cutBy8_5", "cutBy8_6", "cutBy8_7"];

export const ExtendedColorCutKeys: NumericColorCutKey[] = ColorCutKeys.flatMap(key => [`${key}_h`, `${key}_s`, `${key}_l`]) as any;


export type PCAKey = "pca1" | "pca2" | "pca3";

export const PCAKeys: PCAKey[] = ["pca1", "pca2", "pca3"];

export const emojiMap = new Map<string, string>([
    ["amusement", "🥰"],
    ["awe", "😲"],
    ["contentment", "🥳"],
    ["excitement", "😎"],
    ["anger", "😡"],
    ["disgust", "🤮"],
    ["fear", "😱"],
    ["sadness", "😢"],
    ["something else", "🤔"],
]);

export const getEmoji = (key: string) => {
    const emoji = emojiMap.get(key);
    if (emoji) {
        return emoji;
    }
    switch (key[0]) {
        case "r":
            return "🔴";
        case "g":
            return "🟢";
        case "b":
            return "🔵";
        case "h":
            return "🎨";
        case "s":
            return "🌈";
        case "l":
            return "💡";
    }
    return "";
}

export const describeKey = (key: string) => {
    if (key.endsWith("_delta")) {
        switch (key[0]) {
            case "r":
                return "Delta Red";
            case "g":
                return "Delta Green";
            case "b":
                return "Delta Blue";
            case "h":
                return "Delta Hue";
            case "s":
                return "Delta Saturation";
            case "l":
                return "Delta Lightness";

        }
    }
    return key[0].toUpperCase() + key.slice(1);
};


    export type ImageEmotionAndColorCutData = {
        ObjectID: string;
        category: string;
        amusement: number;
        awe: number;
        contentment: number;
        excitement: number;
        anger: number;
        disgust: number;
        fear: number;
        sadness: number;
        "something else": number;
        cutBy2_0: string;
        cutBy2_1: string;
        cutBy4_0: string;
        cutBy4_1: string;
        cutBy4_2: string;
        cutBy4_3: string;
        cutBy8_0: string;
        cutBy8_1: string;
        cutBy8_2: string;
        cutBy8_3: string;
        cutBy8_4: string;
        cutBy8_5: string;
        cutBy8_6: string;
        cutBy8_7: string;

        pca1: number;
        pca2: number;
        pca3: number;
    } & {
            [key in NumericColorCutKey]: number;
        };


    let dataCache: ImageEmotionAndColorCutData[] | null = null;

    export async function loadData(normalize = false): Promise<ImageEmotionAndColorCutData[]> {
        if (dataCache) {
            return dataCache;
        }

        const data = await d3.csv("final.csv");
        const _data = data.map(
            (d) =>
            ({
                ObjectID: d.ObjectID,
                category: d.Folder_Name,
                amusement: +d.amusement,
                awe: +d.awe,
                contentment: +d.contentment,
                excitement: +d.excitement,
                anger: +d.anger,
                disgust: +d.disgust,
                fear: +d.fear,
                sadness: +d.sadness,
                "something else": +d["something else"],
                cutBy2_0: d.cutBy2_0,
                cutBy2_1: d.cutBy2_1,
                cutBy4_0: d.cutBy4_0,
                cutBy4_1: d.cutBy4_1,
                cutBy4_2: d.cutBy4_2,
                cutBy4_3: d.cutBy4_3,
                cutBy8_0: d.cutBy8_0,
                cutBy8_1: d.cutBy8_1,
                cutBy8_2: d.cutBy8_2,
                cutBy8_3: d.cutBy8_3,
                cutBy8_4: d.cutBy8_4,
                cutBy8_5: d.cutBy8_5,
                cutBy8_6: d.cutBy8_6,
                cutBy8_7: d.cutBy8_7,
                pca1: +d.pca1,
                pca2: +d.pca2,
                pca3: +d.pca3,
            } as ImageEmotionAndColorCutData)
        );
        // console.log(_data[0])

        // for (const colorCutKey of ColorCutKeys) {
        _data.forEach(d => {
            const colors = ColorCutKeys.filter(it => it.startsWith("cutBy8")).map(key => {
                const hexVal = "#" + d[key]
                const col = Color(hexVal)
                return [...col.hsl().array(), ...col.rgb().array()];
            });
            // const [h, s, l] = Color(color).hsl().array();
            // @ts-ignore
            d["h_delta"] = d3.max(colors, it => it[0]) - d3.min(colors, it => it[0]);
            // @ts-ignore
            d["s_delta"] = d3.max(colors, it => it[1]) - d3.min(colors, it => it[1]);
            // @ts-ignore
            d["l_delta"] = d3.max(colors, it => it[2]) - d3.min(colors, it => it[2]);

            // @ts-ignore
            d["r_delta"] = d3.max(colors, it => it[3]) - d3.min(colors, it => it[3]);
            // @ts-ignore
            d["g_delta"] = d3.max(colors, it => it[4]) - d3.min(colors, it => it[4]);
            // @ts-ignore
            d["b_delta"] = d3.max(colors, it => it[5]) - d3.min(colors, it => it[5]);
        })
        // }


        if (normalize) {
            const normalizedCols = [
                "amusement", "awe", "contentment", "excitement", "anger",
                "disgust", "fear", "sadness", "something else",
                "h_delta", "s_delta", "l_delta",
                "r_delta", "g_delta", "b_delta",
            ] as const;
            for (const col of normalizedCols) {
                const min = d3.min(_data, (d) => d[col])!;
                const max = d3.max(_data, (d) => d[col])!;
                for (const d of _data) {
                    d[col] = (d[col] - min) / (max - min);
                }
            }
            dataCache = _data;
        }
        return _data;
    }
