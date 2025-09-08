# be-modding (🕴️) 

Modify DOM element host when events fire, in a CSP safe way.

## Alternatives

To invoke a method, consider using [be-invoking](https://github.com/bahrus/be-invoking), or the platform.

To pass data between peer components, programmatically, use be-mediating [TODO]

## Declarative Modifications [TODO]

```html
<my-component itemscope>
    <div 🔭 itemprop=likes></div>
    <button be-modding="on click inc likes byAmt `1`">Like</button>
    <button be-modding="inc likes byAmt `-1`">Dislike</button>
    <button be-modding="set likes to `0` as number">Reset</button> <!-- prevent setting property ending with HTML -->
    <button be-modding="toggle isHappy">Toggle Mood</button>
    <xtal-element 
        prop-defaults='{
            "likes": 0,
            "isHappy": true,
        }'

    ></xtal-element>
</my-component>
```

As we can see, specifying the event is optional.  For buttons, it is assumed to be "click", and for input elements it is assumed to be "input".

## CSP Safe Scripting Modifications

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


