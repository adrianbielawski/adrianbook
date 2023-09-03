import colorfulPalette from "./colorPalette.json";
import greyscalePalette from "./colorPaletteArray.json";
import { Button } from "./Button";

export default {
  title: "Color-picker/Examples",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
  },
  parameters: {
    colorPicker: {
      primaryPalette: "Colorful",
      palettes: [
        {
          name: "Colorful",
          palette: colorfulPalette,
        },
        {
          name: "Greyscale",
          palette: greyscalePalette,
        },
      ],
    },
  },
};

const Template = (args) => <Button {...args} />;

export const ColorPickerAddon = Template.bind({});
ColorPickerAddon.args = {
  primary: true,
  label: "Button",
  backgroundColor: "#ccc",
  textColor: "#333",
};
