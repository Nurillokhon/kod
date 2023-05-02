import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Maxsulotlar = () => {
    const [mass, setmass] = useState([]);
    const [card, setcard] = useState([]);
    useEffect(() => {
        axios.get('https://api.npoint.io/91f8cc84c96d8dc2f347')
            .then(res => {
                setmass(res.data)
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    const dec = (i) => {
        let current = [...mass]

        if (current[i].count > 1) {
            current[i].count -= 1
            setmass(current)
        }
        else {
            current[i].count = 0
            setmass(current)
            card.map((item , index )=>{
                if(item.count === 0){
                    console.log('sss');
                    card.splice(index , 1)
                }
            })
        }

    }
    
    const inc = (i) => {
        let current = [...mass]
        current[i].count += 1
        setmass(current)

        if(card.length>0){
            let sanoq = 0
           card.map(item=>{
            if(item.name === current[i].name){
                sanoq++
            }
           }) 
            if(sanoq >0){
                console.log('salom');
            }
            else{
                card.push(current[i]) 
                console.log("2");
            }    
        }else{
            card.push(current[i])
            console.log('1');
        }
    }
    console.log(card);
    return (
        <div className='row'>
            {
                (mass) ? mass.map((item, index) => {
                    return (
                        <div key={index} className='col-4 my-2 '>
                            <div className='card'>
                                <img src={item.src} alt={item.name} />
                                <h1>{item.name}</h1>
                                <h3>{item.price}</h3>
                                <div className='d-flex justify-content-evenly'>
                                    <button className='btn btn-danger' onClick={() => dec(index)}>-</button>
                                    <h4>{item.count}</h4>
                                    <button className='btn btn-primary' onClick={() => inc(index)}>+</button>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div>lodading...</div>
            }
            <div className='row'>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    {
                        (card) && card.map((item , index)=>{
                            return(
                                <div key={index}>
                                    <h1>{item.name}</h1>    
                                    <p>{item.count}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Maxsulotlar;
