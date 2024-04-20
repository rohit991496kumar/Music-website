
import React from 'react';
import Header from './Header';
import HomeSongs from './Home song';
const Home = () => {


  return <div className="w-full h-auto    flex flex-col items-center justify-center  ">


    <div className=' w-full bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-900 '>

      <Header />
      <HomeSongs />



    </div>
  </div>
};


export default Home;

