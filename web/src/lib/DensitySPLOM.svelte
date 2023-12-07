<script lang="ts">
    import { afterUpdate } from "svelte";
    import DensityPlot from "./DensityPlot.svelte";
    import {
        type ImageEmotionAndColorCutData,
        type EmotionKey,
        type PCAKey,
        emojiMap,
        type NumericColorCutKey,
        getEmoji,
        describeKey,
    } from "./EmotionAndColorCutData";
    import _ from "lodash";

    export let axisX: (EmotionKey | NumericColorCutKey)[];

    $: axisY = _.reverse([...axisX]);

    export let showTitle = false;

    export let onDropedAxis: (oldKey: string, newKey: string) => void;

    $: splomSize = axisX.length - 1;

    let rect: DOMRectReadOnly;

    $: gridSize = Math.round((rect?.width - splomSize * 8 - 64) / splomSize);
</script>

<div
    class="splom-container"
    bind:contentRect={rect}
    style="grid-template-columns: 64px repeat({splomSize}, {gridSize}px); grid-template-rows: 64px repeat({splomSize}, {gridSize}px);"
>
    <div></div>
    {#each axisX as x, i}
        {#if i < axisX.length - 1}
            <div
                class="splom-axis-name splom-label-x"
                on:drop={(e) => {
                    // @ts-ignore
                    e.target.classList.remove("dragover-element");
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log(e);
                    const data = e.dataTransfer?.getData("text/plain");
                    if (data) {
                        onDropedAxis(x, data);
                    }
                }}
                on:dragover={(e) => {
                    // @ts-ignore
                    e.target.classList.add("dragover-element");
                    e.preventDefault();
                    e.stopPropagation();
                }}
                on:dragleave={(e) => {
                    // @ts-ignore
                    e.target.classList.remove("dragover-element");
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <div class="splom-axis-name">
                    {describeKey(x)}&nbsp;<span class="emoji"
                        >{getEmoji(x)}</span
                    >
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
            <div
                class="splom-label-y"
                on:drop={(e) => {
                    // @ts-ignore
                    e.target.classList.remove("dragover-element");
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log(e);
                    const data = e.dataTransfer?.getData("text/plain");
                    if (data) {
                        onDropedAxis(y, data);
                    }
                }}
                on:dragover={(e) => {
                    // @ts-ignore
                    e.target.classList.add("dragover-element");
                    e.preventDefault();
                    e.stopPropagation();
                }}
                on:dragleave={(e) => {
                    // @ts-ignore
                    e.target.classList.remove("dragover-element");
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <div class="splom-axis-name splom-text-y">
                    <span class="emoji">{getEmoji(y) ?? ""}</span
                    >&nbsp;{describeKey(y)}
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
                <div
                    style="grid-row: {i + 2}/{i + 3}; grid-column: {j + 2}/{j +
                        3};"
                >
                    <DensityPlot axis={[x, y]} />
                </div>
            {:else if i !== axisX.length - 1 && j !== axisX.length - 1}
                <div
                    style="grid-row: {i + 2}/{i + 3}; grid-column: {j + 2}/{j +
                        3};"
                ></div>
            {/if}
        {/each}
    {/each}

    <!-- {#if showTitle} -->
    <div class="hero-title hero-title1">
        <div>
            <div class="moma flex gap-2 items-center">
                <span class=" rounded-full w-5 h-5 bg-pink-500 block"></span>
                <span>MoMA</span>
            </div>
            <div class="wiki flex gap-2 items-center">
                <span class=" rounded-full w-5 h-5 bg-slate-400 block"></span>
                WikiArt
            </div>
        </div>
    </div>
    <!-- {/if} -->
</div>

<style>
    .splom-container {
        display: grid;
        grid-template-columns: 4rem repeat(4, 1fr);
        grid-template-rows: 4rem repeat(4, 1fr);
        height: calc(100vh - 72px);
        /* min-width: 760px; */
        width: calc(100vh - 72px);
        gap: 8px;
        aspect-ratio: 1 / 1;
        cursor: grab;
        box-sizing: border-box;
        padding: 8px 16px 0 8px;
    }

    .splom-label-x {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 16px 8px 0 8px;
        gap: 8px;
        font-weight: 600;
        line-height: 0.95;
    }
    .splom-label-x > * {
        pointer-events: none;
    }

    .splom-label-y {
        display: flex;

        align-items: center;
        justify-content: center;
        padding: 8px 0 8px 16px;
        gap: 8px;
        font-weight: 600;
        line-height: 0.95;
    }

    .splom-label-y > * {
        pointer-events: none;
    }

    .splom-text-y {
        writing-mode: vertical-lr;
        /* transform: rotate(180deg); */
    }

    .axis-number-x {
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

    .hero-title {
        width: 0;
        /* no wrap */
        white-space: nowrap;
        display: flex;
        height: 0;
        align-items: end;
        position: relative;
        overflow: visible;
        font-size: 1.5rem;
        font-variation-settings:
            "opsz" 32,
            "wght" 560;
    }

    .hero-title1 {
        grid-row: 6/7;
        grid-column: 5/6;
    }

    .hero-title2 {
        grid-row: 6/7;
        grid-column: 5/6;
    }

    /* .wiki {
        color: rgba(24, 120, 201, 1);
    }

    .moma {
        color: rgba(246, 133, 18, 1);
    } */

    .emoji {
        font-size: 1.25rem;
    }

    .splom-axis-name {
        display: flex;
        align-items: center;
        line-height: 0.9;
        padding-bottom: 4px;
    }
</style>
