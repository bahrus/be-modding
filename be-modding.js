// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, resolved, rejected } from 'be-enhanced/cc.js';
import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types' */
/** @import {Actions, PAP, AP, BAP, ObservingParameters} from './ts-refs/be-modding/types.d.ts' */

/**
 * @implements {Actions}
 */
class BeModding extends BE {
    de = de;
    /**
     * @type {BEConfig<BAP, Actions & IEnhancement, any>}
     */
    static config = {
        propInfo:{
            jsExpr: {},
        },
        compacts:{
            when_jsExpr_changes_invoke_processJS: 0,
        },
        positractions: [
            resolved, rejected
        ]
    }
    /**
     * 
     * @param {BAP} self 
     */
    async processJS(self){
        const {jsExpr} = self;
        const split = jsExpr.split(reClause);
        console.log({jsExpr, split});

        return /** @type {PAP} */({
            resolved: true,
        });
    }
}

await BeModding.bootUp();
export {BeModding}

export const reClause = /(?<!\?)\,(?![^{}]*\})/;