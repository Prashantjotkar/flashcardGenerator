import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { TbDownload } from "react-icons/tb";
import { LiaPrintSolid } from "react-icons/lia";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import PdfDownload from "./PdfDownload";
import ShareModal from "./ShareModal";

export default function SelectCard(props) {
  // This Is Selected Flashcard it will show only when user want to view that particular flashcard.

  const { flashCardData } = props;

  const [term, setTerm] = useState(0);
  const [show, setShow] = useState(false);

  const nextCard = () => {
    if (flashCardData.term.length - 1 !== term) setTerm(term + 1);
  };

  const prevCard = () => {
    if (term !== 0) setTerm(term - 1);
  };

  return (
    <div
      className=" bg-orange-300 ml-24 mt-24 "
      style={{ height: "60vh", width: "180vh" }}
    >
      <ShareModal show={show} setShow={setShow} />

      {/* This Share model will appear at the time of clicking the share button form flashCardDetails page*/}
      <div className="flashcardDetailsPAge m-auto mx-[10%]  mt-5 ">
        <div className="flex pt-1 m-auto flew-row">
          {/* This div is for showing Flashcard Group Name and Group Details of selected Flashcard and having a back arrow button for visiting Myflashcard page */}
          <div>
            {
              <Link to="/">
                <BsArrowLeft className="text-2xl cursor-pointer hover:text-red-600  " />
              </Link>
            }
          </div>
          <div className="relative p-2 mx-4 text-left -top-2">
            <h1 className="mb-1 text-2xl font-bold">
              {flashCardData.groupName}
            </h1>
            <h1 className="text-gray-500">{flashCardData.groupDescription}</h1>
          </div>
        </div>

        <div className="flex flex-row gap-5 midBox ">
          {/* //FlashCard Term Component which contain all the terms */}
          <div className="flashcardsDiv commonBorder bg-slate-50 pl-2  w-[20%] text-left overflow-hidden">
            <h2 className="p-1 font-semibold text-gray-500 ">Flashcards</h2>
            <hr className=" border-gray-300 w-[90%] mb-2" />
            <div className="ml-1 termDiv ">
              {flashCardData.term.map((elem, i) => (
                <div
                  key={i}
                  className={`p-1 cursor-pointer ${
                    term === i
                      ? "text-red-600 font-bold"
                      : "text-gray-800 hover:text-red-600"
                  }`}
                >
                  <button onClick={() => setTerm(i)}>{elem.termName}</button>
                </div>
              ))}
            </div>
          </div>

          {/* This component will show the selected term card image if having and term details*/}
          <div className="displayTermBox commonBorder flex flex-row p-5 bg-white w-[60%] h-[300px] justify-around">
            <p
              className={`${
                !flashCardData.term[term].termImage
                  ? "hidden"
                  : "dImg w-[50%] h-[100%]"
              }`}
            >
              <img
                className=" commonBorder max-w-[100%]  h-[100%] m-auto"
                src={flashCardData.term[term].termImage}
                alt=""
              />
            </p>
            <p
              className={`${
                !flashCardData.term[term].termImage
                  ? " w-[90%] "
                  : "descScroll w-[50%] h-[100%]  ml-4 text-gray-600 text-left overflow-y-auto"
              }`}
            >
              {flashCardData.term[term].termDefinition}
            </p>
          </div>

          <div className="shareBtnsDiv">
            {/*  This Div contain the share,download and print buttons*/}
            <button
              className="rounded-md commonBorder shareBtns"
              onClick={() => {
                setShow(true);
              }}
            >
              {<RiArrowGoForwardLine className="shareIcons" />}Share
            </button>
            {/* flashCard download function */}
            <div className="commonBorder shareBtns ">
              {<TbDownload className="shareIcons" />}

              <PdfDownload
                buttonLabel="Download"
                flashCardData={flashCardData} // Pdf download component
              />
            </div>
            {/* flashCard Print button */}
            <button
              className="commonBorder shareBtns "
              onClick={() => window.print()}
            >
              {<LiaPrintSolid className="shareIcons" />} Print
            </button>
          </div>
        </div>

        <p className="mx-auto  h-3 w-60 bg-black opacity-5 mt-3 rounded-[100%] shadow-xl"></p>

        {/* This is a paginations button help in viewing different term cards */}
        <div className="cursolBtn flex justify-center items-center">
          <MdNavigateBefore
            className="text-5xl cursor-pointer dark:text-gray-400 hover:text-red-500 "
            onClick={prevCard}
          />
          <span className="ml-10">{term + 1}/</span>
          <span className="mr-10">{flashCardData.term.length}</span>
          <MdNavigateNext
            className="text-5xl cursor-pointer dark:text-gray-400 hover:text-red-500 "
            onClick={nextCard}
          />
        </div>
      </div>
    </div>
  );
}
