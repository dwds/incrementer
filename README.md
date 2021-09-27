# Incrementer Field

> An incrementable number input, with associated increment buttons, label, and helper text

This is a portfolio example of how I might build an accessible input for a component library using React and [Material-UI](https://mui.com/).

The component builds upon the patterns of Material-UI, and comes with additional built-in features like **keyboard shortcuts**, **validation and error messages**, recommended **WAI-ARIA practices** for [spinbutton widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton), a **unique id** for associating the label/input/helper-text, and **fully customizable and themable styling**.

## Demo
View a live demo at https://derekds.com/dev/incrementer/


## Accessibility

The Incrementer component was developed in accordance with the [WAI-ARIA Authoring Practices for spinbuttons](https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton).

- The **label and helperText are associated with the input** via the `for` and `aria-describedby` attributes, respectively. This is done with an automatically genrated unique `id` using uuid. You can pass in your own id instead, if needed.
- The `<input>` element has the **spinbutton role** (inherent to `<input type="number">`).
- The **aria attributes** `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are automatically applied to the `<input>` element. If needed, `aria-valuetext` can be set via the `userFriendlyValue` prop.
- The `**aria-invalid**` attribute is automatically set to `true` if either the input is invalid due to validation contsraints or the `error` prop is explicitly set to `true`.
- **Keyboard shortcuts**:
    - Arrow Up: Increase the value by one step.
    - Arrow Down: Decrease the value by one step.
    - Page Up: Increase the value by five steps (customizable via the `stepLarge` prop).
    - Page Down: Decrease the value by five steps (customizable via the `stepLarge` prop).
    - Home: If the input has a minimum value, set the value to its minimum.
    - End: If the input has a maximum value, set the value to its maximum.
- The **value may be directly edited** via the keyboard.
- The increase/decrease buttons excluded from the page **Tab sequence** because they are redundant with the arrow key support provided to keyboard users.
- **Validation constraints** (`min`, `max`, `step`, and `required`) are passed to the `<input>` element as HTML attributes, making them machine readable for browsers and screen readers.
- The input is **prevented from being set to an invalid value** via the keyboard shortcuts or by activating the increment/decrement buttons. (This relies on the browser's implementation of `<input type="number">`.) An invalid value may still be typed manually.
- When the value is invalid, a **descriptive error message** is displayed directly below the input. This relies on the browser's native HTML validation, which (in modern browsers) provides a dynamic and specific message based on the current value and the constraints. If you would like to customize the error message, you can turn off this feature via the `disableBrowserErrorText` prop and pass in your own message via `helperText`.
- The hover, focus, error, and disabled **states have distinct styling**.
- **Contrast of text and border colors** has been adjusted, as the Material-UI defaults do not comply with WCAG criteria [1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG21/#non-text-contrast) or [1.4.6 Contrast (Enhanced)](https://www.w3.org/TR/WCAG21/#contrast-enhanced)

## Custom Styling

The appearance of the Incrementer component is completely customizable thanks to [Material-UI's styling solutions](https://v4.mui.com/customization/components/).

## Props

|Name|Type|Default|Description|
|--- |--- |--- |--- |
| `descreaseIcon` | `node` | `<RemoveCircleRounded>` | The icon component to use for the decrease button. |
| `disableBrowserErrorText` | `boolean` | `false` | By default, the helperText will display the native browser error message when the input is in an invalid state. If true, this feature will be disabled. |
| `increaseIcon` | `node` | `<AddCircleRounded>` | The icon component to use for the increase button. |
| `label` | `string` | | The input's label. This is required for accessibility. |
| `max` | `number` or `string` | `null` | The maximum valid value. |
| `min` | `number` or `string` | `0` | The minimum valid value. |
| `step` | `number` or `string` | `1` | The amount to increase or decrease the value with each increment. Also determines (along with min), what values are valid. |
| `stepLarge` | `number` or `string` | `5` | The amount to increase or decrease the value (as a multiple of step) when the value is incremented with the PgUp and PgDn keys. |
| `userFriendlyValue` | `string` | `null` | Used to provide aria-valuetext to the input element. This is only necessary if the numeric value represents another, more readable, value, like the name of a month. |
| `value` | `any` | `"0"` | The value of the input. |

Any other props supplied will be provided to the root element ([TextField](https://v4.mui.com/api/text-field/)).
