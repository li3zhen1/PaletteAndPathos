<script lang="ts">
    import { onMount } from "svelte";

    // var divElement = document.getElementById("viz1701530768373");
    // var vizElement = divElement.getElementsByTagName("object")[0];
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
            vizElement.style.height = "727px";
        }
        var scriptElement = document.createElement("script");
        scriptElement.src =
            "https://public.tableau.com/javascripts/api/viz_v1.js";
        vizElement.parentNode?.insertBefore(scriptElement, vizElement);
    });
</script>

<div class="slide-root">
    <h1>Dot Plot</h1>

    <div class="webview-container">
        <div
            class="tableauPlaceholder"
            id="viz1701530768373"
            style="position: relative"
            bind:this={divElement}
        >
            <noscript
                ><a href="#"
                    ><img
                        alt="Dashboard 3 "
                        src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CS&#47;CS6730DotPlot&#47;Dashboard3&#47;1_rss.png"
                        style="border: none"
                    /></a
                ></noscript
            ><object
                bind:this={vizElement}
                class="tableauViz"
                style="display:none;"
                ><param
                    name="host_url"
                    value="https%3A%2F%2Fpublic.tableau.com%2F"
                />
                <param name="embed_code_version" value="3" />
                <param name="site_root" value="" /><param
                    name="name"
                    value="CS6730DotPlot&#47;Dashboard3"
                /><param name="tabs" value="no" /><param
                    name="toolbar"
                    value="yes"
                /><param
                    name="static_image"
                    value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;CS&#47;CS6730DotPlot&#47;Dashboard3&#47;1.png"
                /> <param name="animate_transition" value="yes" /><param
                    name="display_static_image"
                    value="yes"
                /><param name="display_spinner" value="yes" /><param
                    name="display_overlay"
                    value="yes"
                /><param name="display_count" value="yes" /><param
                    name="language"
                    value="en-US"
                /></object
            >
        </div>
    </div>
</div>
