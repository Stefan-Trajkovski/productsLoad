import { useEffect, useLayoutEffect, useRef, useState } from "react";
import React from "react";
import styles from './styles.css';

import { IoStorefront } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

function ProductsLoad() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const [clicked, setClicked] = useState(null);
    const modal = useRef(null);
    const window = useRef(null);
    const rButtonHome = useRef(null);
    const rButtonPick = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, [count])


    async function fetchProducts() {
        try {
            if(count==0){
            setLoading(true)}
            const resp = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20
                }`
            );
            const result = await resp.json();

            if (result && result.products && result.products.length) {

                // setProducts(result.products)
                setProducts((prevData) => {
                    return [...prevData, ...result.products]
                })
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    function iconCLick() {
        modal.current.style.display = 'none';
        window.current.style.pointerEvents = "auto";
        document.documentElement.style.backgroundColor = 'white';
    }
   
    function homeButton(object) {
        modal.current.style.display = 'block';
        rButtonHome.current.checked = true;
        rButtonPick.current.checked = false;
        setClicked(object);


        if (!modal.current.contains(window.current)) {
            window.current.style.pointerEvents = "none";
            modal.current.style.pointerEvents = "auto";
            document.documentElement.style.backgroundColor = 'rgba(0, 0, 0, .22)';
        }

    }


    function pickButton(object) {
        modal.current.style.display = 'block';
        rButtonHome.current.checked = false;
        rButtonPick.current.checked = true;
        setClicked(object);
        if (!modal.current.contains(window.current)) {
            window.current.style.pointerEvents = "none";
            modal.current.style.pointerEvents = "auto";
            document.documentElement.style.backgroundColor = 'rgba(0, 0, 0, .5)';
        }
    }

    function sortLowest() {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
    };
    function sortHighest() {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
    }
    if (loading) {
        return <div className="welcome-container">
            <h1>Welcome!</h1>
        </div>
    }

    return (


        <div ref={window} className="container">


            <div className="left">
                <div className="sortOrder">
                    <button onClick={sortLowest}>Price (Lowest first)</button>
                    <button onClick={sortHighest}>Price (Highest first)</button>
                </div>



                <div  ref={modal} className="modal">
                    <div className="box">



                        {products.map((x) => (
                            x === clicked ?
                                <React.Fragment key={x.id}>
                                    <div className="modal_delivery">
                                        <h3>Delivery </h3>
                                        <span onClick={iconCLick} className="modalClose"><AiOutlineClose /></span>
                                    </div>
                                    <hr></hr>

                                    <div className="modal_product">

                                        <div className="imageDiv"  >


                                            <img alt="thumbnail" src={x.thumbnail}></img>
                                        </div>

                                        <div className="ModalCardWrap">

                                            <div className="product-card__info">
                                                <div className="product-card_logo">
                                                    <img alt="logo" src="https://cdn.directtoolsoutlet.com/brands/RYOBI.png"></img>
                                                </div>


                                                <div className="product-card__title productFont">
                                                    <p>{x.title}</p>
                                                </div>
                                                <div className="product-card__desc productFont">
                                                    <p>{x.description}</p>
                                                </div>


                                                <div className="product-card__id productFont">
                                                    <p>{x.id}</p>
                                                </div>
                                                <div className="product-card__condition productFont">
                                                    <p>Factory Blemished</p>
                                                </div>

                                            </div>

                                            <div className="modControls product-card__controls">

                                                <div className=" modalPrice product-card_priceWrap productFont ">
                                                    <div className="wrap">
                                                        <div className="product-card_price">
                                                            {"$" + (x.price - (x.price * x.discountPercentage / 100)).toFixed(2)}
                                                            <span className="finalPrice">Final Price</span>


                                                        </div>
                                                        <div className=" modProduct-card_discount product-card_discount">
                                                            <span className="price"> {"$" + x.price}   </span>
                                                            <span className="discount">&nbsp;{parseInt(x.discountPercentage)}<span className="percentage">%</span> OFF</span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </React.Fragment>
                                : ""
                        ))}


                        <div className="modPickup">
                            <div className="modHome">
                                <input onChange={() => { rButtonPick.current.checked = false }} ref={rButtonHome} type="radio"></input>
                                <span className="modIcon1"><IoHome /></span>
                                <span>SHIP TO HOME</span>
                            </div>
                            <div>
                            </div>
                            <div className="modStorePickup" >
                                <input onChange={() => { rButtonHome.current.checked = false }} ref={rButtonPick} type="radio"></input>
                                <span className="modIcon2"><IoStorefront /></span>
                                <span>STORE PICKUP</span>
                            </div>
                        </div>

                        <div className=" modButtons">
                            <button>ADD & VIEW CART </button>
                            <button>ADD TO CART</button>
                        </div>



                    </div>

                </div>
            </div>

            <div className="right">
                {products && products.map((x, index) => (
                    <React.Fragment key={x.id}>
                        <hr />
                        <div  className="productContainer">

                            <div className="imageDiv"  >
                                <img alt="thumbnail" src={x.thumbnail}></img>
                            </div>

                            <div className="product-card__info">
                                <div className="product-card_logo">
                                    <img alt="logo" src="https://cdn.directtoolsoutlet.com/brands/RYOBI.png"></img>
                                </div>


                                <div className="product-card__title productFont">
                                    <p>{x.title}</p>
                                </div>
                                <div className="product-card__desc productFont">
                                    <p>{x.description}</p>
                                </div>


                                <div className="product-card__id productFont">
                                    <p>{x.id}</p>
                                </div>
                                <div className="product-card__condition productFont">
                                    <p>Factory Blemished</p>
                                </div>

                            </div>







                            <div className="product-card__controls">
                                <div className="product-card_priceWrap productFont">
                                    <div className="wrap">
                                        <div className="product-card_price">
                                            <span className="finalPrice">Final Price</span>

                                            {"$" + (x.price - (x.price * x.discountPercentage / 100)).toFixed(2)}

                                        </div>
                                        <div className="product-card_discount">
                                            <span className="price"> {"$" + x.price}   </span>
                                            <span className="discount">&nbsp;{parseInt(x.discountPercentage)}<span className="percentage">%</span> OFF</span>

                                        </div>
                                    </div>



                                </div>
                                <div className="product-card_buttons ">

                                    <button onClick={() => { homeButton(x) }}>SHIP TO HOME</button>
                                    <button onClick={() => { pickButton(x) }}>STORE PICKUP</button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ))}

                <div className="loadDiv">
                    {count === 4 ? false : true && <button onClick={() => (setCount(count + 1))} >Load more products</button>}
                </div>
            </div>
        </div>

    )
}

export default ProductsLoad;
