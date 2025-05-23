import { FaStar, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect ,useState,use} from 'react';

import { FaRegCommentDots } from 'react-icons/fa';
import { instance } from '../../axiosInstance/instance';



const StarRating = ({ count }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <FaStar key={i} className="text-warning me-1" />
    ))}
  </>
);

const CustomerFeedback = ({ info }) => {
  const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState('');
  const [ratingsData,setRatingData]=useState({
  average: 0,
  total: 0,
  breakdown: {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
})
    const handleSubmit = (e) => {
      e.preventDefault();
      if (rating === 0) {
        alert("Please Add rate");
        return;
        
      }
  
  
      const reviewData = {
        rating,
        comment,
        date: new Date().toISOString(),
      };
  
     const sendrate=async()=>{
      const access =localStorage.getItem('access')
          const response= await instance.post(`/comment/api/rate/`,{rate:rating,content:comment,id:info.id},{
                      headers: {
                        'Authorization': `Bearer ${access}`,
                         
                      }
                    });
                    if (response.status === 200) {
            console.log(response.data);
            setRates(response.data);
            calculateRatingsData(response.data)
          } 
  
        }
        sendrate()
  
      // Reset form
      setRating(0);
      setHover(null);
      setComment('');
    };

const calculateRatingsData=(reviews)=> {
  const breakdown = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  let total = reviews.length;
  let sum = 0;

  reviews.forEach((review) => {
    const rate = review.rate;
    if (rate >= 1 && rate <= 5) {
      breakdown[rate] += 1;
      sum += rate;
    }
  });

  const average = total > 0 ? parseFloat((sum / total).toFixed(1)) : 0;

  setRatingData({
    average,
    total,
    breakdown,
  })
}

  const [rates, setRates] = useState([]);
  const [canrate,setCanrate] =useState(false)
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await instance.get(`/comment/api/rate/${info.id}/`);
        if (response.status === 200) {
          console.log(response.data);
          setRates(response.data);
          calculateRatingsData(response.data)
          
        } else {
          console.error("Failed to fetch ratings");
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
    fetchRatings();
    const ratecan=async()=>{
      try {
        const access = localStorage.getItem('access');
        const response = await instance.get(`/api/orders/check/${info.id}/`, {
        headers: {
          'Authorization': `Bearer ${access}`,
        }
      });
        if (response.status === 200) {
          console.log(response.data);
          setCanrate(response.data.has_purchased)

        } else {
          console.error("Failed to fetch ratings");
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }
   ratecan()
  }, []);
  const getPercentage = (count) => {
    return ((count / ratingsData.total) * 100).toFixed(1);
  };
 if (!info) return <p>Loading customer feedback...</p>;
  return (
    <div className="container my-4 border p-4 bg-white rounded">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h5>Verified Customer Feedback</h5>
        
      </div>

      <div className="row">
        {/* Ratings Summary */}
        <div className="col-md-4 text-center border-end">
          <h2 className="fw-bold">{parseInt(ratingsData.average)}/5</h2>
          <StarRating count={Math.round((ratingsData.average))} />
          <p className="text-muted">{ratingsData.total} verified ratings</p>

          {Object.entries(ratingsData.breakdown).reverse().map(([star, count]) => (
            <div key={star} className="d-flex align-items-center mb-1">
              <div style={{ width: '10%' }}>{star}</div>
              <div className="progress flex-grow-1 mx-2" style={{ height: '6px' }}>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${getPercentage(count)}%` }}
                ></div>
              </div>
              <small>{count}</small>
            </div>
          ))}
        </div>

        {/* Product Reviews */}
        <div className="col-md-8">
          <h6 className="mb-3">PRODUCT REVIEWS ({rates.length})</h6>
          {rates.length === 0?(
            <div className="text-center text-muted">
          <FaRegCommentDots size={50} className="mb-3" color="#ccc" />
          <p>Customers who have bought this product have not yet posted comments.</p>
        </div>
          ):(rates.map((review, index) => (
            <div key={index} className="mb-4 border-bottom pb-3">
              <StarRating count={review.rate} />
              
              <p className="mb-1 fw-bold">{review.first_name}</p>
              <p>{review.content}</p>
              
              <div className="text-success d-flex align-items-center mt-1">
                <FaCheckCircle className="me-1" />
                <small>Verified Purchase</small>
              </div>
            </div>
          )))}
        </div>
      </div>
      {canrate?( <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
      <h4>Add Rate</h4>
      <div className="mb-2">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
                style={{ display: 'none' }}
              />
              <FaStar
                size={24}
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer', transition: 'color 200ms' }}
              />
            </label>
          );
        })}
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">Send Rate</button>
    </form>):'Customers who have bought this product can comment'} 
    </div>
  );
};

export default CustomerFeedback;
