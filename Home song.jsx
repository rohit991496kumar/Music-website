import React, { useEffect, useState } from 'react';
import { getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import HomeSongCard from './Home songcard';



const HomeSongs = () => {

    const [{ allSongs }, dispatch] = useStateValue()
    const [songFilter, setSongFilter] = useState("");
    const [isFoucs, setIsFoucs] = useState(false);


    useEffect(() => {

        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song
                })
            })
        }
    }, []);


    return (

        <div className='w-full p-4 flex items-center justify-center flex-col py-16'>
            <div className='w-96 flex justify-center items-center gap-20 py-3
            bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-200 rounded-full drop-shadow'>


                <input
                    type="text"
                    className={`w-52 px-4 py-2 border ${isFoucs ? "border-gray-500 shadow-md" : "border-gray-300"
                        } rounded-md bg-transparent outline-none duration-150 transition-all
                ease-in-out text-base text-textColor font-semibold`}
                    placeholder="Search Here..."
                    value={songFilter}
                    onChange={(e) => setSongFilter(e.target.value)}
                    onBlur={() => {
                        setIsFoucs(false);
                    }}
                    onFocus={() => setIsFoucs(true)}

                />


            </div>



            {/* main container*/}
            <div className="relative w-full my-4 p-6 border py-16
          bg-gradient-to-b from-yellow-100 to-yellow-500 border-white-300 rounded-md" >




                <SongContainer data={allSongs} />
            </div>
        </div>
    );
};
export const SongContainer = ({ data }) => {

    return (
        <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
            {data &&
                data.map((song, i) => (
                    <HomeSongCard key={song._id} data={song} index={i} type="song" />
                ))}
        </div>
    );
};

export default HomeSongs