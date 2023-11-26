<script lang="ts">
    import DensityPlot from "./DensityPlot.svelte";
    import {
        type ImageEmotionAndColorCutData,
        type EmotionKey,
        type PCAKey,
    } from "./EmotionAndColorCutData";

    export let axisX: [
        EmotionKey | PCAKey,
        EmotionKey | PCAKey,
        EmotionKey | PCAKey,
        EmotionKey | PCAKey,
    ];

    export let axisY = axisX.toReversed();
</script>

<div class="splom-container">
    <div></div>
    {#each axisX as x}
        <div class="splom-label-x">{x}</div>
    {/each}

    {#each axisY as y}
    <div class="splom-label-y">{y}</div>
        {#each axisX as x}
            {#if x !== y}
                <DensityPlot axis={[x, y]}/>
            {:else}
                <div>
                    
                </div>
            {/if}
        {/each}
    {/each}
</div>

<style>
    .splom-container {
        display: grid;
        grid-template-columns: 4rem repeat(4, 1fr);
        grid-template-rows: 4rem repeat(4, 1fr);
        max-height: 90vh;
        max-width: 90vw;
        gap: 8px;
        aspect-ratio: 1/1;
    }

    .splom-label-x {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .splom-label-y {
        display: flex;
        align-items: center;
        justify-content: center;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
    }
</style>
