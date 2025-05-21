import { useEffect,useState } from "react";
import { instance } from '../../axiosInstance/instance';
import ProductCard from "../product_card/card"; // Assuming you have a ProductCard component to display each product
const RelatedProducts = ({category}) => {
  const [products, setProducts] = useState([]);
useEffect(() => {
  const getproducts = async () => {
    
      const response = await instance.get(`/api/category/${category}/products/`);
      if (response.status === 200) {
        console.log(response.data);
        setProducts(response.data.products);
      }else {
        console.error("Failed to fetch related products");
      }
    

  }
  getproducts();
}
, []);
  return (
    <div>
      <h5>Related Products</h5>
      <div className="d-flex overflow-auto gap-3">
       {products.map(product => (
                <div className="col-12 col-sm-6 col-lg-3 mb-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
      </div>
    </div>
  );
};
export default RelatedProducts;