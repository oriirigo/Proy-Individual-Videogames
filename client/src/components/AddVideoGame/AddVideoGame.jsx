import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../actions";


function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Name required"
    }
    if (!input.description) {
        errors.description = "Complete description"
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating valid 0 - 5"
    }
    if (!input.released) {
        errors.released = "Complete date"
    } else if (!/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/.test(input.released)) { //eslint-disable-line
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



    //----------Inputs---------
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
    //-----Select genres----
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
    //-----Select platfroms----
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

    //---------Send form--------
    function handleSubmit(e) {
        if (input.name === "") {
            e.preventDefault()
            alert("Completar correctamente el formulario")
        } else {
            e.preventDefault();
            dispatch(postVideogame(input))
            alert("Videojuego Creado!!")
            setInput({
                name: "",
                description: "",
                platforms: "",
                released: "",
                rating: "",
                image: "",
                genres: [],
                platforms: [] //eslint-disable-line
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
        <div >
            <h1 >CREATE GAME</h1>
            <form  onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label >Name</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.name && (
                            <p> {errors.name} </p>
                        )
                    }
                </div>

                <div>
                    <label >Rating</label>
                    <input
                  
                        type="number"
                        name="rating"
                        value={input.rating}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.rating && (
                            <div > {errors.rating} </div>
                        )
                    }
                </div>

                <div>
                    <label >Release Date</label>
                    <input
                        
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        errors.released && (
                            <div > {errors.released} </div>
                        )
                    }
                </div>

                <div >
                    <label  >Image:</label>
                    <input
                     
                        type="url"
                        name="image"
                        value={input.image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div>
                    <label  >Description</label>
                    <textarea
                        type="text"
                        value={input.inputDescription}
                        name="description"
                        onChange={(e) => handleInputChange(e)}
                        rows="5" cols="45"
                    />
                    {
                        errors.description && (
                            <p > {errors.description} </p>
                        )
                    }
                </div>

                <div  >
                    <label >Platforms</label>
                    <select  onChange={(e) => handlePlatformsSelect(e)}>
                        {
                            platforms?.map((e) => (
                                <option value={e.name} key={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                    <ul><li>{input.platforms?.map(el=>el +'/')}</li></ul> 
                    {
                        errors.platforms && (
                            <p  > {errors.platforms} </p>
                        )
                    }
                </div >

                <div >
                    <label  >Genres</label>
                    <select onChange={(e) => handleGenreSelect(e)}>
                        {
                            genres?.map((e) => (
                                <option value={e.name} key={e.name}> {e.name} </option>
                            ))
                        }
                    </select>
                     <ul><li>{input.genres?.map(el=>el +'/')}</li></ul> 
                    {
                        errors.genres && (
                            <p > {errors.genres} </p>
                        )
                    }
                </div>
                {
                    errors && (errors.name || errors.rating || errors.description || errors.genres || errors.platforms) ?
                        <p >Complete Form</p>
                        :
                        <button
                            type="submit"
                        
                        >ADD VIDEOGAME
                        </button>
                }
            </form>
             <Link to="/home">
                <button>Home</button>
            </Link> 
        </div>
        </>
    )
}