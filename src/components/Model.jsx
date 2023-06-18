export const Model = ({ uploadChat,closeModel, children }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-[hsl(32 0% 100%/.8)] backdrop-blur-sm transition-opacity animate-in fade-in flex items-end  bg-opacity-50 sm:items-center sm:justify-center  ease-in-out duration-500">
        {/* <!-- Modal --> */}
        <div className="w-full bg-white shadow-lg px-6 py-4 overflow-hidden bg-Light-Navy rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-xl">
          {/* <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. --> */}
          <header className="flex justify-end">
            <button
              onClick={closeModel}
              className="inline-flex items-center justify-center w-6 h-6 text-Green transition-colors duration-150 rounded hover: hover:text-gray-700"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          {/* <!-- Modal body --> */}
          <div className="mt-4 mb-6 flex items-center flex-col space-y-4">
            {children}
          </div>
          <footer className="flex flex-col items-center justify-center px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-[rgb(158,53,53/0.5)]">
            <button onClick={uploadChat} className="black_btn">Submit</button>
          </footer>
        </div>
      </div>
    </>
  );
};
