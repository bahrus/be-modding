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
        const eventHandlerClauses = jsExpr.split(reClause);
        const {splitOnce} = await import('trans-render/lib/splitOnce.js');
        const guid = `a_${crypto.randomUUID()}`;
        let scriptText = `
        document.currentScript['${guid}'] = {`;
        for(const clause of eventHandlerClauses){
            const eventMerge = splitOnce(clause, ':');
            scriptText += `${eventMerge[0]}: e => {
                const {h} = e;
                return ${eventMerge[1]}
            } ,`;
            console.log({eventMerge});
        }
        scriptText += `
    }`;
        const script = document.createElement('script');
        script.innerHTML = scriptText;
        console.log({scriptText});
        document.head.appendChild(script);
        const handlers = script[guid];
        // console.log({jsExpr, eventHandlerClauses});
        
        console.log({handlers});
        return /** @type {PAP} */({
            resolved: true,
        });
    }
}

await BeModding.bootUp();
export {BeModding}

export const reClause = /(?<!\?)\,(?![^{}]*\})/;