import { useEffect, useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  onColorChange: (color: string, key: string) => void;
  colorKey: string;
  initialColor: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorChange,
  colorKey,
  initialColor,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    onColorChange(color.hex, colorKey);
  };
  const colorStyle = {
    width: '49px',
    height: '30px',
    borderRadius: '2px',
    background: `${color}`,
  };
  const swatch = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={swatch} onClick={handleClick}>
        <div style={colorStyle} />
      </div>
      {displayColorPicker && (
        <div
          style={{
            position: 'absolute',
            zIndex: '2',
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
