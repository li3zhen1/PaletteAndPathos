<script lang="ts">
    import * as THREE from "three";
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

    const HALF_SIZE = 2e-2;

    function createMesh(
        data: ImageEmotionAndColorCutData[],
        axis: [
            EmotionKey | ColorCutKey | PCAKey,
            EmotionKey | ColorCutKey | PCAKey,
            EmotionKey | ColorCutKey | PCAKey
        ]
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
            color: 0x00ff00,
        });

        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    let plotContainer: HTMLDivElement;

    onMount(async () => {
        const data = await loadData();
        const mesh = createMesh(data, ["pca1", "pca2", "pca3"]);

        const scene = new THREE.Scene();
        scene.add(mesh);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer();

        renderer.setPixelRatio( window.devicePixelRatio );

        renderer.setSize(window.innerWidth, window.innerHeight);

        // renderer.setSize(window.innerWidth, window.innerHeight);
        // plotContainer.appendChild(renderer.domElement);
        plotContainer.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.z = 5;

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

<div>
    <h1>Plot3D</h1>
    <div id="plot3d" bind:this={plotContainer} />
</div>

<style>
    #plot3d {
        width: 50vw;
        height: 50vh;
        border: 1px solid black;
    }

    h1 {
        color: red;
    }
</style>
