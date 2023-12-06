<script lang="ts">
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import type { ArtistLifeDataset, ArtistLife } from "./ArtistLifeData";

    let svgRef: SVGSVGElement;

    function processData(data: ArtistLife[]): ArtistLife[] {
        return data.filter((it) => {
            return (
                it.name !== undefined &&
                it.name !== null &&
                it.name !== "" &&
                (it as any).ArtistLife == undefined &&
                it.lifePeriods !== undefined &&
                it.lifePeriods.length > 0
            );
        });
    }

    async function paint(svgRef: SVGSVGElement) {
        const data = await fetch("/combined.json");
        const json: ArtistLifeDataset = await data.json();
        json.moma = processData(json.moma);
        json.wiki = processData(json.wiki);
    }

    onMount(() => {
        paint(svgRef);
    });
</script>

<svg width="1920" height="1280" class="" bind:this={svgRef}> </svg>

<style>
    svg {
        border: 1px solid black;
    }
</style>
