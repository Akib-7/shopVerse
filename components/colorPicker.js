import React, { useState } from 'react';

function ColorPicker({ colors }) {
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    return (
        <div className="flex space-x-4">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`w-4 h-4  cursor-pointer  ${selectedColor === 'white' ?  'border-[1px] border-black ' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    tabIndex={0}
                ></div>
            ))}
        </div>
    );
}
// function ColorPicker({ colors, onChange }) {
//     return (
//       <div>
//         {colors.map(color => (
//           <span 
//             key={color}
//             onClick={() => onChange(color)}
//             style={{
//               backgroundColor: color,
//               display: 'inline-block',
//               width: '20px',
//               height: '20px',
//               margin: '5px',
//               cursor: 'pointer',
//               border: '1px solid #ccc'
//             }}
//           ></span>
//         ))}
//       </div>
//     );
//   }
  
export default ColorPicker;
