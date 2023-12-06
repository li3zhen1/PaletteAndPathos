<script lang="ts">
    import { onMount } from "svelte";

    export let src: string;
    export let descHeader: string | undefined;

    let tableauRef: HTMLDivElement;

    // let resizeObserver: ResizeObserver;
    // let tableauRect: DOMRect;
    // let scrollHeight: number;

    // onMount(() => {
    //     // window.addEventListener("scroll", (ev) => {
    //     //     scrollHeight = document.body.scrollHeight;
    //     // });
    //     // resizeObserver = new ResizeObserver((entries) => {
    //     //     tableauRect = entries[0].contentRect;
    //     // });
    // });
</script>

<section class="flex justify-center">
    <div class="centered-wv p-4 gap-4" >
        <div
            bind:this={tableauRef}
            class="shadow-xl bg-white border-[0.5px] rounded-lg border-slate-300 overflow-hidden flex-grow flex-shrink-0"
        >
            <tableau-viz toolbar="hidden" hide-tabs {src}> </tableau-viz>
        </div>
        <div class="flex-grow-0">
            <div
                class="p-4 pt-0 bg-white shadow-lg border-[0.5px] rounded-lg border-slate-300 overflow-hidden h-auto sticky top-4"
            >
                {#if descHeader}
                    <h2 class="mt-5">{descHeader}</h2>
                {/if}
                <slot>
                    <p>hello</p>
                </slot>
            </div>
        </div>
    </div>
</section>

<style>
    .centered-wv {
        display: flex;
        justify-content: center;
        /* align-items: center; */
        height: 100%;
        margin-bottom: 48px;
        max-width: 1400px;
        /* background-color: white; */
    }
    h2 {
        line-height: 1.2;
    }
</style>
