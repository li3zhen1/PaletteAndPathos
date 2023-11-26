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

<div class="flex flex-col gap-2 p-4">
    <h3 class="text-lg font-semibold">Emotions</h3>
    <div>
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
