import React, { useEffect } from "react";
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from "../api/index";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { bgColours } from "../utils/styles";


export const DashboardCard = ({ icon, name, count }) => {

    const bg_color = bgColours[parseInt(Math.random() * bgColours.length)]

    return (
        <div style={{ background: `${bg_color}` }} className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md">
            {icon}
            <p className="text-xl text-textColor font-semibold">{name}</p>
            <p className="text-xl text-textColor font-semibold">{count}</p>
        </div>
    );
};

const DashboardHome = () => {
    const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data
                })
            })
        }

        if (!allArtists) {
            getAllArtists().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    allArtists: data.artist
                })
            })
        }

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_ALBUMS,
                    allAlbums: data.album
                })
            })
        }


        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song
                })
            })
        }



    }, [])

    return (
        <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
            <DashboardCard icon={<FaUsers className="text-3xl text-textcolor" />} name={"Users"} count={allUsers?.length > 0 ? allUsers.length : 0} />
            <DashboardCard icon={<GiLoveSong className="text-3xl text-textcolor" />} name={"songs"} count={allSongs?.length > 0 ? allSongs.length : 0} />
            <DashboardCard icon={<FaUsers className="text-3xl text-textcolor" />} name={"Ministries"} count={allArtists?.length > 0 ? allArtists.length : 0} />
            <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textcolor" />} name={"Albums"} count={allAlbums?.length > 0 ? allAlbums.length : 0} />
        </div>
    );
};

export default DashboardHome;