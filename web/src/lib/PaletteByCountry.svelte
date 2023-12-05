<script lang="ts">
    import { onMount } from "svelte";

    let divElement: HTMLDivElement;
    let vizElement: HTMLDivElement;

    onMount(() => {
        if (divElement.offsetWidth > 800) {
            vizElement.style.width = "1366px";
            vizElement.style.height = "795px";
        } else if (divElement.offsetWidth > 500) {
            vizElement.style.width = "1366px";
            vizElement.style.height = "795px";
        } else {
            vizElement.style.width = "100%";
            vizElement.style.height = "777px";
        }
        var scriptElement = document.createElement("script");
        scriptElement.src =
            "https://public.tableau.com/javascripts/api/viz_v1.js";
        vizElement.parentNode?.insertBefore(scriptElement, vizElement);
    });
</script>

<div class="slide-root">
    <h1>Colors Over the Years</h1>
    <div class="webview-container">
        <div
            class="tableauPlaceholder"
            id="viz1701735654292"
            style="position: relative"
            bind:this={divElement}
        >
            <noscript
                ><a href="#"
                    ><img
                        alt="Dashboard 2 "
                        src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pa&#47;PalettebyCountry&#47;Dashboard2&#47;1_rss.png"
                        style="border: none"
                    /></a
                ></noscript
            ><object class="tableauViz" style="display:none;"
                bind:this={vizElement}
                ><param
                    name="host_url"
                    value="https%3A%2F%2Fpublic.tableau.com%2F"
                />
                <param name="embed_code_version" value="3" />
                <param name="site_root" value="" /><param
                    name="name"
                    value="PalettebyCountry&#47;Dashboard2"
                /><param name="tabs" value="no" /><param
                    name="toolbar"
                    value="yes"
                /><param
                    name="static_image"
                    value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pa&#47;PalettebyCountry&#47;Dashboard2&#47;1.png"
                /> <param name="animate_transition" value="yes" /><param
                    name="display_static_image"
                    value="yes"
                /><param name="display_spinner" value="yes" /><param
                    name="display_overlay"
                    value="yes"
                /><param name="display_count" value="yes" /><param
                    name="language"
                    value="en-US"
                /><param name="filter" value="publish=yes" /></object
            >
        </div>
    </div>
</div>
