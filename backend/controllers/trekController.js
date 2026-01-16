// import Tour from "../models/Tour.js"

// //create new trek
// export const createTrek = async (req,res) =>{
//     const newTrek = new Tour(req.body)
//     try{
//         const savedTrek = await newTrek.save()

//         res.status(200).json({
//             success:true,
//             message:'successfully created',
//             data:savedTrek
//         })
//     }catch(err){
//                 res
//                 .status(500)
//                 .json({success:false,message:'Failed to create. Try again'})

//     }
// };

import Tour from "../models/Tour.js"

//create new trek
export const createTrek = async (req,res) =>{
    const newTrek = new Tour(req.body)
    try{
        const savedTrek = await newTrek.save()

        res.status(200).json({
            success:true,
            message:'Successfully created',
            data:savedTrek
        })
    }catch(err){
        // 🚨 IMPORTANT: Log the error to your server console for debugging!
        console.error("Mongoose Save Error:", err.message); 
        
        // Check if it's a Mongoose validation error for better user feedback (Optional but good practice)
        let errorMessage = 'Failed to create. Try again';
        if (err.name === 'ValidationError') {
            // Get the specific validation message
            errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
        }
        
        res
            .status(500)
            .json({
                success:false,
                message: errorMessage, // Now returns a specific validation message
                errorDetail: err.message // Providing the raw error message for debug
            });
    }
};

//update trek
export const updateTrek = async (req,res) =>{

    const id = req.params.id;
    try{
        const updatedTrek = await Tour.findByIdAndUpdate(id,{$set:req.body,},{new:true});
        res.status(200).json({
            success:true,
            message:'Successfully updated',
            data:updatedTrek
        });
    }catch(err){
        res.status(500).json({success:false,message:'Failed to update'});
    } 
  
};

//delete trek
export const deleteTrek = async (req,res) =>{

    const id = req.params.id;
    try{
         await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:'Successfully deleted',
        });
    }catch(err){
        res.status(500).json({success:false,message:'Failed to delete'});
    } 
};

//get single trek
export const getSingleTrek = async (req,res) =>{
   const id = req.params.id;
    try{
         const tour = await Tour.findById(id).populate('reviews');
        res.status(200).json({
            success:true,
            message:'Successfully retrived',
            data:tour
        });
    }catch(err){
        res.status(404).json({success:false,message:'not found'});
    } 
};

// Get all trek (with pagination)
export const getAllTrek = async (req, res) => {
  const page = Number(req.query.page) || 0;   // default = 0
  const limit = Number(req.query.limit) || 8; // default = 8

  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully retrieved treks",
      data: tours
    });

  } catch (err) {
    console.error("GetAllTrek Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve treks"
    });
  }
};


export const getTrekBySearch = async (req, res) => {
    
    // 1. Extract the parameter as DifLevel
    const { state, category, DifLevel } = req.query; 

    try {
        let query = {}; 

        // Filter by State
        if (state && state.trim() !== '') {
            query.state = { $regex: new RegExp(state, 'i') };
        }

        // Filter by Category
        if (category && category.trim() !== '') {
            query.category = { $regex: new RegExp(category, 'i') };
        }

        // 2. Check and use the extracted DifLevel parameter
        if (DifLevel && DifLevel.trim() !== '') {
            // This now ensures the query uses the case-insensitive search on the DifLevel field
            query.DifLevel = { $regex: new RegExp(DifLevel, 'i') }; 
        }

        // 3. Execute the search query
        const tours = await Tour.find(query); 

        // 4. Send success response
        res.status(200).json({
            success: true,
            message: "Successfully retrieved filtered treks",
            count: tours.length,
            data: tours, 
        });

    } catch (err) {
        console.error("Trek Search API Error:", err.message);
        res.status(404).json({ 
            success: false, 
            message: "Failed to retrieve filtered treks. Server error.",
            errorDetail: err.message,
        });
    }
};


//get featured trek
export const getFeaturedTrek = async (req,res) =>{

    try{
        const tours = await Tour.find({featured:true}).populate("reviews").limit(8);
        res.status(200).json({
            success:true,
            count:tours.length,
            message:'Successfully retrived all featured treks',
            data:tours
        });
    }catch(err){
        res.status(404).json({success:false,message:'Failed to retrieve all featured treks'});
    }
    };



//get trek count
export const getTrekCount = async (req,res) =>{ 
    try{
        const trekCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success:true,
            message:'Successfully retrived trek count',
            data:trekCount
        });
    }catch(err){
        res.status(500).json({success:false,message:'Failed to retrieve trek count'});
    }
};

//get 5 most reviewed treks
export const getMostReviewedTreks = async (req, res) => {
    try {
        // Get all treks and populate reviews
        const tours = await Tour.find({})
            .select('title reviews')
            .populate('reviews');
        
        // Sort by review count (descending) and take top 5
        const sortedTours = tours
            .map(tour => ({
                _id: tour._id,
                title: tour.title,
                reviewCount: tour.reviews ? tour.reviews.length : 0
            }))
            .sort((a, b) => b.reviewCount - a.reviewCount)
            .slice(0, 5);
        
        res.status(200).json({
            success: true,
            message: 'Successfully retrieved most reviewed treks',
            data: sortedTours
        });
    } catch (err) {
        console.error("GetMostReviewedTreks Error:", err);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve most reviewed treks'
        });
    }
};