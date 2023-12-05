import fs from "fs/promises";


const combineJSON = async (p) => {
    const files = await fs.readdir(p);
    const data = await Promise.all(
        files.map(async (file) => {
            try {
                const content = await fs.readFile(`${p}/${file}`, "utf-8");
                
                const obj = JSON.parse(content)[0];
                if (obj !== undefined && obj !== null && Object.keys(obj).length > 0) {
                    return obj;
                }
                console.log(file);
                return undefined;
            }
            catch (e) {
                console.log(file);
                return undefined;
            }
        })
    );
    return data.filter((d) => d !== undefined);
    // await fs.writeFile("../results/all_wiki.json", JSON.stringify(data.filter((d) => d !== undefined)));
}

const all = {
    wiki: await combineJSON("../results/ChatGPT_new/only_wiki"),
    moma: await combineJSON("../results/ChatGPT_new/moma"),
}

await fs.writeFile("../results/combined.json", JSON.stringify(all));