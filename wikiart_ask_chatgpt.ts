// read /Volumes/T7/wikiart/wikiart/classes.csv  get unique list from artist column


import _Artworks from "./Artworks.json"


import { getLifeDescription, formatName, formatMoMAName } from "./generateLifeAbstract"

// import ErrorNames from "./results/ChatGPT_new/errorNames_moma.json"
import ErrorNames from "./results/ChatGPT_new/errorNames_only_in_wiki_2.json"
import * as fs from 'fs/promises';
import * as path from 'path';

// const paintingArtworks = (_Artworks as any[]).filter(it => it["Classification"] == "Painting")


// import wiki_artists from './wikiart_artists.json';



// let moma_painting_artists: string[] = paintingArtworks.flatMap(it => it["Artist"])
// moma_painting_artists = [...new Set(moma_painting_artists)].map(it => it.toLowerCase()) 


// // count intersection 
// let intersection = 0
// let intersection_artists: string[] = []

// for (let i = 0; i < wiki_artists.length; i++) {
//     const artist = wiki_artists[i];
//     if (moma_painting_artists.includes(artist.toLowerCase())) {
//         intersection++
//         intersection_artists.push(artist)
//     }
// }

// // console.log("wiki: ", wiki_artists.length) // 1119
// // console.log("moma: ", moma_painting_artists.length) // 1069
// // console.log("intersection: ", intersection) // 227
// // console.log("intersection_artists: ", intersection_artists)


// const artists_only_in_wiki: string[] = wiki_artists.filter(it => !moma_painting_artists.includes(it.toLowerCase()))

// console.log("artists_only_in_wiki: ", artists_only_in_wiki.length)


const runName = async name => {
    let json = (await getLifeDescription(name))
    // console.log(json)
    await fs.writeFile(`./results/ChatGPT_new/only_wiki/${name}.json`,
        JSON.stringify(json.choices.map(it => JSON.parse(it.message.content as string)), null, "\t"))
}

const errorNames: string[] = []


async function runList(list: string[], li: number) {
    for (let i = 0; i < list.length; i++) {
        const name = list[i];
        console.log(`[${li}-${i}/${list.length}] ${name}`)
        try {
            await runName(name)
        }
        catch (e) {
            console.error(e)
            errorNames.push(name)
        }
    }
}

// split into 3 lists
const list1 = ErrorNames.slice(0, 200)
const list2 = ErrorNames.slice(200, 400)
const list3 = ErrorNames.slice(400)

await Promise.all([
    runList(list1, 1),
    runList(list2, 2),
    runList(list3, 3),
])


// save error names
await fs.writeFile(`./results/ChatGPT_new/errorNames_only_in_wiki_2.json`, JSON.stringify(errorNames, null, "\t"))



