import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="bg-transparent border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <p className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flashcard Generator
            </span>
          </p>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="group text-stone-950 md:hover:text-yellow-700"
                >
                  <span className="bg-left-bottom bg-gradient-to-r  pb-2 from-yellow-500 to-red-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_3px]">
                    Create Flashcard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/flashcards"
                  className="group text-stone-950 md:hover:text-yellow-700"
                >
                  <span className="bg-left-bottom bg-gradient-to-r  pb-2 from-yellow-500 to-red-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_3px]">
                    My Flashcards
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
