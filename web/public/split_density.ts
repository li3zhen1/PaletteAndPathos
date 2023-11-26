import Density from './density.json';
import fs from 'fs';

Object.keys(Density).forEach((x) => {
    Object.keys(Density[x]).forEach((y) => {
        const _data = Density[x][y]
        // save to file `x_y.json`
        fs.writeFileSync(`./${x}_${y}.json`, JSON.stringify(_data))
    })
})