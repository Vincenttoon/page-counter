import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { TfiThought } from "react-icons/tfi";
import { FaPlusSquare, FaPaintBrush } from "react-icons/fa";
import { LuEraser } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import {
  ADD_WORM,
  REMOVE_WORM,
  ADD_ABOUT_ME,
  EDIT_ABOUT_ME,
  ADD_AGE,
  EDIT_AGE,
  ADD_FAVORITE_GENRES,
  EDIT_FAVORITE_GENRES,
} from "../utils/mutations";

import LogList from "../components/ProfileTools/LogList/LogList.js";
import StashList from "../components/ProfileTools/StashList/StashList.js";
import WormsList from "../components/ProfileTools/WormsList/WormsList";

function Profile() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const { data: meData } = useQuery(QUERY_ME);

  const user = data?.me || data?.user || {};
  const isLoggedInUser = meData?.me?.username === user.username; // Check if the logged-in user is the same as the user being viewed

  return (
    <div className="profile-container">
      <div className="profile-hero">
        <div className="hero-text-container">
          <div className="name">
            <h1>{userParam ? `${user.username}'s` : "your"} profile</h1>
          </div>

          <div className="age">
            {user.age
              ? `Age: ${user.age}`
              : isLoggedInUser && (
                  <button onClick={() => console.log("Set age:")}>
                    <FaPlusSquare /> Set Your Age <SlCalender />
                  </button>
                )}
          </div>

          <div className="favorite-genre">
            {user.favoriteGenres && user.favoriteGenres.length > 0
              ? `Favorite Genre: ${user.favoriteGenres}`
              : isLoggedInUser && (
                  <button onClick={() => console.log("Create Favorite Genre")}>
                    <FaPlusSquare /> Set Your Favorite Genre <FaPaintBrush />
                  </button>
                )}
          </div>
        </div>

        <div className="about-me-container">
          {user.aboutMe ? (
            <p>About me: {user.aboutMe}</p>
          ) : (
            isLoggedInUser && (
              <>
                <p>Nothing here yet!</p>
                <button onClick={() => console.log("Create about me")}>
                  <FaPlusSquare /> Create About me <TfiThought />
                </button>
              </>
            )
          )}
        </div>
      </div>
      {/* Render additional components based on isLoggedInUser */}
      {isLoggedInUser && <div className="edit-profile-section"></div>}

      {/* Render other profile components */}
      <div className="stats-container">
        <div className="stat-one">Stat 1, Total Books</div>

        <div className="stat-two">Stat 2, Total Books</div>

        <div className="stat-three">Stat 3, average rating?</div>
      </div>

      <div className="saved-container">
        <div className="logged-books-container">Logged Books Here</div>

        <div className="saved-books-container">Saved Books Here</div>

        <div className="worms-list-container">Worms List Here</div>
      </div>
    </div>
  );
}

export default Profile;
