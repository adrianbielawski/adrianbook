import colorfullPalette from './colorPalette.json';
import greyscalePalette from './colorPaletteArray.json'
import { Button } from './Button';

export default {
  title: 'Color-picker/Examples',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
  parameters: {
    colorPalettes: {
      default: 'Colorfull',
      palettes: [
        {
          name: 'Colorfull',
          palette: colorfullPalette,
        },
        {
          name: 'Greyscale',
          palette: greyscalePalette,
        },
      ],
    },
    applyColorTo: [
      'backgroundColor',
      'textColor'
    ],
  }
};

const Template = (args) => <Button {...args} />;

export const ColorPickerAddon = Template.bind({});
ColorPickerAddon.args = {
  primary: true,
  label: 'Button',
  backgroundColor: '#ccc',
  textColor: '#333',
};
