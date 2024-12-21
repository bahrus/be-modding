# be-modding (🕴️) [TODO]

Modify DOM element host when events fire

```html
<my-component itemscope>
    <data value=0 itemprop=likes></data>
    <button be-modding="click: {likes: h.likes + 1}">Like</button> 
    <button be-modding="click: {likes: h.likes - 1}">Dislike</button>
    <button be-modding="click: {likes: 0}">Reset</button>
    <xtal-element infer-props></xtal-element>
</my-component>
```

or

```html
<my-component itemscope>
    <data value=0 itemprop=likes></data>
    <button 🕴️="click: {likes: h.likes + 1}">Like</button> 
    <button 🕴️="click: {likes: h.likes - 1}">Dislike</button>
    <button 🕴️="click: {likes: 0}">Reset</button>
    <xtal-element infer-props></xtal-element>
</my-component>
```

To add different event handlers separate by commas