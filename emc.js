// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP, BAP} from './ts-refs/be-modding/types' */;

/**
 * @type {EMC<any, BAP>}
 */
export const emc = {
    base: 'be-modding',
    enhPropKey: 'beModding',
    map:{
        '0.0': {
            mapsTo: 'jsExpr',
            instanceOf: 'String'
        }
    },
    importEnh: async () => {
        const { BeModding } = 
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-modding.js'));
        return BeModding;
    }
}

const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);