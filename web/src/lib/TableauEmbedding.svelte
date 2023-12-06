<script lang="ts">
    export let src: string;
</script>

<div class="centered-wv">
    <div class="shadow-xl  border-[0.5px] rounded-lg border-slate-300 overflow-hidden">
        <tableau-viz toolbar="hidden" hide-tabs {src}> </tableau-viz>
    </div>
</div>

<style>
    .centered-wv {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-bottom: 48px;
    }
</style>
