<script lang="ts">
    import * as THREE from "three";

    // @ts-ignore
    import { Text } from "troika-three-text";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    import * as d3 from "d3";
    import { onMount } from "svelte";
    import {
        loadData,
        type ImageEmotionAndColorCutData,
        type EmotionKey,
        type ColorCutKey,
        type PCAKey,
    } from "./EmotionAndColorCutData";

    const HALF_SIZE = 1.5e-2;

    function createMesh(
        data: ImageEmotionAndColorCutData[],
        axis: [
            EmotionKey | ColorCutKey | PCAKey,
            EmotionKey | ColorCutKey | PCAKey,
            EmotionKey | ColorCutKey | PCAKey
        ],
        color: number = 0x303030,
        opacity: number = 1
    ) {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(data.length * 24);

        const indices: number[] = [];

        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            vertices[i * 24 + 0] = d[axis[0]] - HALF_SIZE;
            vertices[i * 24 + 1] = d[axis[1]] - HALF_SIZE;
            vertices[i * 24 + 2] = d[axis[2]] - HALF_SIZE;
            vertices[i * 24 + 3] = d[axis[0]] + HALF_SIZE;
            vertices[i * 24 + 4] = d[axis[1]] - HALF_SIZE;
            vertices[i * 24 + 5] = d[axis[2]] - HALF_SIZE;
            vertices[i * 24 + 6] = d[axis[0]] + HALF_SIZE;
            vertices[i * 24 + 7] = d[axis[1]] + HALF_SIZE;
            vertices[i * 24 + 8] = d[axis[2]] - HALF_SIZE;
            vertices[i * 24 + 9] = d[axis[0]] - HALF_SIZE;
            vertices[i * 24 + 10] = d[axis[1]] + HALF_SIZE;
            vertices[i * 24 + 11] = d[axis[2]] - HALF_SIZE;
            vertices[i * 24 + 12] = d[axis[0]] - HALF_SIZE;
            vertices[i * 24 + 13] = d[axis[1]] - HALF_SIZE;
            vertices[i * 24 + 14] = d[axis[2]] + HALF_SIZE;
            vertices[i * 24 + 15] = d[axis[0]] + HALF_SIZE;
            vertices[i * 24 + 16] = d[axis[1]] - HALF_SIZE;
            vertices[i * 24 + 17] = d[axis[2]] + HALF_SIZE;
            vertices[i * 24 + 18] = d[axis[0]] + HALF_SIZE;
            vertices[i * 24 + 19] = d[axis[1]] + HALF_SIZE;
            vertices[i * 24 + 20] = d[axis[2]] + HALF_SIZE;
            vertices[i * 24 + 21] = d[axis[0]] - HALF_SIZE;
            vertices[i * 24 + 22] = d[axis[1]] + HALF_SIZE;
            vertices[i * 24 + 23] = d[axis[2]] + HALF_SIZE;

            indices.push(i * 8 + 0);
            indices.push(i * 8 + 1);
            indices.push(i * 8 + 2);
            indices.push(i * 8 + 0);
            indices.push(i * 8 + 2);
            indices.push(i * 8 + 3);

            indices.push(i * 8 + 4);
            indices.push(i * 8 + 5);
            indices.push(i * 8 + 6);
            indices.push(i * 8 + 4);
            indices.push(i * 8 + 6);
            indices.push(i * 8 + 7);

            indices.push(i * 8 + 0);
            indices.push(i * 8 + 1);
            indices.push(i * 8 + 5);
            indices.push(i * 8 + 0);
            indices.push(i * 8 + 5);
            indices.push(i * 8 + 4);

            indices.push(i * 8 + 2);
            indices.push(i * 8 + 3);
            indices.push(i * 8 + 7);
            indices.push(i * 8 + 2);
            indices.push(i * 8 + 7);
            indices.push(i * 8 + 6);

            indices.push(i * 8 + 1);
            indices.push(i * 8 + 2);
            indices.push(i * 8 + 6);
            indices.push(i * 8 + 1);
            indices.push(i * 8 + 6);
            indices.push(i * 8 + 5);
            indices.push(i * 8 + 0);
            indices.push(i * 8 + 3);
            indices.push(i * 8 + 7);
            indices.push(i * 8 + 0);
            indices.push(i * 8 + 7);
            indices.push(i * 8 + 4);
        }

        geometry.setIndex(indices);

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
        );

        const material = new THREE.MeshBasicMaterial({
            color,
            side: THREE.DoubleSide,
            // opacity,
            // transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    function createAxis(
        axis: [
            EmotionKey | ColorCutKey | PCAKey,
            EmotionKey | ColorCutKey | PCAKey,
            EmotionKey | ColorCutKey | PCAKey
        ],
        color: number = 0x303030,
        halfSize: number = 10
    ) {
        const vertices = new Float32Array(18);

        vertices[0] = -halfSize;
        vertices[1] = 0;
        vertices[2] = 0;
        vertices[3] = halfSize;
        vertices[4] = 0;
        vertices[5] = 0;

        vertices[6] = 0;
        vertices[7] = -halfSize;
        vertices[8] = 0;
        vertices[9] = 0;
        vertices[10] = halfSize;
        vertices[11] = 0;

        vertices[12] = 0;
        vertices[13] = 0;
        vertices[14] = -halfSize;
        vertices[15] = 0;
        vertices[16] = 0;
        vertices[17] = halfSize;

        let meshes = [];

        for (let indices of [
            [0, 1],
            [2, 3],
            [4, 5],
        ]) {
            const geometry = new THREE.BufferGeometry();
            console.log(indices);
            geometry.setIndex(indices);

            geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(vertices, 3)
            );

            const material = new THREE.LineBasicMaterial({
                color,
            });

            const mesh = new THREE.Line(geometry, material);
            meshes.push(mesh);
        }
        return meshes;
    }

    function createAxisText(
        axisText: string,
        position: [number, number, number],
        rotation: [number, number, number] = [0, 0, 0]
    ) {
        // Create:
        const myText = new Text();

        // Set properties to configure:
        myText.text = axisText;
        myText.font = "/IBM_Plex_Sans/IBMPlexSans-Regular.ttf";
        myText.fontSize = 0.5;
        myText.position.set(...position);

        // rotate 90 degrees to face the camera
        myText.rotation.set(...rotation);
        
        myText.color = 0x78797a;

        // Update the rendering:
        // myText.sync();
        return myText;
    }

    let plotContainer: HTMLDivElement;
    let plotCanvas: HTMLCanvasElement;

    onMount(async () => {
        const data = await loadData();
        const axis = ["anger", "contentment", "amusement"] as any;
        const mesh = createMesh(
            data.filter((it) => it.category == "Moma"),
            axis,
            0xff9800,
            1
        );
        const mesh2 = createMesh(
            data.filter((it) => it.category != "Moma"),
            axis,
            0x3060ff,
            1
        );
        const axisMesh = createAxis(axis, 0xbcbcbc, 1000);

        const scene = new THREE.Scene();
        scene.add(mesh);
        scene.add(mesh2);
        scene.add(...axisMesh);

        const placement = [
            [5, 0, 0],
            [0, 5, 0],
            [0, 0, 8],
        ] as any;

        const rotation = [
            [0, Math.PI, 0],
            [0, Math.PI, 0],
            [0, Math.PI, 0],
        ] as any;

        axis.forEach((ax: string, i: number) => {
            const axisText = createAxisText(ax, placement[i], rotation[i]);
            scene.add(axisText);

            axisText.sync();
        });

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas: plotCanvas,
            antialias: true,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(plotCanvas.clientWidth, plotCanvas.clientHeight);

        // anti-aliasing
        renderer.setClearColor(0xffffff, 1);

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.z = -8;
        camera.position.y = 6;
        camera.position.x = -4;

        // @ts-ignore
        window.scene = scene;
        // @ts-ignore
        window.camera = camera;
        // @ts-ignore
        window.controls = controls;

        const animate = function () {
            requestAnimationFrame(animate);

            controls.update();

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    });
</script>

<div id="plot3d" bind:this={plotContainer}>
    <canvas bind:this={plotCanvas} />
</div>

<style>
    #plot3d {
        /* border: 1px solid black; */
    }

    canvas {
        /* border: 1px solid red; */
        width: 100vw;
        height: 100vh;
        display: block;
    }
</style>
