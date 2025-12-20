// import React, { useState } from "react";
// import RichTextEditor from "../common/RichTextEditor";
// import "./Exp.css";


// const ExpForm = ({ data, onSave }) => {
//   const [companyEN, setCompanyEN] = useState(data.companyEN);
//   const [companyAR, setCompanyAR] = useState(data.companyAR);

//   const [jobEN, setJobEN] = useState(data.jobEN);
//   const [jobAR, setJobAR] = useState(data.jobAR);

//   const [descEN, setDescEN] = useState(data.descriptionEN);
//   const [descAR, setDescAR] = useState(data.descriptionAR);

//   return (
//     <div className="form-wrapper">
//       <h3>Edit Experience</h3>

//       <input value={companyEN} onChange={(e) => setCompanyEN(e.target.value)} placeholder="Company (EN)" />
//       <input value={companyAR} onChange={(e) => setCompanyAR(e.target.value)} placeholder="الشركة (AR)" />

//       <input value={jobEN} onChange={(e) => setJobEN(e.target.value)} placeholder="Job Title (EN)" />
//       <input value={jobAR} onChange={(e) => setJobAR(e.target.value)} placeholder="المسمى الوظيفي (AR)" />

//       <RichTextEditor value={descEN} onChange={setDescEN} />
//       <RichTextEditor value={descAR} onChange={setDescAR} />

//       <button
//         className="save-btn"
//         onClick={() =>
//           onSave({
//              titleEN,
//             titleAR,
//             companyEN,
//             companyAR,
//             jobEN,
//             jobAR,
//             descriptionEN: descEN,
//             descriptionAR: descAR,
//           })
//         }
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default ExpForm;

