import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle } from "react"
import { useState } from "react";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Tags from '../Tags/TagComponent';
//import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
//import { ThemeProvider, createTheme } from '@mui/material/styles';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const darkTheme = createTheme({
//     palette: {
//         type: 'dark',
//         primary: {
//           main: '#000000', //box border and small text
//         },
//         secondary: {
//           main: '##C72B43',
//         },
//         background: {
//             default: '#000000',
//             paper: '#FFFFFF', //color of back of menu
//         },
//         text: {
//           primary: '#000000', //color of text
//           secondary: '#000000', //color of first select tags
//           disabled: '#ffebee',
//           hint: '#fafafa',
//         },
//         divider: '#C72B43',
//       },

//       components: {
//         MuiChip: {
//           styleOverrides: {
//             colorPrimary: {
//               backgroundColor: 'red',
//             },
//             colorSecondary: {
//               backgroundColor: 'brown',
//             },
//           },
//         },
//       },
//   });

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const tags = [
    'Shady',
    'Pedestrian Friendly',
    'Hills',
    'Scenic',
    'Short',
    'Medium',
    'Long',
  
];

function getStyles(name, selectedArray, theme) {
    return {
        fontWeight:
            selectedArray.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



const Dropdown = forwardRef(({ updateTags }, ref) => {

    const theme = useTheme();
    //array of selected tags
    const [selectedArray, setSelectedArray] = useState([]);

    useImperativeHandle(ref, () => ({
        clear() {
            //selectClear()
        }
    }))

    useEffect(() => {
        updateTags(selectedArray)
    }, [selectedArray])



    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedArray(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (


        <div>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <Select
            multiple
            displayEmpty
            value={selectedArray}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Tags</em>;
              }
  
              return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem disabled value="">
              <em>Select Tags</em>
            </MenuItem>
            {tags.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectedArray, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


    )

})


export default Dropdown

//https://mui.com/material-ui/react-select/ 