// import React,{useRef} from 'react'
// import'./search-bar.css'
// import {Col, Form, FormGroup} from 'reactstrap';
// const SearchBar = ({onSearch}) => {

//   const locationRef = useRef('');
//   const distanceRef = useRef(0);
//   const maxGroupSizeRef= useRef(0);

//   const searchHandler = () => {

//     const location = locationRef.current.value;
//     const distance = distanceRef.current.value;
//     const maxGroupSize = maxGroupSizeRef.current.value

//     if(location === '' || distance === '' || maxGroupSize === ''){
//       return alert('Please fill in all fields');
//     }
//         onSearch({ state, category, difficulty });

//   }
          
//   {/* State Selection */}
//   return <Col lg='12'>
//     <div className='search__bar'>
//         <Form className='d-flex align-items-center gap-4'>
//             <FormGroup className='d-flex gap-3 form__group form group-fast'>
//                 <span><i class="ri-map-pin-line"></i></span>
//                 <div>
//                   <h6>Location</h6>
//                   <input  type='text' placeholder='Where are you going?'ref={locationRef} />
//                 </div>
//             </FormGroup>
//             <FormGroup className='d-flex gap-3 form__group form group-fast'>
//                 <span><i class="ri-map-pin-time-line"></i></span>
//                 <div>
//                   <h6>Distance</h6>
//                   <input  type='number' placeholder='Distance k/m?' ref={distanceRef} />
//                 </div>
//              </FormGroup>
//             <FormGroup className='d-flex gap-3 form__group form group-last'>
//                 <span><i class="ri-group-line"></i></span>
//                 <div>
//                   <h6>Max People</h6>
//                   <input  type='number' placeholder='0' ref={maxGroupSizeRef} />
//                 </div>
//             </FormGroup>
//             <span className='search__icon'  type='submit' onClick={searchHandler}>
//               <i class="ri-search-line"></i>  
//             </span>
//         </Form>
//     </div>   
//   </Col>
// };

// export default SearchBar
import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import tours from "../assets/data/tours";

const SearchBar = ({ onSearch }) => {
  const stateRef = useRef("");
  const categoryRef = useRef("");
  const difficultyRef = useRef("");
  const navigate = useNavigate();

  // ✅ Make function async
  const searchHandler = async () => {
    const state = stateRef.current.value;
    const category = categoryRef.current.value;
    const difficulty = difficultyRef.current.value;

    if (!state || !category || !difficulty) {
      alert("Please select State, Category, and Difficulty");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search?state=${state}&category=${category}&DifLevel=${difficulty}`
      );

      if (!res.ok) {
        alert("Something went wrong while fetching treks");
        return;
      }

      const result = await res.json();


      navigate(
        `/tours/search?state=${state}&category=${category}&DifLevel=${difficulty}`,
        { state: { tours: result.data } }
      );

      if (onSearch) onSearch({ state, category, difficulty });
    } catch (err) {
      console.error("Search error:", err);
      alert("Failed to fetch treks — check backend or connection.");
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group">
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>State</h6>
              <select ref={stateRef}>
                <option value="">-- Select State --</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group">
            <span><i className="ri-landscape-line"></i></span>
            <div>
              <h6>Category</h6>
              <select ref={categoryRef}>
                <option value="">-- Select Category --</option>
                <option value="Fort Trek">Fort Trek</option>
                <option value="Nature Trail">Nature Trail</option>
                <option value="Regular Trek">Regular Trek</option>
                <option value="Jungle Trek">Jungle Trek</option>
              </select>
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group">
            <span><i className="ri-bar-chart-line"></i></span>
            <div>
              <h6>Difficulty</h6>
              <select ref={difficultyRef}>
                <option value="">-- Select Difficulty --</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </FormGroup>

          <span className="search__icon" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;



