import { FaStar, FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect ,useState,use} from 'react';
import { instance } from '../../axiosInstance/instance';
const ratingsData = {
  average: 4.4,
  total: 650,
  breakdown: {
    5: 467,
    4: 86,
    3: 32,
    2: 24,
    1: 41,
  },
};



const StarRating = ({ count }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <FaStar key={i} className="text-warning me-1" />
    ))}
  </>
);

const CustomerFeedback = ({ info }) => {
  const [rates, setRates] = useState([]);
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await instance.get(`/comment/api/rate/${product.id}/`);
        if (response.status === 200) {
          console.log(response.data);
          setRates(response.data);
        } else {
          console.error("Failed to fetch ratings");
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
    fetchRatings();
   
  }, []);
  // const getPercentage = (count) => {
  //   return ((count / totalRatings) * 100).toFixed(1);
  // };
 if (!info) return <p>Loading customer feedback...</p>;
  return (
    <div className="container my-4 border p-4 bg-white rounded">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h5>Verified Customer Feedback</h5>
        
      </div>

      <div className="row">
        {/* Ratings Summary */}
        <div className="col-md-4 text-center border-end">
          <h2 className="fw-bold">{info.rating_average}/5</h2>
          <StarRating count={Math.round(info.rating_average)} />
          <p className="text-muted">{info.rating_count} verified ratings</p>

          {/* {Object.entries(ratingsData.breakdown).reverse().map(([star, count]) => (
            <div key={star} className="d-flex align-items-center mb-1">
              <div style={{ width: '10%' }}>{star}</div>
              <div className="progress flex-grow-1 mx-2" style={{ height: '6px' }}>
                <div
                  className="progress-bar bg-warning"
                  // style={{ width: `${getPercentage(count)}%` }}
                ></div>
              </div>
              <small>{count}</small>
            </div>
          ))} */}
        </div>

        {/* Product Reviews */}
        <div className="col-md-8">
          <h6 className="mb-3">PRODUCT REVIEWS ({rates.length})</h6>
          {rates.map((review, index) => (
            <div key={index} className="mb-4 border-bottom pb-3">
              <StarRating count={review.rate} />
              <p className="mb-1 fw-bold">{review.first_name}</p>
             
              
              <div className="text-success d-flex align-items-center mt-1">
                <FaCheckCircle className="me-1" />
                <small>Verified Purchase</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
