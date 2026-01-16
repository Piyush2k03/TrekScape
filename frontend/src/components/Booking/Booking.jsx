// // src/shared/Booking.jsx

// import React, { useState } from 'react';
// import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
// import './booking.css'; // You'll create this CSS next
// import { useNavigate } from 'react-router-dom';

// const Booking = ({ trek , avgRating}) => {
//   const { price, reviews } = trek;
//   const navigate =useNavigate()

//   const [credentials, setCredentials] = useState({
//     userId: '01', // Example fixed ID - typically comes from user context
//     userEmail: 'example@gmail.com', // Example fixed email
//     fullName:'',
//     phone:'',
//     trekName: trek.title,
//     guestSize: 1,
//     bookAt: '',
//   });

//   // Calculate Subtotal and Total Price
//   const handleChange = e => {
//     setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const serviceFee = 10; // Example fixed service fee
 
//   const totalAmount = Number(price) * Number(credentials.guestSize)+ Number(serviceFee)
  
//   // Handle form submission
//   const handleClick = e => {
//     e.preventDefault();

//     navigate('/thank-you');

//     if (!credentials.bookAt || credentials.guestSize < 1) {
//         alert("Please select a date and number of guests.");
//         return;
//     }

//     // 🏆 DEMONSTRATION POINT: Show this log to your guide!
//     console.log('Booking Attempted with Data:', credentials);
//     console.log('Final Calculated Price:', totalAmount);
    
//     alert(`Booking confirmed for ${credentials.guestSize} guests on ${credentials.bookAt}! Total: ₹${totalAmount}`);
    
//     // In a real application, you would send booking to API here.
//   };

//   return (
//     <div className='booking'>
//       <div className='booking__top d-flex align-items-center justify-content-between'>
//         <h3>
//           ₹{price} <span>/per person</span>
//         </h3>
//         <span className="trek__rating d-flex align-items-center">
//           <i className="ri-star-s-fill" style={{color:"var(--secondary-color)"}}></i> 
//           {avgRating===0 ? null: avgRating}{reviews?.length === 0 ? 'N/A' : (reviews?.length)}
//         </span>
//       </div>

//       {/* Booking Form */}
//       <div className='booking__form'>
//         <h5>Information</h5>
//         <Form className='booking__info-form' onSubmit={handleClick}>
//           {/* Guest Name (Optional but good for demo) */}
//           <FormGroup>
//             <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
//           </FormGroup>

//           {/* Date and Guests Input */}
//           <FormGroup className='d-flex align-items-center gap-3'>
//             <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
//             <input 
//               type="number" 
//               placeholder='Number of people' 
//               id='guestSize' 
//               min='1' 
//               required 
//               onChange={handleChange} 
//               value={credentials.guestSize}
//             />
//           </FormGroup>
//         </Form>
//       </div>

//       {/* Booking Bottom (Price Calculation) */}
//       <div className='booking__bottom'>
//         <ListGroup>
//           <ListGroupItem className='border-0 px-0'>
//             <h5 className='d-flex align-items-center gap-1'>
//               ₹{price} <i className="ri-close-line"></i> {credentials.guestSize} person
//             </h5>
//             <span>₹{price}</span>
//           </ListGroupItem>
//           <ListGroupItem className='border-0 px-0'>
//             <h5>Service charge</h5>
//             <span>₹{serviceFee}</span>
//           </ListGroupItem>
//           <ListGroupItem className='border-0 px-0 total'>
//             <h5>Total</h5>
//             <span>₹{totalAmount}</span>
//           </ListGroupItem>
//         </ListGroup>
        
//         {/* Submit Button - needs to be inside the <Form> or linked to it */}
//         <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
//       </div>
//     </div>
//   );
// };

// export default Booking;

// src/shared/Booking.jsx

import React, { useState,useContext } from 'react';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import './booking.css'; 
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { BASE_URL } from '../../utils/config';



const Booking = ({ trek , avgRating}) => {
    const { price, reviews,title} = trek;
    const navigate =useNavigate()

    const{user}=useContext(AuthContext)


    const [booking, setBooking] = useState({
        userId: user && user._id ,
        userEmail: user && user.email ,
        fullName:'',
        title:title,
        phone:'', // Phone number is defined in state
        trekName: trek.title,
        guestSize: 1,
        bookAt: '',
    });

    const handleChange = e => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10; 
    
    // Define subtotal here so it dynamically updates on every render
    const subtotal = price * Number(booking.guestSize); 

    // totalAmount calculation (relies on subtotal)
    const totalAmount = subtotal + serviceFee;
    
    // Handle form submission
    const handleClick = async e => {
    e.preventDefault();

    if (!user) {
        return alert("Please sign in to book the trek");
    }

    try {
        const res = await fetch(`${BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",   // ⭐ SEND COOKIE TOKEN
            body: JSON.stringify(booking)
        });

        const result = await res.json();
        if (!res.ok) return alert(result.message);

        navigate('/thank-you');

    } catch (err) {
        console.error(err);
        alert("Booking failed!");
    }
};


    return (
        <div className='booking'>
            <div className='booking__top d-flex align-items-center justify-content-between'>
                <h3>
                    ₹{price} <span>/per person</span>
                </h3>
                <span className="trek__rating d-flex align-items-center">
                    <i className="ri-star-s-fill" style={{color:"var(--secondary-color)"}}></i> 
                    {avgRating===0 ? null: avgRating} ({reviews?.length === 0 ? 'N/A' : (reviews?.length)})
                </span>
            </div>

            {/* Booking Form */}
            <div className='booking__form'>
                <h5>Information</h5>
                {/* Form handles submission */}
                <Form className='booking__info-form' onSubmit={handleClick}>
                    
                    {/* Guest Name */}
                    <FormGroup>
                        <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                    </FormGroup>

                    {/* FIX 4: Added missing Phone Input */}
                    <FormGroup>
                        <input type="tel" placeholder='Phone Number' id='phone' required onChange={handleChange} />
                    </FormGroup>

                    {/* Date and Guests Input */}
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
                        <input 
                            type="number" 
                            placeholder='Number of people' 
                            id='guestSize' 
                            min='1' 
                            required 
                            onChange={handleChange} 
                            value={booking.guestSize}
                        />
                    </FormGroup>
                    
                    {/* Booking Bottom (Price Calculation) - Must be inside the form */}
                    <div className='booking__bottom'>
                        <ListGroup>
                            <ListGroupItem className='border-0 px-0'>
                                <h5 className='d-flex align-items-center gap-1'>
                                    ₹{price} <i className="ri-close-line"></i> {booking.guestSize} person
                                </h5>
                                <span>₹{subtotal}</span> {/* FIX 5: Used the correct, dynamic subtotal */}
                            </ListGroupItem>
                            <ListGroupItem className='border-0 px-0'>
                                <h5>Service charge</h5>
                                <span>₹{serviceFee}</span>
                            </ListGroupItem>
                            <ListGroupItem className='border-0 px-0 total'>
                                <h5>Total</h5>
                                <span>₹{totalAmount}</span>
                            </ListGroupItem>
                        </ListGroup>
                        
                        <Button className='btn primary__btn w-100 mt-4' type='submit'>Book Now</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Booking;