import {useState, useRef, useEffect} from 'react';

export default function SearchBar( {submitResults}) {
  
    const [postcode, setPostcode] = useState('sw1a1aa');
    const [usingPostcode, setUsingPostcode] = useState(false);
    const [sliderValue, setSliderValue] = useState(1);
    const [customDate, setCustomDate] = useState('2024-01');

  
    function handleSetUsingPostcode(q) {
        setUsingPostcode(q);
    }
    function handleSetPostcode(e) {
        setPostcode(e.target.value);
    }
    function handleSetSliderValue(e) {
        setSliderValue(e.target.value);
    }
    function handleSetDate(e) {
        setCustomDate(e.target.value);
    }    
    return (
    <div className='search-bar'>
        <div className='search-group'>
            <label htmlFor='month'>Month</label>
        <input 
        id='month'
        type='month'
        min='2015-01'
        value={customDate}
        onChange={handleSetDate}
        />
        </div>
        <div className='search-group'>
            <label htmlFor='postcode'>Postcode</label>
        <input 
        id='postcode'
        onChange={handleSetPostcode} 
        type='text' 
        placeholder='Full Postcode' 
        value={postcode}
        />
        </div>
        <div className='search-group'>
            
        <label htmlFor='search-by'>Search By</label>
        <div className='buttons'>
        <button 
        id='search-by-postcode'
        onClick={() =>handleSetUsingPostcode(true)}
        className={'button ' +(usingPostcode ? 'active' :'inactive')}
        >
            <label htmlFor='search-by-postcode'>Postcode</label>
        </button>
        
    
        <button 
        id='search-by-location'
        onClick={() =>handleSetUsingPostcode(false)}
        className={'button ' + (!usingPostcode ? 'active' : 'inactive')}
        >
            <label htmlFor='search-by-location' >My location</label>
        </button>
        </div>
        </div>
        <div className='search-group'>
        <label htmlFor='slider'>Distance {sliderValue} km</label>
            <input 
            id='slider' 
            type='range' 
            value={sliderValue}
            onChange={handleSetSliderValue}
            min='1' 
            max='10'
            />
            </div>
            <div className='search-group'>
                <span>&nbsp;</span>
            <button 
        id='submitSearch'
        onClick={() =>{
            submitResults({
                newPostcode: postcode,
                newUsingPostcode: usingPostcode,
                newSliderValue: sliderValue,
                newCustomDate: customDate,
                submitting:true
            })
        }}
        className='search-button'
        >
            <label htmlFor='submitSearch' >Search</label>
        </button>
        </div>
        
    </div>
    );
}
