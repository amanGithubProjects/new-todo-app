import React, { useState, useEffect } from 'react';
import "./style.css";
// import viteLogo from 'vite.svg'
// import { FiFeather } from "react-icons/fi";

const getLocalData = () =>{
    const list = localStorage.getItem("myToDoList");
    if(list){
        return JSON.parse(list);
    }else{
        return [];
    }
}

const Todos = () => {
  const [inputData, setInputData] = useState("");
  const [items , setItems] = useState(getLocalData());
  const [changeItem, setChangeItem] = useState("");
  const [togglebtn, setTogglebtn] = useState(false);

//   adding items

 const addItem = () =>{
    if(!inputData){
        alert("pls fill items")
    } else if(inputData && togglebtn){
        setItems(
            items.map((curElm)=>{
             if(curElm.id === changeItem){
                return {...curElm, name : inputData}
             }
             return curElm;
            })
        );

        setInputData([]);
        setChangeItem(null);
        setTogglebtn(false);
    }
    else{
        const  myNewInputData = {
            id: new Date().getTime().toString(),
            name : inputData
        }
        setItems([...items, myNewInputData]) ;
        setInputData("");
    }
 }

//  deleting items
  const deleteItem = (index) =>{
    const updatedItems = items.filter((curElm) =>{
        return curElm.id != index;
    });
    setItems(updatedItems);
  }

//   Editing Items

 const editItem = (index) =>{
  const edit = items.find((curElm) =>{
  return curElm.id === index;
  });

  setInputData(edit.name);
  setChangeItem(index);
  setTogglebtn(true);
 }

//   Remove all elements
   const removeall = () =>{
    setItems([]);
   }

//    local Storage.apply...
   useEffect(() => {
     localStorage.setItem("myToDoList", JSON.stringify(items));
   
     
   }, [items])
   
  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./reactLogo.jpg" alt="reactlogo" />
                <figcaption>Add your List here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='add 📝' className='form-control'
                  value = {inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  />
                  {togglebtn ? (<i className='far fa-edit add-btn' onClick={addItem}></i>) : (<i className='fa fa-plus add-btn' onClick={addItem}></i>) }
                {/* <i className='fa fa-plus add-btn' onClick={addItem}></i> */}
            </div>
            
            
            {/* show items */}
            <div className="showItems">
                {
                    items.map((curElm) =>{
                       return(
                        <div className="eachItem" key={curElm.id}>
                         <h2>{curElm.name}</h2>
                         <div className="todo-btn">
                         <i className='far fa-edit add-btn' onClick={() => editItem(curElm.id)}></i>
                         <i className='fas fa-trash-alt add-btn' onClick={() => deleteItem(curElm.id)}></i>   
                         </div>
                </div>
                       )
                    })  
                }
                
            </div>

            {/* remove all butons */}
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeall}>
                    <span>All Items</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todos