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
    import Dashboard1 from "./lib/Dashboard1.svelte";
    import Dashboard2 from "./lib/Dashboard2.svelte";
    import Dashboard3 from "./lib/Dashboard3.svelte";
    import MoMaPaintingCollection from "./lib/MoMA_Painting_collection.svelte";
    import FemaleArtists from "./lib/FemaleArtists.svelte";
    import PaletteByCountry from "./lib/PaletteByCountry.svelte";
    import TableauEmbedding from "./lib/TableauEmbedding.svelte";
    import Header from "./lib/Header.svelte";
    import Foooter from "./lib/Foooter.svelte";

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

    const srcs = [
        "https://public.tableau.com/views/MoMAPaintingCollections/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
        "https://public.tableau.com/views/CS6730Colors/Dashboard4?:language=en-US&:display_count=n&:origin=viz_share_link",
        "https://public.tableau.com/views/PalettebyCountry/Dashboard2?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
        "https://public.tableau.com/views/MoMAPaintingCollections-FemaleArtists/Dashboard3?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
        "https://public.tableau.com/views/CS6730DotPlot/Dashboard3?:language=en-US&:display_count=n&:origin=viz_share_link",
    ];

    const src2 = [
        "https://public.tableau.com/views/MoMASentimentLinechart/NegativeSentiment?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
        "https://public.tableau.com/views/MoMASentimentParallelCoordinates/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link",
    ];
</script>

<main class="w-[100vw] overflow-x-hidden">
    <Header />
    <div
        class="bg-gradient-to-b from-transparent to-pink-100 dark:from-[rgba(36,0,18,1)] dark:to-[rgba(52,2,30,1)] relative pb-[48px] mt-[-32px]"
    >
        <TableauEmbedding
            src={srcs[0]}
            descHeader="A Look at MoMA’s Collection"
        >
            <p>
                The investigation here is grounded in the official dataset
                provided by the Museum of Modern Art (MoMA), encompassing <b
                    class="font-bold text-pink-500">2,132</b
                >
                paintings curated from the works of
                <b class="font-bold text-slate-500">1,053</b> artists.
            </p>
        </TableauEmbedding>

        <TableauEmbedding src={srcs[1]} descHeader={undefined}>
            <p>
                The bar chart illustrates the predominant color choices made by
                the artists featured in MoMA’s collection. Over time, there has
                been a noticeable transformation in the tones and hues employed
                by artists showcased at MoMA, with a distinct trend towards
                lighter and more vibrant color schemes.
            </p>
        </TableauEmbedding>

        <TableauEmbedding src={srcs[2]} descHeader={undefined}>
            <p>
                Our world is vibrant, reflecting its rich tapestry of cultures
                and people. The geographical map below provides a glimpse into
                the palette variations across countries. Through casual
                observation, we notice that certain nations distinctly favor
                particular colors.
            </p>
            <p>
                <b>Nigeria</b> prominently features a substantial
                <b class="text-orange-400">orange</b> hue, as evidenced by a quick
                Google image search, which reveals a prevalent orange theme in artworks.
            </p>
            <p>
                <b>Congo</b> stands out with its distinctive use of a
                <b class=" text-sky-400">bright blue</b> shade, a pattern consistent
                with search results.
            </p>

            <p>
                <b>Chinese</b>
                paintings predominantly showcase <b>black</b>,
                <b class="text-zinc-400">grey</b>, and
                <b class="text-red-500">red</b> tones, influenced by the traditional
                art form known as “Ink Wash Painting.”
            </p>
        </TableauEmbedding>

        <TableauEmbedding src={srcs[3]} descHeader="Gender & MoMA">
            <p>
                In recent years, MoMA has been acquiring a higher percentage of
                paintings from female artists. Before 1980, the average was 10%,
                but in 2019, 13 out of 21 new paintings added to MoMA's
                collection were from female artists, marking a substantial
                increase to 61%. Examining color patterns between male and
                female artists reveals that female artists tend to use lighter
                colors like <b class="text-pink-500">pink</b>,
                <b class="text-zinc-300">white</b>, and
                <b class="text-green-500">green</b> more frequently, while using
                darker colors such as <b class=" text-amber-800">brown</b>,
                <b>black</b>, <b class="text-zinc-800">dark</b>, and
                <b class="text-zinc-500">light grey</b> less often.
            </p>
        </TableauEmbedding>

        <TableauEmbedding src={srcs[4]} descHeader={undefined}>
            <p>
                The dot plot here provides an overview of the chronological
                distribution of the MoMA artworks. <b
                    class="font-bold text-pink-500">Pink</b
                >
                triangles represent female artists, while <b>black</b> triangles
                represent male artists. Clicking any triangle presents more information
                about each painting’s origin, medium, dimensions, and acquisition
                details.
            </p>
        </TableauEmbedding>

        <!-- {#each srcs as s}
            <TableauEmbedding src={s} />
        {/each} -->

        <section class="flex justify-center mb-16">
            <div class="flex gap-4 max-w-[1400px] p-4">
                <div
                    class="flex-grow gap-8 pb-4 pr-4 max-w-[1280px] shadow-xl border-[0.5px] rounded-lg border-slate-300 bg-white"
                >
                    <div class="flex-shrink-0">
                        <DensitySplom {axisX} onDropedAxis={handleAxisDrop} />
                    </div>

                    <!-- <AxisProvider /> -->
                </div>

                <div class="flex-grow-0">
                    <AxisProvider />
                </div>
            </div>
        </section>

        <TableauEmbedding src={src2[0]} descHeader={undefined}>
            <p>
                The sentiments artists choose to portray in their work are
                deeply inspired by the times they live through.
            </p>
            <p>
                This annotated line graph gives us a glimpse into how themes of
                anger, fear, disgust, and sadness increased or decreased around
                historical events in the last few decades. We see fear peak
                right before the start of the 20th century, and decrease over
                the decades, spiking again right as the COVID-19 pandemic began.
                Anger and disgust increased after the second world war, and are
                still at fairly high levels.
            </p>
        </TableauEmbedding>

        <TableauEmbedding src={src2[1]} descHeader={undefined}>
            <p>
                Take a look at the average sentiments across the work of 50
                prolific artists. The axes represent the average amusement,
                anger, awe, contentment, disgust, excitement and fear scores of
                their artworks.
            </p>
            <p>
                Change the range of any axes using the filters on the right to
                see how high/low levels of a certain sentiment impact the
                distribution of other sentiments. We can see that high levels of
                amusement correspond with high levels of excitement, while
                higher levels of anger correspond with high levels of disgust.
            </p>
        </TableauEmbedding>
    </div>
    <!-- <TableauEmbedding src={"https://public.tableau.com/views/CS6730Colors/Dashboard4?:language=en-US&:display_count=n&:origin=viz_share_link"}/>

    
        <TableauEmbedding src={"https://public.tableau.com/views/CS6730DotPlot/Dashboard3?:language=en-US&:display_count=n&:origin=viz_share_link"}/>

    <TableauEmbedding src={"https://public.tableau.com/shared/RB4FJ4FBP?:display_count=n&:origin=viz_share_link"}/>
    
    <TableauEmbedding src={"https://public.tableau.com/views/PalettebyCountry/Dashboard2?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"}/>
    
    <TableauEmbedding src={"https://public.tableau.com/views/MoMAPaintingCollections-FemaleArtists/Dashboard3?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"}/>

    <TableauEmbedding src="https://public.tableau.com/shared/8STYYXRPS?:display_count=n&:origin=viz_share_link"/> -->
</main>

<Foooter />

<style>
    section.h-ctn {
        padding: 24px;
        display: flex;
        width: 100%;
        justify-content: center;
    }
</style>
