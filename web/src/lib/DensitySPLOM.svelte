<script lang="ts">
    import DensityPlot from "./DensityPlot.svelte";
    import {
        type ImageEmotionAndColorCutData,
        type EmotionKey,
        type PCAKey,
        emojiMap,
    } from "./EmotionAndColorCutData";

    export let axisX: (EmotionKey | PCAKey)[];

    export let axisY = axisX.toReversed();

    $: splomSize = axisX.length - 1;
</script>

<div
    class="splom-container"
    style="grid-template-columns: 4rem repeat({splomSize}, 1fr); grid-template-rows: 4rem repeat({splomSize}, 1fr);"
>
    <div></div>
    {#each axisX as x, i}
        {#if i < axisX.length - 1}
            <div class="splom-label-x">
                <div>
                    {x[0].toUpperCase() + x.slice(1)}&nbsp;{emojiMap.get(x)}
                </div>
                <div class="axis-number-x">
                    <span class="less">LESS</span>
                    <div class="gradient-link"></div>
                    <span class="more">MORE</span>
                </div>
            </div>
        {/if}
    {/each}

    {#each axisY as y, i}
        {#if i < axisX.length - 1}
            <div class="splom-label-y">
                <div class="splom-text-y">
                    {y[0].toUpperCase() + y.slice(1)}&nbsp;{emojiMap.get(y)}
                </div>
                <div class="axis-number-y">
                    <span class="more splom-text-y">MORE</span>
                    <div class="gradient-link-y"></div>
                    <span class="less splom-text-y">LESS</span>
                </div>
            </div>
        {/if}
        {#each axisX as x, j}
            {#if i + j < axisX.length - 1}
                <DensityPlot axis={[x, y]} />
            {:else if i !== axisX.length - 1 && j !== axisX.length - 1}
                <div></div>
            {/if}
        {/each}
    {/each}
</div>

<style>
    .splom-container {
        display: grid;
        grid-template-columns: 4rem repeat(4, 1fr);
        grid-template-rows: 4rem repeat(4, 1fr);
        max-height: 96vh;
        min-width: 760px;
        max-width: 96vh;
        gap: 8px;
        aspect-ratio: 1 / 1;
    }

    .splom-label-x {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 24px 8px 0 8px;
        gap: 8px;
        font-weight: 600;
    }

    .splom-label-y {
        display: flex;

        align-items: center;
        justify-content: center;
        padding: 8px 0 8px 24px;
        gap: 8px;
        font-weight: 600;
    }

    .splom-text-y {
        writing-mode: vertical-lr;
        /* transform: rotate(180deg); */
    }

    .axis-number-x{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        font-weight: 500;
        color: #aaa;
        align-items: center;
        gap: 4px;
    }
    .axis-number-y {
        height: 100%;
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.8rem;
        font-weight: 500;
        color: #aaa;
        align-items: center;
        gap: 4px;
    }

    .less {
        opacity: 0.4;
    }

    .gradient-link {
        width: 100%;
        height: 1.5px;
        background: linear-gradient(to right, #aaaaaa30, #aaaaaaff);
    }

    .gradient-link-y {

        width: 1.5px;
        height: 100%;
        background: linear-gradient(to top, #aaaaaa30, #aaaaaaff);
    }
</style>
