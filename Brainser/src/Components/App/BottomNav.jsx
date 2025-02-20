import React, { useEffect, useState } from 'react';

const BottomNav = (props) => {
  const { history, showHistory, setShowHistory, removeHistoryItem, setHistory } = props;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500) { // Adjust the height threshold as needed
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <div className="navbar fixed bottom-8 left-0 right-0 just-center justify-around items-center border-4 border-gray-400 bg-white shadow-xl max-w-md mx-auto rounded-xl max-sm:max-w-80">
      <button className="flex flex-col items-center space-y-1 transition transform active:translate-y-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="btm-nav-label text-xs">Home</span>
      </button>
      <button className="flex flex-col items-center space-y-1 transition transform active:translate-y-1">
        <svg
         xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="black"
          viewBox="0 0 489.347 489.347"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M412.642,345.939l-59.523-14.229l-66.352-66.352l51.12-51.055c11.874,4.167,24.216,6.203,36.499,6.202
    c28.736-0.002,57.122-11.149,78.233-32.221c32.686-32.626,41.544-82.646,22.043-124.466l-9.042-19.391l-53.807,53.682
    l-24.986-24.941l53.822-53.696L421.17,10.42C379.3-9.036,329.218-0.195,296.546,32.417
    c-30.131,30.078-40.012,74.943-26.092,114.534l-20.111,20.086L102.13,18.837C91.061,7.731,76.32,1.605,60.621,1.587
    c-0.023,0-0.044,0-0.067,0c-15.696,0-30.45,6.104-41.553,17.195C7.886,29.897,1.77,44.669,1.778,60.378
    c0.008,15.697,6.129,30.456,17.233,41.553L167.18,250.094l-20.155,20.129c-39.652-13.917-84.597-4.061-114.733,26.02
    C-0.393,328.869-9.252,378.888,10.25,420.708l9.042,19.391l53.806-53.681l24.986,24.94l-53.822,53.697l19.48,9.051
    c14.814,6.883,30.652,10.224,46.388,10.224c28.738-0.001,57.124-11.148,78.235-32.221c30.132-30.078,40.013-74.943,26.093-114.534
    l51.082-51.018l66.366,66.366l14.229,59.523l76.705,76.706l66.507-66.507L412.642,345.939z M301.691,144.194
    c-14.181-30.419-7.73-66.807,16.05-90.545c18.28-18.246,44.036-26.278,68.827-22.6l-42.211,42.113l67.451,67.328l42.24-42.142
    c3.697,24.738-4.343,50.456-22.622,68.702c-23.802,23.759-60.288,30.197-90.793,16.02l-9.505-4.417l-34.603,34.559l-24.968-24.965
    l34.573-34.529L301.691,144.194z M31.778,60.362c-0.004-7.69,2.992-14.923,8.43-20.362c5.433-5.426,12.657-8.414,20.347-8.414
    c7.711,0.009,14.918,3.002,20.345,8.446l194.398,194.38l-40.711,40.659L40.221,80.714C34.781,75.277,31.782,68.049,31.778,60.362z
     M167.171,430.877c-18.28,18.246-44.038,26.278-68.827,22.6l42.211-42.112l-67.451-67.329l-42.24,42.142
    c-3.698-24.737,4.343-50.455,22.623-68.702c23.801-23.758,60.288-30.197,90.792-16.021l9.505,4.417l34.609-34.565l24.967,24.966
    l-34.578,34.534l4.44,9.525C197.403,370.751,190.952,407.138,167.171,430.877z M373.342,397.227l-7.564-31.645l31.646,7.564
    l49.498,49.499l-24.081,24.081L373.342,397.227z"
          />
        </svg>
        <span className="btm-nav-label text-xs">Tools</span>
      </button>
      <button
        className="flex flex-col items-center space-y-1 transition transform active:translate-y-1"
        onClick={() => setShowHistory(!showHistory)}
      >
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
<path d="M12 8V12L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.88717 6.13341L4.34162 6.12062L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z" fill="#1C274C"/>
</svg>
<span className="btm-nav-label text-xs">History</span>
</button>
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 shadow-lg rounded-lg max-h-64 overflow-y-auto w-11/12 max-w-md">
            <button className="btn btn-outline mb-2" onClick={() => setShowHistory(false)}>
              Close History
            </button>
            {history.length === 0 ? (
              <p className="text-center">No history available</p>
            ) : (
              history.map((item, index) => (
                <div key={index} className="mb-2">
                  <p><strong>Provided Text:</strong> {item.providedText}</p>
                  <p><strong>Spoken Text:</strong> {item.spokenText}</p>
                  <p><strong>Errors:</strong> {item.errors.join(", ")}</p>
                  <button onClick={() => removeHistoryItem(index)}>Remove</button>
                </div>
              ))
            )}
            <button onClick={() => {
              setHistory([]);
              localStorage.setItem("history", JSON.stringify([]));
            }}>Clear All History</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BottomNav;