import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../actions";
import Styles from './AddVideoGame.module.css'


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    if (!input.description) {
        errors.description = "Complete description"
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Valid rating 0 - 5"
    }
    if (!input.released) {
        errors.released = "Complete date"
    } else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.released)) { 
        errors.released = "Format error (dd//mm/yy)"
    } else {
        errors.released = ""
    }
    if (input.platforms.length < 1) {
        errors.platforms = "Enter platforms"
    } else {
        errors.platforms = ""
    }
    if (input.genres.length < 1) {
        errors.genres = "Enter genres"
    } else {
        errors.platforms = ""
    }
    return errors
}


export default function AddVideoGame() {
    const dispatch = useDispatch()
    const navegate=useNavigate()

    const genres = useSelector((state) => state.genres)
    const platforms = useSelector((state) => state.platforms)


    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        genres: [],
        platforms: []
    })



    //Inputs
    function handleInputChange(e) {
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    //Select genres
    function handleGenreSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.genres]: e.target.value
        }))
    }
    //Select platfroms
    function handlePlatformsSelect(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.platforms]: e.target.value
        }))
    }

    //Send form
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Complete form correctly")
        } else {
            e.preventDefault();
            dispatch(postVideogame(input))
            alert("Videogame created!")
            setInput({
                name: "",
                description: "",
                platforms: "",
                released: "",
                rating: "",
                image: "",
                genres: [],
                platforms: [] 
            })
            navegate('/home')
        }
    }


    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms())

    }, [dispatch]);




    return (
        <>
        <div className={Styles.background}>
            <h1 className={Styles.h1}>CREATE YOUR VIDEOGAME</h1>
            <form  className={Styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={Styles.label} >Name</label>
                    <input
                        className={Styles.inputs}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p className={Styles.danger}> {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label className={Styles.label}>Rating</label>
                    <input
                  className={Styles.inputs}
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div className={Styles.danger}> {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label className={Styles.label} >Release Date</label>
                    <input
                        className={Styles.inputs}
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.released && (
                            <div className={Styles.danger}> {errors.released} </div>
                        )
                    }
                </div>

                <div >
                    <label className={Styles.label} >Image:</label>
                    <input
                    className={Styles.inputImage}
                        type="url"
                        name="image"
                        value={input.image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label className={Styles.label} >Description</label>
                    <textarea
                        type="text"
                        value={input.inputDescription}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="5" cols="45"
                    />
                    {
                        errors.description && (
                            <p className={Styles.danger}> {errors.description} </p>
                        )
                    }
                </div>

                <div  className={Styles.platforms}>
                    <label className={Styles.labelPlatforms}>Platforms</label>
                    <select  className = {Styles.platGenreSelect} onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms?.map((e) => (
                                <option value={e.name} key={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul><li className={Styles.li}>{input.platforms?.map(el=>el +'/')}</li></ul> 
                    {
                        errors.platforms && (
                            <p className={Styles.danger} > {errors.platforms} </p>
                        )
                    }
                </div >

                <div className={Styles.genres} >
                    <label  className={Styles.labelGenre}>Genres</label>
                    <select className = {Styles.platGenreSelect}   onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres?.map((e) => (
                                <option value={e.name} key={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                     <ul><li className={Styles.li}>{input.genres?.map(el=>el +'/')}</li></ul> 
                     
                    {
                        errors.genres && (
                            <p className={Styles.danger}> {errors.genres} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms) ?
                        <p className={Styles.danger} >Complete Form</p>
                        :
                        <button
                            type="submit"
                            className={Styles.button}
                        >ADD VIDEOGAME
                        </button>
                }
            </form>
             <Link to="/home">
                <button  className={Styles.buttonVolver} >Home</button>
            </Link> 
        </div>
        </>
    )
}