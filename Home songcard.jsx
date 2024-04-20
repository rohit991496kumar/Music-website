import { deleteObject, ref } from "firebase/storage";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { FaDownload } from "react-icons/fa";
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllAlbums, getAllArtists, getAllSongs } from "../api";
import { storage } from "../config/firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const HomeSongCard = ({ data, index, type }) => {



    const [isDelete, setISDelete] = useState(false)
    const [{ alertType, allArtists, allAlbums, allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue()

    //delete songs

    const deleteData = (data) => {
        if (
            type === "song") {
            const deleteRef = ref(storage, data.imageURL);
            deleteObject(deleteRef).then(() => {
            })

            deleteSongById(data._id).then((res) => {
                if (res.data) {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "success"
                    })
                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 3000);

                    getAllSongs().then((data) => {

                        dispatch({
                            type: actionType.SET_ALL_SONGS,
                            allSongs: data.songs
                        })
                    })
                } else {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "danger"
                    })
                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 3000);
                }
            })
        }

        //album

        if (
            type === "album") {
            const deleteRef = ref(storage, data.imageURL);
            deleteObject(deleteRef).then(() => {
            })

            deleteAlbumById(data._id).then((res) => {
                if (res.data) {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "success"
                    })
                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 3000);

                    getAllAlbums().then(data => {
                        dispatch({
                            type: actionType.SET_ALL_ALBUMS,
                            allAlbums: data.album,
                        })
                    })
                } else {
                    dispatch({
                        type: actionType.SET_ALERT_TYPE,
                        alertType: "danger"
                    })
                    setInterval(() => {
                        dispatch({
                            type: actionType.SET_ALERT_TYPE,
                            alertType: null,
                        })
                    }, 3000);
                }
            })
        }

        //artist

        if (
            type === "artist") {
            const deleteRef = ref(storage, data.imageURL);
            deleteObject(deleteRef).then(() => {
            })

            deleteArtistById(data._id).then((res) => {
                if (res.data) {


                    getAllArtists().then(data => {
                        dispatch({
                            type: actionType.SET_ALL_ARTISTS,
                            allArtists: data.artist,
                        })
                    })
                }
            })
        }
    };

    const addToContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (songIndex !== index) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            })
        }
    }

    return (
        <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer 
         hover:bg-card bg-gradient-to-b from-yellow-800 to-yellow-400 shadow-md rounded-lg flex flex-col items-center'
            onClick={type === 'song' && addToContext}
        >

            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg
            drop-shadow-lg relative overflow-hidden "
            >
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageURL} className="w-full h-full rounded-lg object-cover" />
            </div>

            <p className="text-base text-center   text-headingColor font-semibold my-2">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}

                {data.artist && (
                    <span className="block text-sm text-gray-100 my-1">
                        {data.artist.length > 25 ? `${data.a.slice(0, 25)}....`
                            : data.artist}</span>

                )}
            </p>




            <div className="w-full absolute bottom-2 right-2 flex items-center 
            justify-between px-4">

                <motion.i whileTap={{ scale: 0.76 }}
                    className="text-base text-red-400 drop-shadow-md 
                 hover:text-red-600"


                >

                    <FaDownload />
                </motion.i>
            </div>

            {isDelete && (

                <motion.div
                    className="absolute inset-0 backdrop-blur-md 
bg-cardOverlay items-center flex-col justify-center px-4 py-2 gap-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}

                >
                    <p className="text-lg text-headingColor font-semibold text-center">
                        Are you Sure, do you want to delete it?

                    </p>

                    <div className="flex justify-center items-center gap-4">
                        <motion.button className="px-2 py-1 text-sm uppercase 
        bg-red-400 rounded-md hover:bg-red-600 cursor-pointer"
                            whileTap={{ scale: 0.7 }}
                            onClick={() => deleteData(data)}

                        >
                            Yes</motion.button>
                        <motion.button className="px-2 py-1 text-sm uppercase
        bg-green-400 rounded-md hover:bg-green-600 cursor-pointer"
                            whileTap={{ scale: 0.7 }}
                            onClick={() => setISDelete(false)}
                        >No</motion.button>
                    </div>

                </motion.div>
            )}

        </motion.div>
    );
};

export default HomeSongCard