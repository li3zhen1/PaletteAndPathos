
import _Artworks from "./Artworks.json"
import { promises as fs } from "fs"

import { getLifeDescription, formatName, formatMoMAName } from "./generateLifeAbstract"

import ErrorNames from "./results/ChatGPT_new/errorNames_moma.json"



const paintingArtworks = (_Artworks as any[]).filter(it => it["Classification"] == "Painting")





let artists: string[] = paintingArtworks.flatMap(it => it["Artist"])
artists = [...new Set(artists)]


console.log("artists Count: ", artists.length)


const runName = async name => {
    let json = (await getLifeDescription(name))
    console.log(json)
    await fs.writeFile(`./results/ChatGPT_new/moma/${name}.json`,
        JSON.stringify(json.choices.map(it => JSON.parse(it.message.content as string)), null, "\t"))
}

const errorNames: string[] = []

for (let i = 0; i < artists.length; i++) {
    const name = artists[i];
    console.log(`[${i}/${artists.length}] ${name}`)
    try {
        await runName(name)
    }
    catch (e) {
        console.error(e)
        errorNames.push(name)
    }
}

// save error names
await fs.writeFile(`./results/ChatGPT_new/errorNames_moma.json`, JSON.stringify(errorNames, null, "\t"))
