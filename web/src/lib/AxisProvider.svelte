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

<div
    class="flex flex-col gap-2 pt-5 pb-2 mb-[-8px] p-4 bg-white shadow-lg border-[0.5px] rounded-lg border-slate-300 overflow-hidden h-full sticky top-4"
>
    <div>
        <h2>Emotions in the MoMA Collection</h2>
        <p>
            We ran the <a href="https://www.artemisdataset.org">ArtEmis</a>
            model on the MoMA collection to extract emotions from the images.
            The model was trained on the WikiArt dataset, so we can compare the
            emotions of the MoMA collection to the WikiArt collection. The model
            outputs 9 emotions:
            <span class="font-semibold"
                >amusement, awe, contentment, excitement, anger, disgust, fear,
                sadness, something else
            </span>.
        </p>
        <p>
            Now join our journey to explore how the emotion and color distributions among 2,132 paintings from MoMA and 80,043 from WikiArt.
        </p>
    </div>
    <div class="flex-grow"></div>
    <div class="flex flex-col gap-2">
        <p class="text-zinc-400 tex-xs font-semibold pb-4">
            &larr; Drag the label below and drop them to the axis label on the
            left chart.
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
    /* .wiki {
        color: rgba(24, 120, 201, 1);
    }

    .moma {
        color: rgba(246, 133, 18, 1);
    } */

    h1 {
        font-size: 2.5rem;
        font-variation-settings:
            "opsz" 32,
            "wght" 640;
        letter-spacing: -0.02rem;
        line-height: 0.9;
    }
</style>
