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
</script>

<main>

    <div class="flex gap-8 pb-12">
        <div class="flex-shrink-0">
            <DensitySplom {axisX} onDropedAxis={handleAxisDrop}/>
        </div>
        <AxisProvider />
    </div>

    <TableauEmbedding src={"https://public.tableau.com/views/CS6730Colors/Dashboard4?:language=en-US&:display_count=n&:origin=viz_share_link"}/>
    <!-- <TableauEmbedding src={"https://public.tableau.com/views/CS6730ColorsCircles/Dashboard2?:language=en-US&:display_count=n&:origin=viz_share_link"}/> -->
    <TableauEmbedding src={"https://public.tableau.com/views/CS6730DotPlot/Dashboard3?:language=en-US&:display_count=n&:origin=viz_share_link"}/>
    

    <!-- MoMA Collection -->
    <TableauEmbedding src={"https://public.tableau.com/shared/RB4FJ4FBP?:display_count=n&:origin=viz_share_link"}/>
    
    <!-- Geo -->
    <TableauEmbedding src={"https://public.tableau.com/views/PalettebyCountry/Dashboard2?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"}/>
    
    <!-- Female artists -->
    <TableauEmbedding src={"https://public.tableau.com/views/MoMAPaintingCollections-FemaleArtists/Dashboard3?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"}/>

    <TableauEmbedding src="https://public.tableau.com/shared/8STYYXRPS?:display_count=n&:origin=viz_share_link"/>

</main>

<style>
</style>
