import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../Components/DeleteModal";
import { ToastContainer } from "react-toastify";



const MyFlashcard = () => {

  const navigate = useNavigate();
  const [delClickedItem, setDelClickedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [flashCardData, setFlashCardData] = useState(
    localStorage.getItem("flashcards")
      ? JSON.parse(localStorage.getItem("flashcards"))
      : []
  );

  const deleteFlashCard = (delClickedItem) => {
    setDelClickedItem(delClickedItem);
    setShowDeleteModal(true);
  };

  const handleViewCardsClick = (elem) => {
    navigate("/flashDetails", { state: elem });
  };

  const [showCard, setShowCard] = useState(6);

  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar />
      <div className="myFlashcardDiv w-[78%] m-auto mt-10 ">
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          flashCardData={flashCardData}
          setFlashCardData={setFlashCardData}
          delClickedItem={delClickedItem}
          
        />
        <ToastContainer />

        <div className="absolute pr-2 overflow-visible text-xl font-bold text-right text-yellow-500 totalCards right-24">
          {!flashCardData.length
            ? null
            : `Total FlashCards : ${flashCardData.length}`}
        </div>
        <div
          className="flex flex-wrap m-auto overflow-hidden  "
          name="displayFlashcard"
        >
          {flashCardData.length !== 0 ? (
            flashCardData.slice(0, showCard).map((ele, index) => (
              <div
                key={index}
                name="childCards"
                className="commonBorder childCards  flex flex-col m-auto bg-white w-[300px] h-[200px] p-[8px] rounded mt-[50px] relative mb-[10px] "
              >
                <button
                  className="absolute hidden text-3xl text-black-950 del -right-3 -top-5 hover:text-4xl hover:text-red-600 "
                  onClick={() => {
                    deleteFlashCard(ele, index);
                  }}
                >
                  <MdCancel />
                </button>
                {/* This is an image component*/}
                <img
                  className="border-2 bg-slate-400  w-[70px] h-[70px] m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                  src={ele.termImage ? ele.termImage : "flashcard.jpg"}
                  alt=""
                />

                <h1 className="mt-4 font-bold ">{ele.groupName}</h1>
                <h2 className="h-10 mt-1 text-gray-700">
                  {ele.groupDescription.length > 30
                    ? ele.groupDescription.slice(0, 30) + "..."
                    : ele.groupDescription}
                </h2>
                <h2 className="mt-8 font-bold text-stone-900">
                  {ele.term.length} Cards
                </h2>
                <button
                  className="w-40 h-8 m-auto font-medium text-red-600 duration-300 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
                onClick={() => handleViewCardsClick(ele)}
                >
                  View Cards
                </button>
              </div>
            ))
          ) : (
            <div className=" w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
              <img
                className="absolute w-[100%] h-[100%]  "
                src="empty-300x240.jpg"
                alt="flashcard is empty"
              />
              <div className="mt-32 text-red-800 text-7xl backdrop-blur-sm">
                "No Flashcard available"
              </div>
              <br />
              <p className="mt-5 text-xl backdrop-blur-sm">
                <i className="underline text-amber-950 hover:text-teal-700">
                  <Link to="/"> Click here to Create New FlashCard</Link>
                </i>
              </p>
            </div>
          )}

          {/* See all and See less Button if we have more than 6 FlashCard */}
          {flashCardData && flashCardData.length > 6 ? (
            <div className="w-[100%]">
              <div className="mt-5 text-right ">
                {flashCardData.length === showCard ? (
                  <button
                    onClick={() => {
                      setShowCard(6);
                    }}
                    className="w-24 mx-5 mb-24 font-bold text-red-700"
                  >
                    See less
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowCard(flashCardData.length);
                    }}
                    className="w-24 mx-5 mb-24 font-bold text-red-500 hover:text-red-700"
                  >
                    See all
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyFlashcard;
