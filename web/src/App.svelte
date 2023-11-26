<script lang="ts">
    import { onMount } from "svelte";
    import DensitySplom from "./lib/DensitySPLOM.svelte";
    import {
        loadData,
        type EmotionKey,
        type PCAKey,
        EmotionKeys,
        type NumericColorCutKey,
        ExtendedColorCutKeys,
    } from "./lib/EmotionAndColorCutData";
    import { computeDensity } from "./lib/computeDensity";

    onMount(async () => {
        // const data = await loadData(true);
        // const keys = [...EmotionKeys, "h_delta", "s_delta", "l_delta", "r_delta", "g_delta", "b_delta"];
        // const collectedData: any = {};
        // for (const x of keys) {
        //     // @ts-ignore
        //     collectedData[x] = {};
        //     for (const y of keys) {
        //         if (x !== y) {
        //             // @ts-ignore
        //             const density = computeDensity(data, [400, 400], [x, y]);
        //             // @ts-ignore
        //             collectedData[x][y] = density;
        //         }
        //     }
        // }
        // // down load the data
        // const a = document.createElement("a");
        // a.href = URL.createObjectURL(
        //     new Blob([JSON.stringify(collectedData)], {
        //         type: "application/json",
        //     })
        // );
        // a.download = "density.json";
        // a.click();
    });

    const axisX: (EmotionKey | NumericColorCutKey)[] = [
        "contentment",
        "excitement",
        "something else",
        "anger",
        "h_delta",
    ];
</script>

<main>
    <!-- <Plot3D /> -->

    <DensitySplom {axisX} showTitle />
</main>

<style>
</style>
