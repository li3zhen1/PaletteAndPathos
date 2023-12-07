import { writable } from "svelte/store";
import type { EmotionKey, NumericColorCutKey } from "./EmotionAndColorCutData";

export const axisStore = writable<(NumericColorCutKey|EmotionKey)[]>(
    [
        "contentment",
        "excitement",
        "something else",
        "sadness",
        "anger",
    ]
)
