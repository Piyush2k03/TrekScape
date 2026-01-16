// import Tour from "../models/Tour.js";
// import Review from "../models/Review.js";
// export const createReview = async(req, res) => {

//     const tourId = req.params.tourId;
//     const newReview = new Review({...req.body, tour:tourId});

//     try{
//         const savedReview = await newReview.save();
//         //after creating review, we need to update the tour model
//         await Tour.findByIdAndUpdate(tourId,{
//             $push:{reviews:savedReview._id}
            
//         })
//         res.status(200).json({
//             success:true,
//             message:"Review added successfully",
//             data:savedReview
//         });
//       }catch(err){
//         console.error("Review Error:", err.message);
//         res.status(500).json({
//             success:false,
//             message:"Failed to submit review",
//         });
//     }   
// };  

import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;

  //  include tourId when creating a new review
  const newReview = new Review({ ...req.body, tour: tourId });

  try {
    //  save the new review
    const savedReview = await newReview.save();

    // update the related tour with this review ID
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    //  success response
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: savedReview,
    });

  } catch (err) {
    // log actual error inside catch
    console.error("Review Error:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: err.message, // add this for debugging
    });
  }
};
