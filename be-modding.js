// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, resolved, rejected } from 'be-enhanced/cc.js';
import { dispatchEvent as de } from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types' */
/** @import {Actions, PAP, AP, BAP, ObservingParameters} from './ts-refs/be-modding/types.d.ts' */

/**
 * @implements {Actions}
 * @implements {EventListenerObject}
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
        const {jsExpr, enhancedElement} = self;
        const eventHandlerClauses = jsExpr.split(reClause);
        const {splitOnce} = await import('trans-render/lib/splitOnce.js');
        const guid = `a_${crypto.randomUUID()}`;
        let scriptText = `
        document.currentScript['${guid}'] = {`;
        for(const clause of eventHandlerClauses){
            const eventMerge = splitOnce(clause, ':');
            scriptText += `${eventMerge[0]}: e => {
                const {h} = e;
                e.r = ${eventMerge[1]}
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
        for(const event in handlers){
            enhancedElement.addEventListener(event, this);
            enhancedElement.addEventListener(event, handlers[event]);
        }
        // console.log({jsExpr, eventHandlerClauses});
        
        console.log({handlers});
        return /** @type {PAP} */({
            resolved: true,
        });
    }

    /**
     * 
     * @param {Event} e 
     */
    async handleEvent(e){
        if(e instanceof EnhancedEvent){
            return;
        }
        const {type, target} = e;
        if(target instanceof HTMLElement){
            
            e.preventDefault();
            e.stopImmediatePropagation();
            /**
             * @type {Element | null | undefined}
             */
            let h = target.closest('[itemscope]');
            if(h){
                h = await (await import('trans-render/dss/getHostish.js')).getHostish(h);
            }
            if(!h){
                h = /** @type {any | undefined} */ (target.getRootNode()).host;
            }
            if(!h) throw 404;
            console.log({h});
            const evt = new EnhancedEvent(type, h);
            target.dispatchEvent(evt);
            const {r} = evt;
            if(r){
                Object.assign(h, r);
            }
        }

    }
}

await BeModding.bootUp();
export {BeModding}

export const reClause = /(?<!\?)\,(?![^{}]*\})/;

export class EnhancedEvent extends Event{
    /**
     * @type {EventTarget}
     */
    h;
    r;
    /**
     * 
     * @param {string} type 
     * @param {EventTarget} h 
     */
    constructor(type, h){
        super(type);
        this.h = h;
    }
}