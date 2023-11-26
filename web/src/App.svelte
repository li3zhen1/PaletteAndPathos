<script lang="ts">
    import { onMount } from "svelte";
    import DensitySplom from "./lib/DensitySPLOM.svelte";
    import {
        loadData,
        type EmotionKey,
        type PCAKey,
        EmotionKeys,
    } from "./lib/EmotionAndColorCutData";
    import { computeDensity } from "./lib/computeDensity";

    onMount(async () => {
        // const data = await loadData(true);
        // const density: Partial<Record<EmotionKey | PCAKey, Partial<Record<EmotionKey | PCAKey, any>>>> = {};
        // for (const x of EmotionKeys) {
        //     density[x] = {};
        //     for (const y of EmotionKeys) {
        //         density[x]![y] = computeDensity(data, [400, 400], [x, y]);
        //     }
        // }
        // // download
        // const a = document.createElement("a");
        // a.href = URL.createObjectURL(new Blob([JSON.stringify(density)], { type: "application/json" }));
        // a.download = "density.json";
        // a.click();

    });
</script>

<main>
    <!-- <Plot3D /> -->

    <DensitySplom axisX={["contentment", "something else", "sadness", "anger"]} />
</main>

<style>
</style>
