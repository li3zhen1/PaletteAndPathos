#set page(
  numbering: "1/1",
  margin: (x:0.75in, y: 0.75in, bottom: 0.5in),
  paper: "us-letter"
)
#set text(font: "SF-TrueType Pro Text", size:10.4pt)
#show raw: (str) => block(fill: rgb("#f8f9fb"), width: 100%, inset: (x:4pt,y:8pt), radius: 2pt, text(font:"SF Mono", str))
#set enum(
    numbering: it => text(features: ("tnum",), weight: "bold")[#(str(it)+".")]
)
#let blue_link(path, body) = link(path, underline(text(fill: rgb(20,100,200))[#body]))


// title & author
#align(center)[
  #text(size: 12pt)[
    = CS6730 Project Topic Proposal \ Tracing the Emotional and Chromatic Journeys of Artists
  ]
  #v(8pt)
  #text(size: 10pt)[
    #grid(
      columns: (auto, auto, auto, auto),
      row-gutter: 0pt,
      column-gutter: 32pt,
      
      [Bui, MinhChau], [Li, Zhen], [Bankata Mishra, Spriha], [Wang, Mingxun (Richard)]
      
    )
    #grid(
      columns: (auto, auto, ),
      column-gutter: 32pt,
      
      [Georgia Institute of Technology], 
      datetime.today().display("[month padding:none]/[day]/[year]")
    )
  ]
  #v(8pt)
]
\

1. *What is the problem and domain being addressed?*

  We aim to delve into the intertwined worlds of artists' life and their artworks. Specifically, we are addressing the perception that the lives of modern artists, as represented in the Museum of Modern Art (MoMA) #blue_link("https://www.moma.org/collection/")[collection], have been more cheerful or tragic than the classical artists we often associate with melancholy tales, such as Van Gogh. Alongside, we will be tracing the predominant colors in their artwork to infer if there’s any correlation between their life journey, emotion, and their styles, in terms of color. We also intend to associate colors in a broader context through time, and explore the dominant colors used over the past century, hypothesizing that periods like WWII might exhibit a preference for darker shades.
  
\

2. *Where is the data coming from and what are its characteristics?*


  #table(
  columns: (auto, 1fr),
  inset: 0pt,
  column-gutter: 8pt,
  row-gutter: 12pt,
  stroke: 0pt,
  
[*a.*],
[#blue_link("https://github.com/MuseumofModernArt/collection")[*The Museum of Modern Art (MoMA) Collection*]:  This data set has two part. The first Artists dataset contains 15,243 records, representing all the artists who have work in MoMA's collection. Another dataset contains 140,848 records, representing all of the works that have been accessioned into MoMA’s collection. Ideally we could narrow down to around 500 artists by filtering the fields and mannual selection. 
#text(size: 8pt, grid(
  columns: (1fr, 1fr),
gutter: 6pt,
  
  align(center, table(
  stroke: 0.5pt+gray,
  inset: 3pt,
  columns: (auto, auto),
  "ConstituentID", "41",
  "DisplayName","Berenice Abbott",
  "ArtistBio","American, 1898–1991",
  "Nationality", "American",
  "Gender", "Female",
  "BeginDate", "1898",
  "EndDate", "1991",
    "Wiki QID", "Q231861",
  "ULAN", "500020631"
)),
align(center, table(stroke: 0.5pt+gray,
inset: 3pt,
columns:(auto,auto),

  "Title", "...",
  "Artist", "...",
  "ArtistBio", "...",
  "Nationality", "...",
  "Gender", "...",
  "Date", "1896",
  "Classification", "Architecture",
  "DateAcquired", "1996-04-09",
  // "URL", "...",
  "ThumbnailURL", "<image URL>",

)
))
)

]



,
  
[*b.*],
[#blue_link("https://huggingface.co/datasets/huggan/wikiart")[*WikiArt Database*]: Similar to the MoMA, this dataset consist of 128 well-known artists and 81,444 pieces of visual art in the follwing format: 


#text(8pt, align(center, table(stroke: 0.5pt+gray,
inset: 3pt,
columns:(auto,auto,auto, auto),
  "image", "artist","genre","style",
   "<image>","...",
  "...", "...",
)))

For the image analysis, we plan to use the median cut quantization clustering algorithm similarly to the #blue_link("https://fredhohman.com/a-viz-of-ice-and-fire/")[Game of Thrones project].
],


  
[*c.*],
[*ChatGPT and Wikipedia*: We aim to explore the relation of artists' style and their life experiences. However, there is no such data describing the life of artists with structured format and visualizable metrics. To expand this textual context of our project, we want to leverage ChatGPT to generate textual data around the life events and "happiness score" of artists. By prompting GPT to output a structured JSON, we have examined around 19 valid examples using gpt-4 API (out of 30 names, where 11 names ChatGPT does not know well). 

The prompt and generated data is attached in #underline(text(fill: rgb(20,100,200))[@Appendix]).

Generating the JSON for Vincent van Gogh takes around \$0.035. This is cost-effective when considering up to 1000 artists. We had also experimented with gpt-3.5-turbo which is priced at roughly 1/25 the cost of gpt-4, but the quality did not match that of gpt-4. 

If we (or audiences) are interested in a new artist from MoMA collection, dumping Wikipedia into GPT might also be a good option.

], 

)


\


3. *Who would be interested in understanding this data better?*

  #table(
  columns: (auto, 1fr),
  inset: 0pt,
  column-gutter: 8pt,
  row-gutter: 12pt,
  stroke: 0pt,
  
[*a.*],
[*General public: * People can get insights into the emotional journeys of artists over time and learn about art history, and cultural studies. For the LLM generated part, it might be interesting to examine the visualization and compare it with one's own knowledge, approaching it with a dose of skepticism.
],
  
[*b.*],
[*Visualization Designer & Data Analysts: *Apart from the data visualization itself, we also consider it an experiment on how technologies like GPT could assist to expand the textual context for visual analytics on the missing data that we are really interested in. 

],
)

\

4. *What would these people want to know about the data and what kinds of questions would they like to have answered?*

  #table(
  columns: (auto, 1fr),
  inset: 0pt,
  column-gutter: 8pt,
  row-gutter: 12pt,
  stroke: 0pt,
  
[*a.*],
[How do the emotional life trajectories of modern artists compare with classical ones? Can we correlate an artist's palette with significant life events or emotional states?
],
  
[*b.*],
[How has the color palette changed over time, and different art movements and eras?],


[*c.*],
[Are LLMs trustworthy enough to generate textual data for a presentation-purposed visualization? How can we leverage LLMs to expand the textual context for visual analytics on the missing data that we are really interested in? 


],
)






#pagebreak()

#set heading(numbering: "A.")

#align(center)[= Appendix<Appendix>]
\

Below is the prompt and 6 examples from generated JSONs. The first 3 are well-known artists from WikiArt, the last 3 from MoMA collection. Names are randomly selected, except for Van Gogh.

\

== Prompt
\
 
You’re a helpful and clever assistant who knows artists and art history well. 

Your input will always be a single name of artist, and your output must always be in JSON format with the following structure:
```typescript
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
```

If you don't know well about the artist, reply with "{}".

\
\
\

#for name in (
    "vincent-van-gogh",
    "rembrandt",
    "claude-monet",
) {
    {
        [
            \ 
            == #name
        #raw(json.encode(json("./generated/wikiart/"+name+".json")), block: true, lang: "json")
        
        ]
        
    }
}

#for name in (
    "david-burliuk.json","henri-evenepoel.json","roger-fenton.json",
) {
    {
        [
            \ 
            == #name
        #raw(json.encode(json("./generated/moma/has_content/"+name)), block: true, lang: "json")
        
        ]
        
    }
}
