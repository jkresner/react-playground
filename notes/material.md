### Icons

```js
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
```

#### SVG Icons

#### Font Icons (Icon Component)

```js
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

#### Font vs SVG

Some subtle differences, in performance and rendering quality. 

When possible SVG is preferred
- allows code splitting
- supports more icons
- renders faster and better

#### Icon accessibility

##### Decorative Icons 

Used for visual or branding reinforcement. 

If removed from the page, users would still be able to use page.

`aria-hidden=true` attribute is added so icons are properly accessible (invisible).

##### Semantic Icons 

Used to convey meaning, rather than just pure decoration. 

Includes icons without text next to them used as interactive controls 
— buttons
- form elements
- toggles, etc.

need to do is throw in a `titleAccess="meaning"` property. 

The `role="img"` attribute and `<title>` element are added to be properly accessible.
    
For focusable interactive elements, e.g. icon button, use the aria-label property:

``` js
import {IconButton,SvgIcon} from '@material-ui/core';

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```