const KeyFeatures = ({info}) => {
  return (
    <div>
      <h5>Product details</h5>
      <ul>
        <li><strong>Description:</strong>{info.description}</li>
        <li>Battery: 5000 mAh</li>
      </ul>
      <h5>Specifications</h5>
      <ul>
        <li><strong>Category</strong>: {info.category_name}</li>
        {info.specifications && typeof info.specifications === 'object' &&
    Object.entries(info.specifications).map(([key, value], index) => (
      <li key={index}>
        <strong>{key}:</strong> {value}
      </li>
    ))
  }
  </ul>
    </div>
  );
};
export default KeyFeatures;