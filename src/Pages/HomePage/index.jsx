import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import API from "../../API";
import Context from "../../Context/Context";
import TrailerModal from "../../components/Movie/TrailerModal";
import Banner from "../../components/Layouts/Banner";
import TicketForm from "../../components/Ticket/TicketForm";
import MovieCard from "../../components/Movie/MovieCard";
import CarouselSection from "../../components/Layouts/CarouselSection";

function HomePage() {
  //States
  const [nowPlayingList, setNowPlayingList] = useState([]); //Ticket form + carrousel
  const [trailerSrc, setTrailerSrc] = useState();

  const context = useContext(Context);
  const { openModal, setTicketInfo, today } = context;

  sessionStorage.removeItem("ticket_info"); //Remove session storeage of ticket info when back to homepage

  //GET NOW PLAYING LIST
  useEffect(() => {
    const getNowPlayingMovie = async () => {
      try {
        const url = "/film/now-playing";
        const res = await API.get(url);
        setNowPlayingList(res);
      } catch (error) {
        toast.error(error);
      }
    };

    getNowPlayingMovie();

    setTicketInfo({ date: today }); //Reset ticket info in useContext when back to home page
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Banner animate={true} />
      <section className="search-ticket__section">
        <div className="container search-ticket__container">
          <div className="search-ticket__box">
            <div className="search-ticket__top">
              <div className="search-ticket__header">
                <h6 className="category">Welcome to STMT</h6>
                <h3 className="title">What are you looking for</h3>
              </div>
              <div className="search-ticket__menu">
                <button
                  className="search-ticket__tab"
                  type="submit"
                  form="search-ticket__form"
                >
                  <span>Get Ticket</span>
                </button>
              </div>
            </div>
            <div className="search-ticket__bot">
              <TicketForm search={true} nowPlayingList={nowPlayingList} />
            </div>
          </div>
        </div>
      </section>
      <CarouselSection>
        {nowPlayingList &&
          nowPlayingList.map((movie) => (
            <MovieCard
              key={movie.id}
              movieInfo={movie}
              setTrailerSrc={setTrailerSrc}
            />
          ))}
      </CarouselSection>
      {openModal && <TrailerModal src={trailerSrc} />}
    </>
  );
}

export default HomePage;
