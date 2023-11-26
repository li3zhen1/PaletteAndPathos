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
    import AxisProvider from "./lib/AxisProvider.svelte";
    import { axisStore } from "./lib/store";

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

    // let axisX: (EmotionKey | NumericColorCutKey)[] = ;
    $: axisX = $axisStore;

    function handleAxisDrop(oldKey: string, newKey: string) {
        const oldIndex = axisX.indexOf(oldKey as any);
        const newIndex = axisX.indexOf(newKey as any);
        if (oldIndex !== -1 && newIndex === -1) {
            axisX[oldIndex] = newKey as any;
            axisStore.set(axisX);
        }
    }
</script>

<main>
    <!-- <Plot3D /> -->

    <div class="flex gap-8">
        <div class="flex-shrink-0">

        <DensitySplom {axisX} onDropedAxis={handleAxisDrop} />
        </div>
        <AxisProvider />
    </div>
</main>

<style>
</style>
