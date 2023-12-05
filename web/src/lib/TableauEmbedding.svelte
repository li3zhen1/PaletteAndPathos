<script lang="ts">
    export let src: string;
</script>

<div class="centered-wv">
    <tableau-viz
        toolbar="hidden"
        hide-tabs
        src={src}
    >
    </tableau-viz>

</div>

<style>
    .centered-wv {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-bottom: 6rem;
    }
</style>