<script>
    import _, { range } from "lodash";
    import { fly } from "svelte/transition";

    const row2 = _.shuffle([
        "79269.png",
        "79270.png",
        "79271.png",
        "79273.png",
        "79275.png",
        "79276.png",
        "79277.png",
        "79278.png",
        "79281.png",
        "79282.png",
        "79326.png",
        "79328.png",
        "79330.png",
        "79332.png",
    ]);

    const row3 = _.shuffle([
        "79300.png",
        "79301.png",
        "79302.png",
        "79303.png",
        "79305.png",
        "79307.png",
        "79309.png",
        "79310.png",
        "79312.png",
        "79316.png",
        "79319.png",
        "79320.png",
        "79321.png",
        "79322.png",
        "79323.png",
        "79324.png",
        "79325.png",
    ]);

    const row_1 = _.shuffle(row3);
</script>

<header class="hero-header relative z-[-9]">
    <div class="relative translate-y-[-368px] flex gap-4 h-0 z-[-1]">
        {#each row_1 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-44 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
        {#each row3 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-44 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
    </div>
    <div class="relative translate-y-[-176px] flex gap-4 h-0 z-[-1] opacity-90">
        {#each range(1, 11) as i}
            <img
                src={`/PaletteAndPathos/${i}.jpg`}
                class="h-40 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
        {#each row3 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-40 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
    </div>
    <div class="relative translate-y-[0px] flex gap-4 h-0 z-[-1] opacity-70">
        {#each row2 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-36 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
        {#each row3 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-36 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
    </div>
    <div class="relative translate-y-[160px] flex gap-4 h-0 z-[-1] opacity-50">
        {#each row3 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-32 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
    </div>
    <div class="relative translate-y-[304px] flex gap-4 h-0 z-[-1] opacity-10">
        {#each range(1, 11) as i}
            <img
                src={`/PaletteAndPathos/${i}.jpg`}
                class="h-28 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
        {#each row3 as i}
            <img
                src={`/PaletteAndPathos/${i}`}
                class="h-28 z-[-1] object-cover rounded-md"
                alt={`${i}`}
            />
        {/each}
    </div>
    <div
        class="w-full flex flex-col items-center justify-center pt-28 relative z-999"
    >
        <h1>
            Palette <span style="font-family:'IBM Plex Sans';font-weight:600"
                >&</span
            > Pathos
        </h1>
        <h3 class="relative text-center max-w-[840px]">
            Tracing the Emotional and Chromatic Journeys of MoMA Artists
            <!-- Discover the emptional and chromatic spectrum of the Museum of Modern Artists(MoMA)’s
            masterpieces through our data visualization.  -->
        </h3>
        <!-- <p class="max-wi">
            Discover the spectrum of the Museum of Modern Artists(MoMA)’s
            masterpieces through our data visualization. We distill the essence
            of art into captivating color palettes.
        </p> -->

        <div class="absolute w-full h-[65vh] min-h-[720px] z-[-1] grad"></div>
    </div>
    <div
        class="h-[20vh] absolute top-0 left-0 w-full bg-gradient-to-b from-pink-100 to-transparent mix-blend-multiply"
    ></div>
</header>

<style>
    h1 {
        font-size: 5.5rem;
        font-variation-settings:
            "opsz" 32,
            "wght" 650;
        letter-spacing: -0.04rem;
    }

    h3 {
        font-size: 1.5rem;
        font-variation-settings:
            "opsz" 24,
            "wght" 600;
        letter-spacing: -0.02rem;
    }

    header.hero-header {
        min-height: 400px;
        height: 75vh;
        max-height: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .grad {
        background-image: radial-gradient(
            ellipse at bottom,
            #ffffffff 30%,
            #ffffff00 60%
        );
        transform: scale(1.5) translateY(-100px);
    }
</style>
