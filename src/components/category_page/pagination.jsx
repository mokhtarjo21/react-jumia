// import React from 'react';

// function Pagination({ page, setPage, count }) {
//   const totalPages = Math.ceil(count / 12); // assuming 12 per page
//   return (
//     <nav>
//       <ul className="pagination">
//         {[...Array(totalPages)].map((_, idx) => (
//           <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
//             <button className="page-link" onClick={() => setPage(idx + 1)}>
//               {idx + 1}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;
