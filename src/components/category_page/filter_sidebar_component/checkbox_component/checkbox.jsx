import { useSearchParams } from 'react-router-dom';
import './checkbox.css';

const Checkbox = ({ label, slug, paramName = 'brand', isRadio = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isChecked = isRadio 
    ? searchParams.get(paramName) === slug
    : searchParams.get(paramName)?.split(',').includes(slug);

  const handleChange = (e) => {
    const currentParams = Object.fromEntries([...searchParams]);
    
    if (isRadio) {
      // For radio-like behavior (discount filters)
      if (e.target.checked) {
        currentParams[paramName] = slug;
      } else {
        delete currentParams[paramName];
      }
    } else {
      // For checkbox behavior (brands, express delivery, etc.)
      const currentValues = currentParams[paramName]?.split(',').filter(Boolean) || [];
      let newValues;
      
      if (e.target.checked) {
        newValues = [...currentValues, slug];
      } else {
        newValues = currentValues.filter(value => value !== slug);
      }

      if (newValues.length > 0) {
        currentParams[paramName] = newValues.join(',');
      } else {
        delete currentParams[paramName];
      }
    }

    // Reset to page 1 when filter changes
    currentParams.page = '1';
    setSearchParams(currentParams);
  };

  return (
    <div className="custom-checkbox">
      <input
        type="checkbox"
        id={slug}
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={slug}>
        <span className="checkbox-icon"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
