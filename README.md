# be-modding (🕴️) 

Modify DOM element host when events fire, in a CSP safe way.

## Alternatives

To invoke a method, consider using [be-invoking](https://github.com/bahrus/be-invoking), or the platform.

```html
<my-component itemscope>
    <div itemprop=likes></div>
    <button be-modding="
        click: {likes: h.likes + 1}">
        Like
    </button> 
    <button be-modding="
        click: {likes: h.likes - 1}">
        Dislike
    </button>
    <button be-modding="
        click: {likes: 0}">
        Reset
    </button>
    <xtal-element 
        prop-defaults='{
            "likes": 0
        }'
        xform='{
            "div": "likes"
        }'
    ></xtal-element>
</my-component>
```

or

```html
<my-component itemscope>
    <div itemprop=likes></div>
    <button 🕴️="
        click: {likes: h.likes + 1}">
        Like
    </button> 
    <button 🕴️="
        click: {likes: h.likes - 1}">
        Dislike
    </button>
    <button 🕴️="
        click: {likes: 0}">
        Reset
    </button>
    <xtal-element 
        prop-defaults='{
            "likes": 0
        }'
        xform='{
            "div": "likes"
        }'
    ></xtal-element>
</my-component>
```

To add different event handlers separate by commas.

## Peer modding [TODO]

```html
<my-component itemscope>
    <data value=0 itemprop=likes></data>
    <my-peer-element></my-peer-element>
    <button 🕴️="{click: ['~myPeerElement', {likes: h.likes + 1}]}">
    <xtal-element infer-props></xtal-element>
</my-component>
```

use p for peer?

[TODO] prevent setting innerHTML, outerHTML