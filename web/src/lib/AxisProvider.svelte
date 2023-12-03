<script lang="ts">
    import {
        EmotionKeys,
        describeKey,
        getEmoji,
        type EmotionKey,
        type NumericColorCutKey,
    } from "./EmotionAndColorCutData";
    import { axisStore } from "./store";

    const colorKeys = [
        "h_delta",
        "s_delta",
        "l_delta",
        "r_delta",
        "g_delta",
        "b_delta",
    ] as (EmotionKey | NumericColorCutKey)[];
</script>

<div class="flex flex-col gap-2 p-4 pb-0 mb-[-8px]">
    <h1 class="mt-8">
        Emotions & Colors <br /> in <span class="moma">MoMA</span> &
        <span class="wiki">WikiArt</span>
    </h1>
    <div class="flex-grow"></div>
    <div class="flex flex-col gap-2">
        <p class="text-zinc-400 tex-xs font-semibold pb-4">
            &larr; Drag the label below and drop them to the axis label on the left chart.
        </p>
        <h3 class="text-lg font-semibold">Emotions</h3>
        <div class="pb-4">
            {#each EmotionKeys as k}
                <button
                    class={`border border-zinc-200 transition-opacity p-1 pl-4 pr-4 bg-zinc-100 rounded-lg mb-2 mr-2 cursor-grab ${
                        $axisStore.includes(k) ? "opacity-20 grayscale" : ""
                    } `}
                    draggable="true"
                    disabled={$axisStore.includes(k)}
                    on:dragstart={(e) => {
                        e.dataTransfer?.setData("text/plain", k);
                    }}
                >
                    <span class="key-emoji">
                        {getEmoji(k)}
                    </span>
                    <span class="key-text font-medium">
                        {describeKey(k)}
                    </span>
                </button>
            {/each}
        </div>

        <h3 class="text-lg font-semibold">Colors</h3>
        <div>
            {#each colorKeys as k}
                <button
                    class={`border border-zinc-200 transition-opacity p-1 pl-4 pr-4 bg-zinc-100 rounded-lg mb-2 mr-2 cursor-grab ${
                        $axisStore.includes(k) ? "opacity-20 grayscale" : ""
                    } `}
                    draggable="true"
                    disabled={$axisStore.includes(k)}
                    on:dragstart={(e) => {
                        e.dataTransfer?.setData("text/plain", k);
                    }}
                >
                    <span class="key-emoji">
                        {getEmoji(k)}
                    </span>
                    <span class="key-text font-medium">
                        {describeKey(k)}
                    </span>
                </button>
            {/each}
        </div>
    </div>
</div>

<style>
    .wiki {
        color: rgba(24, 120, 201, 1);
    }

    .moma {
        color: rgba(246, 133, 18, 1);
    }

    h1 {
        font-size: 3.5rem;
        font-variation-settings:
            "opsz" 32,
            "wght" 640;
        letter-spacing: -0.02rem;
        line-height: 0.9;
    }
</style>
