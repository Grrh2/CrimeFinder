import {useState, useRef, useEffect} from 'react';
import SearchBar from './components/SearchBar.jsx';
import TitleBar from './components/TitleBar.jsx';
import ResultsContainer from './components/ResultsContainer.jsx';

function App() {

  const [searchData, setSearchData] = useState ({
    newPostcode : 'SW1A1AA', 
    newUsingPostcode : false, 
    newSliderValue :1 , 
    newCustomDate :'2024-01',
    submitting:false
  });
  const searchDataRef = useRef(searchData);
  useEffect(() =>{
    searchDataRef.current = searchData
  },[searchData]);
  function handleSearchData(theSearchData){
    setSearchData(theSearchData);

  }
  return (
    <div className='app'>
    <TitleBar/>
    <main>
      <SearchBar 
      submitResults={handleSearchData} 
      />
      <ResultsContainer 
      theData={searchData}
      />
      
    </main>
    </div>
  )
}

export default App
