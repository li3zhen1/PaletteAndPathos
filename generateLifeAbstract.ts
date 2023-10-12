import { OpenAI } from "openai";
import process from "process";
import { promises as fs } from "fs";
import _Artists from "./Artists.json"

console.log("Using API Key: ", process.env.OPENAI_API_KEY)

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


async function getLifeDescription(artistName: string) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system', content: `
You’re a helpful and clever assistant who knows artists and art history well. 

Your input will always be a single name of artist, and your output must always be in JSON format with the following structure:

type LifePeriod = {
    start: number,     // four digit year
    end: number,       // four digit year
    happiness: number, // 0-10, 0 for tragic, 5 for normal, 10 for happy. If he had disease, war, or his loved ones died, happiness should be lower than 5.
    location: string,  // city
    events: string[]   // list 0-2 important events, e.g. "met his wife", "won a prize"
}

type ArtistLife = {
    name: string,
    lifePeriods: LifePeriod[], // an array consisting of detailed 3-10 life periods, in chronological order, as detailed as possible
    genre: string[],           // list of 1-3 genres that he's known for
}

If you don't know well about the artist, reply with "{}".
`
            },
            { role: 'user', content: artistName },
        ],
        model: 'gpt-4'
    })
    return chatCompletion
}



let namesFromWikiArt = [
    "rembrandt",
    "claude-monet",
    "vincent-van-gogh",
    "nicholas-roerich",
    "gustave-dore",
    "eugene-boudin",
    "paul-cezanne",
    "camille-pissarro",
    "ivan-aivazovsky",
    "ilya-repin"
]

// from gustave-dore to Gustave Dore
const formatName = (name: string) => name.split("-").map(it => it[0].toUpperCase() + it.slice(1)).join(" ")

// reverse
const formatMoMAName = (name: string) => name.split(" ").map(it => it[0].toLowerCase() + it.slice(1)).join("-")

// namesFromWikiArt.forEach(async name => {
//     let json = (await getLifeDescription(formatName(name)))
//     console.log(json)
//     await fs.writeFile(`./generated/${name}.json`,
//         JSON.stringify(json.choices.map(it => JSON.parse(it.message.content as string)), null, "\t"))
// })



const FilteredArtists = _Artists.filter(it => it.BeginDate <= 1900 && it.EndDate > 0)
console.log("FilteredArtists Count: ", _Artists.length)
// randomly choose 10 artists from DiedArtists, and 10 from FilteredArtists
const FilteredArtistsRandom = FilteredArtists.sort(() => Math.random() - Math.random()).slice(0, 10)
FilteredArtistsRandom.forEach(async artist => {
    let json = (await getLifeDescription(artist.DisplayName))
    console.log(json)
    await fs.writeFile(`./generated/moma/${formatMoMAName(artist.DisplayName)}.json`,
        JSON.stringify(json.choices.map(it => JSON.parse(it.message.content as string)), null, "\t"))
})

