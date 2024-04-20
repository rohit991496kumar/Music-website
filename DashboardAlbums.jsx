import React, { useEffect } from 'react';
import { getAllAlbums } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import SongCard from './SongCard';

const DashboardAlbums = () => {

    useEffect(() => {

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                })
            })
        }
    }, []);

    const [{ allAlbums }, dispatch] = useStateValue()




    return (
        <div className='w-full p-4 flex items-center justify-center flex-col'>


            <div className="relative w-full my-4 p-4 border py-16  border-gray-300 rounded-md" >




                <AlbumsContainer data={allAlbums} />
            </div>
        </div>
    )
}


export const AlbumsContainer = ({ data }) => {

    return (
        <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
            {data &&
                data.map((song, i) => (
                    <SongCard key={song._id} data={song} index={i} type="album" />
                ))}
        </div>
    );
}

export default DashboardAlbums