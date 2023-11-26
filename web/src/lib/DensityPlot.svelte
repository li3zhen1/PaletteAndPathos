<script lang="ts">
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import {
        loadData,
        type ImageEmotionAndColorCutData,
    } from "./EmotionAndColorCutData";
    import _ from "lodash";
    import Color from "color";

    let svgContainer: SVGSVGElement;

    async function loadDataAndComputeDensity() {
        const data = await loadData(true);
        const angerExtent = d3.extent(data, (d) => d.anger) as [number, number];
        const contentmentExtent = d3.extent(data, (d) => d.contentment) as [
            number,
            number,
        ];

        // normalize to 0-1
        const _data = data
            .filter((it) => it.category === "Moma")
            .map((d) => {
                let anger =
                    (d.anger - angerExtent[0]) /
                    (angerExtent[1] - angerExtent[0]);
                let contentment =
                    (d.contentment - contentmentExtent[0]) /
                    (contentmentExtent[1] - contentmentExtent[0]);
                return [d.contentment * 300, 300*(1-d.anger)] as [
                    number,
                    number,
                ];
            });

        const __data = data
            .filter((it) => it.category !== "Moma")
            .map((d) => {
                // let anger = d.anger
                //     (d.anger - angerExtent[0]) /
                //     (angerExtent[1] - angerExtent[0]);
                // let contentment =
                //     (d.contentment - contentmentExtent[0]) /
                //     (contentmentExtent[1] - contentmentExtent[0]);
                return [d.contentment * 300, 300*(1-d.anger)] as [
                    number,
                    number,
                ];
            });

        const density = d3
            .contourDensity()
            .x((d) => d[0])
            .y((d) => d[1])
            .bandwidth(10)
            .size([300, 300])
            // .bandwidth(2)
            .thresholds(
                // _.range(0, 100, 10)
                // [1, 2, 4, 8, 16],
                // _.range(0, 0.15, 0.015),
                [
                    0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.0012,
                    0.016, 0.032, 0.048, 0.064, 0.096, 0.128,
                ],
            )(_data);

        const _density = d3
            .contourDensity()
            .x((d) => d[0])
            .y((d) => d[1])
            .bandwidth(5)
            .size([300, 300])
            .thresholds([
                0.5, 1.0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0
            ])(
            // .bandwidth(10)
            __data,
        );

        return {
            moma: { data: _data, density },
            wiki: { data: __data, density: _density },
        };
    }

    function renderPlot(
        svgRef: SVGSVGElement,
        data: Awaited<ReturnType<typeof loadDataAndComputeDensity>>,
    ) {
        const { data: _data, density } = data.wiki;
        const width = 300;
        const height = 300;
        const margin = 20;
        const svg = d3.select(svgRef);
        const x = d3
            .scaleLinear()
            .domain([0, 1])
            .range([margin, width - margin]);
        const y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([height - margin, margin]);

        // blue with opacity d.value

        // .scaleSequential(d3.interpolateViridis)
        //     .domain([0, d3.max(density, (d) => d.value) as number]);
        const maxValue = d3.max(density, (d) => d.value) as number;
        const accentColor = new Color(`rgba(64,70,201)`);
        const color = (d: d3.ContourMultiPolygon) => {
            return accentColor.lighten(1 - d.value / maxValue).hex();
        };

        const { density: moma_density } = data.moma;

        const maxValueMoma = d3.max(moma_density, (d) => d.value) as number;
        const accentColorMoma = new Color(`rgba(246,133,18)`);
        const colorMoma = (d: d3.ContourMultiPolygon) => {
            return accentColorMoma.lighten(1 - d.value / maxValueMoma).hex();
        };

        // .domain([0.15, 0]);

        svg.append("g")
            .selectAll("path")
            .data(density)
            .join("path")
            .attr("fill", color)
            // .attr("transform", `translate(150, 150)`)
            .attr("d", d3.geoPath());

        svg.append("g")
            .style("mix-blend-mode", "multiply")
            .selectAll("path")
            .data(moma_density)
            .join("path")
            .attr("fill", colorMoma)
            // .attr("transform", `translate(150, 150)`)
            .attr("d", d3.geoPath());

        // svg
        //     .append("g")
        //     .selectAll("circle")
        //     .data(_data)
        //     .join("circle")
        //     .attr("cx", (d) => x(d[0]))
        //     .attr("cy", (d) => y(d[1]))
        //     .attr("r", 1.5);
    }

    onMount(async () => {
        const data = await loadDataAndComputeDensity();
        renderPlot(svgContainer, data);
    });
</script>

<div>
    <svg viewBox="0 0 300 300" bind:this={svgContainer}> </svg>
</div>

<style>
    svg {
        width: 300px;
        height: 300px;
    }
</style>
