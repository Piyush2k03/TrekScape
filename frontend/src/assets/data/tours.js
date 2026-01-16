// import tourImg01 from "../images/tour-img01.jpg";
// import tourImg02 from "../images/tour-img02.jpg";
// import tourImg03 from "../images/tour-img03.jpg";
// import tourImg04 from "../images/tour-img04.jpg";
// import tourImg05 from "../images/tour-img05.jpg";
// import tourImg06 from "../images/tour-img06.jpg";
// import tourImg07 from "../images/tour-img07.jpg";

// const tours = [
//   {
//     id: "01",
//     title: "Westminister Bridge",
//     city: "London",
//     distance: 300,
//     price: 99,
//     maxGroupSize: 10,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg01,
//     featured: true,
//   },
//   {
//     id: "02",
//     title: "Bali, Indonesia",
//     city: "Indonesia",
//     distance: 400,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg02,
//     featured: true,
//   },
//   {
//     id: "03",
//     title: "Snowy Mountains, Thailand",
//     city: "Thailand",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg03,
//     featured: true,
//   },
//   {
//     id: "04",
//     title: "Beautiful Sunrise, Thailand",
//     city: "Thailand",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg04,
//     featured: true,
//   },
//   {
//     id: "05",
//     title: "Nusa Pendia Bali, Indonesia",
//     city: "Indonesia",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg05,
//     featured: false,
//   },
//   {
//     id: "06",
//     title: "Cherry Blossoms Spring",
//     city: "Japan",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg06,
//     featured: false,
//   },
//   {
//     id: "07",
//     title: "Holmen Lofoten",
//     city: "France",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg07,
//     featured: false,
//   },
//   {
//     id: "08",
//     title: "Snowy Mountains, Thailand",
//     city: "Thailand",
//     distance: 500,
//     price: 99,
//     maxGroupSize: 8,
//     desc: "this is the description",
//     reviews: [
//       {
//         name: "jhon doe",
//         rating: 4.6,
//       },
//     ],
//     avgRating: 4.5,
//     photo: tourImg03,
//     featured: false,
//   },
// ];


/*********************************************
 *  Eddited by ChatGPT 
 * 
 */
// export default tours;
import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";
import tourImg08 from "../images/tour-img08.jpg";
// import tourImg09 from "../images/tour-img09.jpg";
// import tourImg10 from "../images/tour-img10.jpg";
// import tourImg11 from "../images/tour-img11.jpg";
// import tourImg12 from "../images/tour-img12.jpg";
// import tourImg13 from "../images/tour-img13.jpg";
// import tourImg14 from "../images/tour-img14.jpg";
// import tourImg15 from "../images/tour-img15.jpg";

const tours = [
  /* ================= Fort Treks ================= */
  {
    T_id: "01",
    title: "Harishchandragad Trek",
    state: "Maharashtra, India",
    address: "Ahmednagar District",
    DifLevel: "Hard",
    price: 120,
    avgRating: 4.9,
    reviews: [{ name: "Sneha Patil", rating: 5.0 }],
    photo: tourImg01,
    category: "Fort Trek",
    featured: true,
  },
  {
    T_id: "02",
    title: "Rajgad Fort Trek",
    state: "Maharashtra, India",
    address: "Pune District",
    DifLevel: "Moderate",
    price: 90,
    avgRating: 4.7,
    reviews: [{ name: "Rohit Kulkarni", rating: 4.6 }],
    photo: tourImg02,
    category: "Fort Trek",
    featured: true,
  },
  {
    T_id: "03",
    title: "Sinhagad Fort Trek",
    state: "Maharashtra, India",
    address: "Pune Outskirts",
    DifLevel: "Easy",
    price: 70,
    avgRating: 4.6,
    reviews: [{ name: "Anjali Deshmukh", rating: 4.5 }],
    photo: tourImg03,
    category: "Fort Trek",
    featured: true,
  },

  {
    T_id: "04",
    title: "Torna Fort Trek",
    state: "Maharashtra, India",
    address: "Velhe, Pune District",
    DifLevel: "Hard",
    price: 100,
    avgRating: 4.8,
    reviews: [{ name: "Kiran Joshi", rating: 4.9 }],
    photo: tourImg04,
    category: "Fort Trek",
    featured: true,
  },
 {
    T_id: "05",
    title: "Raigad Fort Trek",
    state: "Maharashtra, India",
    address: "Raigad District",
    DifLevel: "Moderate",
    price: 95,
    avgRating: 4.7,
    reviews: [{ name: "Vikas More", rating: 4.8 }],
    photo: tourImg05,
    category: "Fort Trek",
    featured: true,
  },
  /* ================= Jungle Treks ================= */
  {
    T_id: "06",
    title: "Tadoba Jungle Trek",
    state: "Maharashtra, India",
    address: "Chandrapur District",
    DifLevel: "Moderate",
    price: 150,
    avgRating: 4.8,
    reviews: [{ name: "Suresh Naik", rating: 4.7 }],
    photo: tourImg06,
    category: "Jungle Trek",
    featured: true,
  },
  {
    T_id: "07",
    title: "Nagzira Wildlife Trek",
    state: "Maharashtra, India",
    address: "Bhandara District",
    DifLevel: "Easy",
    price: 110,
    avgRating: 4.6,
    reviews: [{ name: "Ritika Joshi", rating: 4.5 }],
    photo: tourImg07,
    category: "Jungle Trek",
    featured: true,
  },
  {
    T_id: "08",
    title: "Melghat Tiger Reserve Trek",
    state: "Maharashtra, India",
    address: "Amravati District",
    DifLevel: "Moderate",
    price: 140,
    avgRating: 4.7,
    reviews: [{ name: "Aditya Pawar", rating: 4.8 }],
    photo: tourImg08,
    category: "Jungle Trek",
    featured: true,
  },
  // {
  //   id: "14",
  //   title: "Dajipur Bison Sanctuary Trek",
  //   state: "Maharashtra, India",
  //   address: "Kolhapur District",
  //   DifLevel: "Easy",
  //   price: 100,
  //   avgRating: 4.5,
  //   reviews: [{ name: "Vaishali Deshpande", rating: 4.6 }],
  //   photo: tourImg14,
  //   category: "Jungle Trek",
  // },
  // {
  //   id: "15",
  //   title: "Radhanagari Wildlife Trek",
  //   state: "Maharashtra, India",
  //   address: "Kolhapur District",
  //   DifLevel: "Moderate",
  //   price: 120,
  //   avgRating: 4.6,
  //   reviews: [{ name: "Pranav Shinde", rating: 4.7 }],
  //   photo: tourImg15,
  //   category: "Jungle Trek",
  // },

  /* ================= Nature Trails ================= */
 

//   /* ================= Regular Treks ================= */
// import tourImg16 from "../images/tour-img16.jpg";
// import tourImg17 from "../images/tour-img17.jpg";
// import tourImg18 from "../images/tour-img18.jpg";
// import tourImg19 from "../images/tour-img19.jpg";
// import tourImg20 from "../images/tour-img20.jpg";

// const tours = [
//   // ... your previous treks 01–15

//   {
//     id: "16",
//     title: "Kalsubai Peak Trek",
//     state: "Maharashtra, India",
//     address: "Ahmednagar District",
//     DifLevel: "Hard",
//     price: 130,
//     avgRating: 4.9,
//     reviews: [{ name: "Deepa Kulkarni", rating: 5.0 }],
//     photo: tourImg16,
//     category: "Regular Trek",
//   },
//   {
//     id: "17",
//     title: "Kalavantin Durg Trek",
//     state: "Maharashtra, India",
//     address: "Panvel, Raigad District",
//     DifLevel: "Hard",
//     price: 120,
//     avgRating: 4.8,
//     reviews: [{ name: "Sanjay Jadhav", rating: 4.9 }],
//     photo: tourImg17,
//     category: "Regular Trek",
//   },
//   {
//     id: "18",
//     title: "Peb Fort (Vikatgad) Trek",
//     state: "Maharashtra, India",
//     address: "Matheran Range",
//     DifLevel: "Moderate",
//     price: 90,
//     avgRating: 4.6,
//     reviews: [{ name: "Neha Chavan", rating: 4.7 }],
//     photo: tourImg18,
//     category: "Regular Trek",
//   },
//   {
//     id: "19",
//     title: "Dukes Nose (Nagphani) Trek",
//     state: "Maharashtra, India",
//     address: "Near Lonavala",
//     DifLevel: "Moderate",
//     price: 85,
//     avgRating: 4.5,
//     reviews: [{ name: "Aarav Patil", rating: 4.4 }],
//     photo: tourImg19,
//     category: "Regular Trek",
//   },
//   {
//     id: "20",
//     title: "Irshalgad Trek",
//     state: "Maharashtra, India",
//     address: "Near Panvel, Raigad District",
//     DifLevel: "Moderate",
//     price: 95,
//     avgRating: 4.6,
//     reviews: [{ name: "Komal More", rating: 4.7 }],
//     photo: tourImg20,
//     category: "Regular Trek",
//   },
];

export default tours;
