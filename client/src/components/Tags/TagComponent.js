import React, { forwardRef, useEffect, useImperativeHandle } from "react"
import { useState } from "react";
import './TagComponent.css';
// import { components } from "react-select";

let pressedArray = new Array(0,0,0,0,0,0);
//let selectedTagsArray = [];
//array of selected tags

const Tags = forwardRef(({updateTags}, ref) => {
    //set button colors and selected colors
    const buttonBackgroundColor = "black";
    const clickedButtonColor = "DarkGoldenRod";
    const [ShadyButtonColor, setShadyButtonColor] = useState(buttonBackgroundColor);
    const [HillsButtonColor,setHillsButtonColor ] = useState(buttonBackgroundColor);
    const [PedButtonColor,setPedButtonColor ] = useState(buttonBackgroundColor);
    const [ShortButtonColor,setShortButtonColor ] = useState(buttonBackgroundColor);
    const [MediumButtonColor,setMediumButtonColor ] = useState(buttonBackgroundColor);
    const [LongButtonColor,setLongButtonColor ] = useState(buttonBackgroundColor);
  
    //array of selected tags
    const[selectedArray,setSelectedArray] = useState([]);
   
    useImperativeHandle(ref, () => ({
      clear() {
        selectClear()
      }
    }))

    useEffect(() => {
      updateTags(selectedArray)
    }, [selectedArray])

    const selectShady = () => {
 
        if (pressedArray[0] === 0){
        setShadyButtonColor(clickedButtonColor);
        setSelectedArray( arr => [...arr,"shady"]);
        pressedArray[0] = 1;
        //console.log(selectedArray.length);
        console.info(selectedArray);
        //console.log(this.useState.selectedArray);
        
        //console.log(selectedTagsArray.push("shady")); 
    }
        //console.info(pressedArray);
      
      console.log("shady tag pressed");
      //console.info(selectedTagsArray);
  
    }

    const selectHills = () => {
        console.log("hills tag pressed");
        if (pressedArray[1] === 0){
        setHillsButtonColor(clickedButtonColor);
        setSelectedArray( arr => [...arr,"hills"]);
        //console.log(selectedTagsArray.push("hills"));
        pressedArray[1]= 1; 
        console.info(selectedArray);
        }
        //console.info(pressedArray);
      
        //console.info(selectedTagsArray);
    
      }

      const selectPedestrian = () => {
        console.log("pedestrian tag pressed");
        if (pressedArray[2] === 0){
        setPedButtonColor(clickedButtonColor);
        setSelectedArray( arr => [...arr,"pedestrian"]);
        //console.log(selectedTagsArray.push("pedestrian")); 
        pressedArray[2] = 1;
        console.info(selectedArray);
        }
       //console.info(pressedArray);
        //console.info(selectedTagsArray);
    
      }

      const selectShort = () => {
        if (pressedArray[3] === 0){
        setShortButtonColor(clickedButtonColor);
        setSelectedArray( arr => [...arr,"short"]);
        //selectedTagsArray.push("short"); 
        pressedArray[3] = 1;
        console.info(selectedArray);
        }
        //console.log("short tag pressed");
        //console.info(selectedTagsArray);
    
      }

      const selectMedium= () => {
        if (pressedArray[4] === 0){
        setMediumButtonColor(clickedButtonColor);
        setSelectedArray( arr => [...arr,"medium"]);
       // selectedTagsArray.push("medium"); 
        pressedArray[4] = 1;
        console.info(selectedArray);
        }
        //console.log("medium tag pressed");
        //console.info(selectedTagsArray);
    
      }

      const selectLong= () => {
        if (pressedArray[5] === 0){
        setLongButtonColor(clickedButtonColor);
        setSelectedArray( arr => [...arr,"long"]);
       // selectedTagsArray.push("long");
        pressedArray[5] = 1;
        console.info(selectedArray);
        } 
        //console.log("long tag pressed");
        //console.info(selectedTagsArray);
    
      }

      const selectClear= () => {

        
        setShadyButtonColor(buttonBackgroundColor);
        setHillsButtonColor(buttonBackgroundColor);
        setPedButtonColor(buttonBackgroundColor);
        setShortButtonColor(buttonBackgroundColor);
        setMediumButtonColor(buttonBackgroundColor);
        setLongButtonColor(buttonBackgroundColor);
        setSelectedArray([]);
        console.info(selectedArray);
        for (var i = 0; i <pressedArray.length; ++i){
            pressedArray[i] = 0;
        }
        
        //selectedTagsArray.length = 0; 
        console.log("clear tag pressed");
        //console.info(pressedArray);
        //console.info(selectedTagsArray);
    
      }

    return(
        <div className= "tag-wrapper">
            {/* <div>{selectedArray.map( e =>
          <div>{ e }</div>
        )}
        </div> */}
         
            <button id="shady" onClick={selectShady}style={{ background: ShadyButtonColor }}value="Update">
                Shady
            </button>
            <button id="hills" onClick={selectHills}style={{ background: HillsButtonColor }}>
                Hills
            </button>
           
            <button id="pedestrian" onClick={selectPedestrian}style={{ background: PedButtonColor }}>
                Pedestrian Friendly
            </button>
            <button id="short" onClick={selectShort}style={{ background: ShortButtonColor }}>
                Short
            </button>
            <button id="medium" onClick={selectMedium}style={{ background: MediumButtonColor }}>
                Medium
            </button>
            <button id="long" onClick={selectLong}style={{ background: LongButtonColor }}>
                Long
            </button>
            <button id="clear" onClick={selectClear}>
                Clear Selection
            </button>
        </div>
    )
})

export default Tags