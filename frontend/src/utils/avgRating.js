const calculateAvgRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return { totalRating: 0, avgRating: 0 };
  }

  const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
  const avgRating = (totalRating / reviews.length).toFixed(1);

  return {
    totalRating,
    avgRating: parseFloat(avgRating), // return as number instead of string
  };
};

export default calculateAvgRating;
