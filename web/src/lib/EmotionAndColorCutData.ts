import * as d3 from "d3";

export type EmotionKey = "amusement" | "awe" | "contentment" | "excitement" | "anger" | "disgust" | "fear" | "sadness" | "something else";

export type ColorCutKey = "cutBy2_0" | "cutBy2_1" | "cutBy4_0" | "cutBy4_1" | "cutBy4_2" | "cutBy4_3" | "cutBy8_0" | "cutBy8_1" | "cutBy8_2" | "cutBy8_3" | "cutBy8_4" | "cutBy8_5" | "cutBy8_6" | "cutBy8_7";

export type PCAKey = "pca1" | "pca2" | "pca3";

export interface ImageEmotionAndColorCutData {
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
    cutBy2_0: number;
    cutBy2_1: number;
    cutBy4_0: number;
    cutBy4_1: number;
    cutBy4_2: number;
    cutBy4_3: number;
    cutBy8_0: number;
    cutBy8_1: number;
    cutBy8_2: number;
    cutBy8_3: number;
    cutBy8_4: number;
    cutBy8_5: number;
    cutBy8_6: number;
    cutBy8_7: number;

    pca1: number;
    pca2: number;
    pca3: number;
}

export async function loadData(): Promise<ImageEmotionAndColorCutData[]> {
    const data = await d3.csv("final.csv");
    return data.map(
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
            cutBy2_0: +d.cutBy2_0,
            cutBy2_1: +d.cutBy2_1,
            cutBy4_0: +d.cutBy4_0,
            cutBy4_1: +d.cutBy4_1,
            cutBy4_2: +d.cutBy4_2,
            cutBy4_3: +d.cutBy4_3,
            cutBy8_0: +d.cutBy8_0,
            cutBy8_1: +d.cutBy8_1,
            cutBy8_2: +d.cutBy8_2,
            cutBy8_3: +d.cutBy8_3,
            cutBy8_4: +d.cutBy8_4,
            cutBy8_5: +d.cutBy8_5,
            cutBy8_6: +d.cutBy8_6,
            cutBy8_7: +d.cutBy8_7,
            pca1: +d.pca1,
            pca2: +d.pca2,
            pca3: +d.pca3,
        } as ImageEmotionAndColorCutData)
    );
}
