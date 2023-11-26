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

    });

    const axisX: EmotionKey[] = [
        "contentment",
        "excitement",
        "something else",
        "sadness",
        "anger",
    ];
</script>

<main>
    <!-- <Plot3D /> -->

    <DensitySplom {axisX} />
</main>

<style>
</style>
