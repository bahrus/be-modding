# be-modding
Modify DOM element host when events fire

```html
<my-component itemscope>
    <div itemprop=likes>0</div>
    <button be-modding="click: {likes: h.likes + 1}">Like</button> 
    <button be-modding="click: {likes: h.likes - 1}">Dislike</button>
    <button 🕴️="click: {likes: 0}">Reset</button>
    <xtal-element infer-props></xtal-element>
</my-component>
```
