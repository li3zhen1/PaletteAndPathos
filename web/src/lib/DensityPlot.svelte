<script lang="ts">
    import * as d3 from "d3";
    import { afterUpdate, onMount } from "svelte";
    import {
        loadData,
        type ImageEmotionAndColorCutData,
        type EmotionKey,
        type PCAKey,
        type NumericColorCutKey,
    } from "./EmotionAndColorCutData";
    import _ from "lodash";
    import Color from "color";
    import { loadPrecomputedDensity } from "./computeDensity";

    export let axis: [EmotionKey | NumericColorCutKey, EmotionKey | NumericColorCutKey];

    let svgContainer: SVGGElement;
    let svgRoot: SVGSVGElement;
    let axisLayer: SVGGElement;

    async function loadDensity(
        _size: [number, number],
        _axis: [EmotionKey | NumericColorCutKey, EmotionKey | NumericColorCutKey],
    ) {
        // load "density.json"
        // const response = await fetch("/density.json");
        // const data = await response.json();
        // return data[_axis[0]][_axis[1]];
        return await loadPrecomputedDensity(_axis[0], _axis[1]);

        // const [width, height] = _size;

        // const desityScale = (300 * 300) / (width * height);

        // // normalize to 0-1
        // const _data = data
        //     .filter((it) => it.category === "Moma")
        //     .map((d) => {
        //         return [d[_axis[0]] * width, height * (1 - d[_axis[1]])] as [
        //             number,
        //             number,
        //         ];
        //     });

        // const __data = data
        //     .filter((it) => it.category !== "Moma")
        //     .map((d) => {
        //         return [d[_axis[0]] * width, height * (1 - d[_axis[1]])] as [
        //             number,
        //             number,
        //         ];
        //     });

        // const density = d3
        //     .contourDensity()
        //     .x((d) => d[0])
        //     .y((d) => d[1])
        //     .bandwidth(10)
        //     .size([width, height])
        //     .thresholds(
        //         [
        //             0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.0012,
        //             0.016, 0.032, 0.048, 0.064, 0.096, 0.128,
        //         ].map((it) => it * desityScale),
        //     )(_data);

        // const _density = d3
        //     .contourDensity()
        //     .x((d) => d[0])
        //     .y((d) => d[1])
        //     .bandwidth(5)
        //     .size([width, height])
        //     .thresholds(
        //         [0.5, 1.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0].map(
        //             (it) => it * desityScale,
        //         ),
        //     )(
        //     // .bandwidth(10)
        //     __data,
        // );

        // return {
        //     moma: { density },
        //     wiki: { density: _density },
        //     width: width,
        //     height: height,
        // };
    }

    function preparePlot(
        svgRef: SVGGElement,
        data: {
            moma: { density: d3.ContourMultiPolygon[] };
            wiki: { density: d3.ContourMultiPolygon[] };
            width: number;
            height: number;
        },
    ) {
        svgRoot.setAttribute("viewBox", `0 0 ${400} ${400}`);
        const { width, height } = data;
        const svg = d3.select(svgRef);

        for (let i = 1; i < 4; i++) {
            svg.append("line")
                .attr("x1", (width / 4) * i)
                .attr("x2", (width / 4) * i)
                .attr("y1", height)
                .attr("y2", 0)
                .attr("stroke", "#e1e2e4")
                // dash
                .attr("stroke-dasharray", "3,3")
                .attr("stroke-width", 2);

            svg.append("line")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", (height / 4) * i)
                .attr("y2", (height / 4) * i)
                .attr("stroke-width", 2)
                .attr("stroke", "#e1e2e4")
                .attr("stroke-dasharray", "3,3")
                .attr("stroke-width", 2);
        }

        svg.append("rect")
            .attr("width", width - 4)
            .attr("height", height - 4)
            .attr("transform", `translate(${2}, ${2})`)
            .attr("stroke", "#e1e2e4")
            .attr("stroke-width", 4)
            .attr("rx", 8)
            .attr("ry", 8)
            .attr("fill", "none");
    }

    function renderPlot(
        svgRef: SVGGElement,
        data: {
            moma: { density: d3.ContourMultiPolygon[] };
            wiki: { density: d3.ContourMultiPolygon[] };
            width: number;
            height: number;
        },
    ) {
        
        
        const { density } = data.wiki;

        const svg = d3.select(svgContainer);
        svg.selectAll("*").remove();
        const maxValue = d3.max(density, (d) => d.value) as number;
        const accentColor = new Color(`#647492`);
        const color = (d: d3.ContourMultiPolygon) => {
            return accentColor
            .lighten(1 - d.value / maxValue)
            // .alpha(0.2 + 0.4 * (d.value / maxValue))
            .hexa();
        };

        const { density: moma_density } = data.moma;

        const maxValueMoma = d3.max(moma_density, (d) => d.value) as number;
        const accentColorMoma = new Color(`#f472b6`);
        const colorMoma = (d: d3.ContourMultiPolygon) => {
            //"#f472b610" 
            return accentColorMoma
            // .opaquer(0.7)
            .lighten(0.43 - (0.5*d.value / maxValueMoma) )
            .alpha(0.8)
            .hex();
        };

        svg.append("g")
            .style("mix-blend-mode", "multiply")
            .selectAll("path")
            .data(density)
            .join("path")
            .attr("fill", color)
            .attr("d", d3.geoPath());

        svg.append("g")
            .style("mix-blend-mode", "multiply")
            .selectAll("path")
            .data(moma_density)
            .join("path")
            .attr("fill", colorMoma)
            .attr("d", d3.geoPath());
    }

    onMount(async () => {
        const density = await loadDensity([400, 400], axis);
        preparePlot(axisLayer, density);
    });

    afterUpdate(async () => {
        const density = await loadDensity([400, 400], axis);
        renderPlot(svgContainer, density);
    });
</script>

<svg bind:this={svgRoot} data-axis={`${axis[0]}-${axis[1]}`}>
    <g bind:this={axisLayer}></g>
    <g bind:this={svgContainer}></g>
</svg>

<style>
    svg {
        border-radius: 4px;
        overflow: hidden;
        width: 100%;
        aspect-ratio: 1/1;
    }
</style>
