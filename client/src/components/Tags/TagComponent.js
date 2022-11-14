import React from "react"
import { useState } from "react";
import './TagComponent.css';

let pressedArray = new Array(0,0,0,0,0,0);
let selectedTagsArray = [];
const Tags = () => {
    const buttonBackgroundColor = "white";
    const clickedButtonColor = "CornflowerBlue";
    const [ShadyButtonColor, setShadyButtonColor] = useState(buttonBackgroundColor);
    const [HillsButtonColor,setHillsButtonColor ] = useState(buttonBackgroundColor);
    const [PedButtonColor,setPedButtonColor ] = useState(buttonBackgroundColor);
    const [ShortButtonColor,setShortButtonColor ] = useState(buttonBackgroundColor);
    const [MediumButtonColor,setMediumButtonColor ] = useState(buttonBackgroundColor);
    const [LongButtonColor,setLongButtonColor ] = useState(buttonBackgroundColor);
  
   //array of tags that have been selected
    //Do I need to add something to ignore multiple presses?
    //Have button change color once pressed
    const selectShady = () => {
 
        if (pressedArray[0] === 0){
        setShadyButtonColor(clickedButtonColor);
        pressedArray[0] = 1;
        console.log(selectedTagsArray.push("shady")); 
    }
        console.info(pressedArray);
      
      console.log("shady tag pressed");
      console.info(selectedTagsArray);
  
    }

    const selectHills = () => {
        console.log("hills tag pressed");
        if (pressedArray[1] === 0){
        setHillsButtonColor(clickedButtonColor);
        console.log(selectedTagsArray.push("hills"));
        pressedArray[1]= 1; 
        }
        console.info(pressedArray);
      
        console.info(selectedTagsArray);
    
      }

      const selectPedestrian = () => {
        console.log("pedestrian tag pressed");
        if (pressedArray[2] === 0){
        setPedButtonColor(clickedButtonColor);
        console.log(selectedTagsArray.push("pedestrian")); 
        pressedArray[2] = 1;
        }
       console.info(pressedArray);
        console.info(selectedTagsArray);
    
      }

      const selectShort = () => {
        if (pressedArray[3] === 0){
        setShortButtonColor(clickedButtonColor);
        selectedTagsArray.push("short"); 
        pressedArray[3] = 1;
        }
        console.log("short tag pressed");
        console.info(selectedTagsArray);
    
      }

      const selectMedium= () => {
        if (pressedArray[4] === 0){
        setMediumButtonColor(clickedButtonColor);
        selectedTagsArray.push("medium"); 
        pressedArray[4] = 1;
        }
        console.log("medium tag pressed");
        console.info(selectedTagsArray);
    
      }

      const selectLong= () => {
        if (pressedArray[5] === 0){
        setLongButtonColor(clickedButtonColor);
        selectedTagsArray.push("long");
        pressedArray[5] = 1;
        } 
        console.log("long tag pressed");
        console.info(selectedTagsArray);
    
      }

      const selectClear= () => {

        
        setShadyButtonColor(buttonBackgroundColor);
        setHillsButtonColor(buttonBackgroundColor);
        setPedButtonColor(buttonBackgroundColor);
        setShortButtonColor(buttonBackgroundColor);
        setMediumButtonColor(buttonBackgroundColor);
        setLongButtonColor(buttonBackgroundColor);
        for (var i = 0; i <pressedArray.length; ++i){
            pressedArray[i] = 0;
        }
        console.info(selectedTagsArray);
        selectedTagsArray.length = 0; 
        console.log("clear tag pressed");
        console.info(pressedArray);
        console.info(selectedTagsArray);
    
      }

    return(
        <div className= "main-wrapper">
           
         
            <button className="shady" onClick={selectShady}style={{ background: ShadyButtonColor }}>
                Shady
            </button>
            <button className="hills" onClick={selectHills}style={{ background: HillsButtonColor }}>
                Hills
            </button>
           
            <button className="pedestrian" onClick={selectPedestrian}style={{ background: PedButtonColor }}>
                Pedestrian Friendly
            </button>
            <button className="short" onClick={selectShort}style={{ background: ShortButtonColor }}>
                Short
            </button>
            <button className="medium" onClick={selectMedium}style={{ background: MediumButtonColor }}>
                Medium
            </button>
            <button className="long" onClick={selectLong}style={{ background: LongButtonColor }}>
                Long
            </button>
            <button className="clear" onClick={selectClear}>
                Clear Selection
            </button>
        </div>
    )
}

export default Tags