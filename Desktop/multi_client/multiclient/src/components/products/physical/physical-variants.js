// import React, { Fragment, useState, useEffect } from "react";
// import Breadcrumb from "../../common/breadcrumb";
// import "./Category.css";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";
// import axios from 'axios';

// const PhysicalVariants = () => {
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [configureTermsModalOpen, setConfigureTermsModalOpen] = useState(false);
//   const [variants, setVariants] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryTerms, setCategoryTerms] = useState("");
//   const [termsToAdd, setTermsToAdd] = useState("");

//   const toggleAddCategory = () => {
//     setIsAddingCategory(!isAddingCategory);
//   };

//   const toggleConfigureTermsModal = () => {
//     setConfigureTermsModalOpen(!configureTermsModalOpen);
//   };

//   const handleAddCategory = () => {
//     const newCategory = {
//       name: categoryName,
//       terms: categoryTerms,
//     };

//     axios
//       .post('/productvariants', newCategory)
//       .then((response) => {
//         console.log('Product variant added:', response.data);
//         setVariants([...variants, response.data]);
//         toggleAddCategory();
//       })
//       .catch((error) => {
//         console.error('Error adding product variant:', error);
//       });
//   };

//   const handleAddTerms = () => {
//     if (termsToAdd) {
//       // Send a request to save the terms to MongoDB for the selected category
//       const selectedVariant = variants.find((variant) => variant.name === categoryName);
      
//       if (selectedVariant) {
//         selectedVariant.terms += `, ${termsToAdd}`;
//         // Update the terms in MongoDB here
//         axios
//           .put(`/productvariants/${selectedVariant._id}`, { terms: selectedVariant.terms })
//           .then((response) => {
//             console.log('Terms added:', response.data);
//             toggleConfigureTermsModal();
//           })
//           .catch((error) => {
//             console.error('Error adding terms:', error);
//           });
//       }
//     }
//   };

//   useEffect(() => {
//     // Fetch product variants from the database and update the variants state
//     axios
//       .get('/productvariants')
//       .then((response) => {
//         setVariants(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching product variants:', error);
//       });
//   }, []);

//   // Save state to local storage
// useEffect(() => {
//   localStorage.setItem('variants', JSON.stringify(variants));
// }, [variants]);

// // Retrieve state from local storage when the component is mounted
// useEffect(() => {
//   const savedVariants = JSON.parse(localStorage.getItem('variants'));
//   if (savedVariants) {
//     setVariants(savedVariants);
//   }
// }, []);


//   return (
//     <Fragment>
//       <div className="category-header">
//         <h2>Variants</h2>
//         <button className="add-category-button" onClick={toggleAddCategory}>
//           Add Product Variants
//         </button>
//       </div>
//       <div className="category-space"></div>
//       <table className="category-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Terms</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {variants.map((variant, index) => (
//             <tr key={index}>
//               <td>{variant.name}</td>
//               <td>{variant.terms}</td>
//               <td>
//                 <button className="edit-button" onClick={toggleConfigureTermsModal}>
//                   Configure Terms
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Modal isOpen={isAddingCategory} toggle={toggleAddCategory}>
//         <ModalHeader toggle={toggleAddCategory}>Add Product Variants</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="categoryName">Name</Label>
//               <Input
//                 type="text"
//                 name="categoryName"
//                 id="categoryName"
//                 value={categoryName}
//                 onChange={(e) => setCategoryName(e.target.value)}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="categoryTerms">Terms</Label>
//               <Input
//                 type="text"
//                 name="categoryTerms"
//                 id="categoryTerms"
//                 value={categoryTerms}
//                 onChange={(e) => setCategoryTerms(e.target.value)}
//               />
//             </FormGroup>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <button className="add-category-submit" onClick={handleAddCategory}>
//             Add
//           </button>
//           <button className="add-category-cancel" onClick={toggleAddCategory}>
//             Cancel
//           </button>
//         </ModalFooter>
//       </Modal>

//       <Modal isOpen={configureTermsModalOpen} toggle={toggleConfigureTermsModal}>
//         <ModalHeader toggle={toggleConfigureTermsModal}>Configure Terms</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="configureTerms">Terms</Label>
//               <Input
//                 type="text"
//                 name="configureTerms"
//                 id="configureTerms"
//                 value={termsToAdd}
//                 onChange={(e) => setTermsToAdd(e.target.value)}
//               />
//             </FormGroup>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <button className="add-terms-submit" onClick={handleAddTerms}>
//             Add Terms
//           </button>
//           <button className="add-terms-cancel" onClick={toggleConfigureTermsModal}>
//             Cancel
//           </button>
//         </ModalFooter>
//       </Modal>
//     </Fragment>
//   );
// };

// export default PhysicalVariants;



import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "./Category.css";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from 'axios';

const PhysicalVariants = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [configureTermsModalOpen, setConfigureTermsModalOpen] = useState(false);
  const [variants, setVariants] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryTerms, setCategoryTerms] = useState("");
  const [termsToAdd, setTermsToAdd] = useState("");

  const toggleAddCategory = () => {
    setIsAddingCategory(!isAddingCategory);
  };

  const toggleConfigureTermsModal = () => {
    setConfigureTermsModalOpen(!configureTermsModalOpen);
  };

  const handleAddCategory = () => {
    const newCategory = {
      name: categoryName,
      terms: categoryTerms,
    };

    axios
      .post('/productvariants', newCategory)
      .then((response) => {
        console.log('Product variant added:', response.data);
        setVariants([...variants, response.data]);
        toggleAddCategory();
      })
      .catch((error) => {
        console.error('Error adding product variant:', error);
      });
  };

  const handleAddTerms = () => {
    if (termsToAdd) {
      // Send a request to save the terms to MongoDB for the selected category
      const selectedVariant = variants.find((variant) => variant.name === categoryName);
      
      if (selectedVariant) {
        selectedVariant.terms += `, ${termsToAdd}`;
        // Update the terms in MongoDB here
        axios
          .put(`/productvariants/${selectedVariant._id}`, { terms: selectedVariant.terms })
          .then((response) => {
            console.log('Terms added:', response.data);
            toggleConfigureTermsModal();
          })
          .catch((error) => {
            console.error('Error adding terms:', error);
          });
      }
    }
  };

  const handleDeleteVariant = (variantId) => {
    if (window.confirm('Are you sure you want to delete this variant?')) {
      // Send a request to delete the variant from the database
      axios
        .delete(`/productvariants/${variantId}`)
        .then(() => {
          console.log('Variant deleted:', variantId);

          // Remove the deleted variant from the state
          const updatedVariants = variants.filter((variant) => variant._id !== variantId);
          setVariants(updatedVariants);
        })
        .catch((error) => {
          console.error('Error deleting variant:', error);
        });
    }
  };

  useEffect(() => {
    // Fetch product variants from the database and update the variants state
    axios
      .get('/productvariants')
      .then((response) => {
        setVariants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product variants:', error);
      });
  }, []);

  // Save state to local storage
  useEffect(() => {
    localStorage.setItem('variants', JSON.stringify(variants));
  }, [variants]);

  // Retrieve state from local storage when the component is mounted
  useEffect(() => {
    const savedVariants = JSON.parse(localStorage.getItem('variants'));
    if (savedVariants) {
      setVariants(savedVariants);
    }
  }, []);

  return (
    <Fragment>
      <div className="category-header">
        <h2>Variants</h2>
        <button className="add-category-button" onClick={toggleAddCategory}>
          Add Product Variants
        </button>
      </div>
      <div className="category-space"></div>
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Terms</th>
            <th>Action</th>
            <th>Delete</th> {/* Add a new column for deleting variants */}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index}>
              <td>{variant.name}</td>
              <td>{variant.terms}</td>
              <td>
                <button className="edit-button" onClick={toggleConfigureTermsModal}>
                  Configure Terms
                </button>
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteVariant(variant._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isAddingCategory} toggle={toggleAddCategory}>
        <ModalHeader toggle={toggleAddCategory}>Add Product Variants</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="categoryName">Name</Label>
              <Input
                type="text"
                name="categoryName"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="categoryTerms">Terms</Label>
              <Input
                type="text"
                name="categoryTerms"
                id="categoryTerms"
                value={categoryTerms}
                onChange={(e) => setCategoryTerms(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className="add-category-submit" onClick={handleAddCategory}>
            Add
          </button>
          <button className="add-category-cancel" onClick={toggleAddCategory}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={configureTermsModalOpen} toggle={toggleConfigureTermsModal}>
        <ModalHeader toggle={toggleConfigureTermsModal}>Configure Terms</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="configureTerms">Terms</Label>
              <Input
                type="text"
                name="configureTerms"
                id="configureTerms"
                value={termsToAdd}
                onChange={(e) => setTermsToAdd(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <button className="add-terms-submit" onClick={handleAddTerms}>
            Add Terms
          </button>
          <button className="add-terms-cancel" onClick={toggleConfigureTermsModal}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default PhysicalVariants;

