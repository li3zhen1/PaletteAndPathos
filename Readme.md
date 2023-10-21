
Dataset and images used:

- Wikiart: https://www.kaggle.com/datasets/steubk/wikiart

- Moma: https://github.com/MuseumofModernArt/collection (require [git-lfs](https://git-lfs.com))
    - use `moma-img-crawl.ipynb` to download images
    - currently only using `Painting` category, 2078 images

## Results

### Color_cut

csv in `results/color_cut`, each of image are cut by 2, 4, 8 bins. In the files ending in `_cut_hex.csv`, the first column is the image ObjectID in Artworks.json, the (2nd, 3rd) columns are the hex color code from cutting by 2. (4th, 5th, 6th, 7th) columns are the hex color code from cutting by 4...






### Running `generateLifeAbstract.ts`:

0. Get your OpenAI API Key and reate a file named in the root directory with following format:
    ```env
    OPENAI_API_KEY=sk-blablabla
    ``` 

1. Install [Bun](https://bun.sh).

2. Install dependencies:
    ```bash
    bun install
    ```

3. Run the script:
    ```bash
    bun ./generateLifeAbstract.ts
    ```

