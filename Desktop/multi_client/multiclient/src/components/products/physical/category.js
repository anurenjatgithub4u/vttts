


// import React, { useState, useEffect, Fragment } from "react";
// import {
  // Card,
  // CardBody,
  // CardHeader,
  // Col,
  // Container,
  // Form,
  // FormGroup,
  // Input,
  // Label,
  // Row,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
// } from "reactstrap";

// const Category = () => {
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [categories, setCategories] = useState([
   
//   ]);
//   const [newCategory, setNewCategory] = useState({
//     name: "",
//     parentCategory: "",
//     categoryNo: "",
//   });

//   const toggleAddCategory = () => {
//     setIsAddingCategory(!isAddingCategory);
//   };

//   const handleAddCategory = () => {
//     const categoryName = newCategory.name.trim();
//     const categoryNo = newCategory.categoryNo.trim();
  
//     if (categoryName === "" || categoryNo === "") {
//       return;
//     }
  
//     const newCategoryItem = {
//       id: categories.length + 1,
//       name: categoryName,
//       parentCategory: categoryNo === "1" ? newCategory.parentCategory || "None" : "None",
//       categoryNo: categoryNo,
//     };
  
//     if (categories.length === 1) {
//       setNewCategory({ name: "", parentCategory: newCategory.name, categoryNo: "" });
//     } else {
//       setNewCategory({ name: "", parentCategory: "", categoryNo: "" });
//     }
  
//     setCategories([newCategoryItem, ...categories]);
//     setIsAddingCategory(false);
//   };

//   const handleDeleteCategory = (categoryId) => {
//     const updatedCategories = categories.filter(
//       (category) => category.id !== categoryId
//     );
//     setCategories(updatedCategories);
//   };

//   const handleAddSubCategory = () => {
//     const categoryName = newCategory.name.trim();
//     const categoryNo = newCategory.categoryNo.trim();
  
//     if (categoryName === "" || categoryNo === "") {
//       return;
//     }
  
//     const newSubCategoryItem = {
//       id: categories.length + 1,
//       name: categoryName,
//       parentCategory: newCategory.parentCategory || "None",
//       categoryNo: categoryNo,
//     };
  
//     if (categories.length === 1) {
//       setNewCategory({ name: "", parentCategory: newCategory.name, categoryNo: "" });
//     } else {
//       setNewCategory({ name: "", parentCategory: "", categoryNo: "" });
//     }
  
//     setCategories([newSubCategoryItem, ...categories]);
//     setIsAddingCategory(false);
//   };

//   useEffect(() => {
//     // When categories change, update the parentCategoryOptions
//     const parentCategoryOptions = [];
  
//     // Add "None" option
//     parentCategoryOptions.push(
//       <option key="None" value="None">
//         None
//       </option>
//     );
  
//     // Add the name of the new category (if any)
//     if (newCategory.name) {
//       parentCategoryOptions.push(
//         <option key={newCategory.name} value={newCategory.name}>
//           {newCategory.name}
//         </option>
//       );
//     }
  
//     // Add the names of other categories (excluding the current category)
//     parentCategoryOptions.push(
//       ...categories
//         .reverse()
//         .map((category, index) => {
//           const previousCategories = categories
//             .slice(0, categories.length - index)
//             .map((c) => c.name)
//             .join(" / ");
//           return (
//             <option key={category.name} value={previousCategories}>
//               {previousCategories}
//             </option>
//           );
//         })
//     );
  
//     setParentCategoryOptions(parentCategoryOptions);
//   }, [categories, newCategory]);

//   const [parentCategoryOptions, setParentCategoryOptions] = useState([
//     <option key="None" value="None">
//       None
//     </option>,
//   ]);

//   return (
//     <Fragment>
//       <div className="category-header">
//         <h1>Categories</h1>
//         <button className="add-category-button" onClick={toggleAddCategory}>
//           Add Category
//         </button>
//       </div>
//       <div className="category-space"></div>
//       <table className="category-table">
//         <thead>
//           <tr>
//             <th>Category No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Parent Category</th>
//             <th>Edit</th>
           
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category, index) => (
//             <tr key={category.id}>
//               <td>
//                 {index === 0 || category.categoryNo !== categories[index - 1].categoryNo
//                   ? category.categoryNo
//                   : ""}
//               </td>
//               <td>{/* Place image here */}</td>
//               <td>{category.name}</td>
//               <td>
//                 {index === 0 || category.name !== categories[index - 1].name
//                   ? category.parentCategory
//                   : ""}
//               </td>
//               <td>
//                 <button className="edit-button">Edit</button>
//               </td>
              
//               <td>
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDeleteCategory(category.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Modal isOpen={isAddingCategory} toggle={toggleAddCategory}>
//         <ModalHeader toggle={toggleAddCategory}>Add Category</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="categoryNo">Category No</Label>
//               <Input
//                 type="text"
//                 name="categoryNo"
//                 id="categoryNo"
//                 value={newCategory.categoryNo}
//                 onChange={(e) =>
//                   setNewCategory({ ...newCategory, categoryNo: e.target.value })
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="categoryName">Category Name</Label>
//               <Input
//                 type="text"
//                 name="categoryName"
//                 id="categoryName"
//                 value={newCategory.name}
//                 onChange={(e) =>
//                   setNewCategory({ ...newCategory, name: e.target.value })
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="parentCategory">Parent Category</Label>
//               <Input
//                 type="select"
//                 name="parentCategory"
//                 id="parentCategory"
//                 value={newCategory.parentCategory}
//                 onChange={(e) =>
//                   setNewCategory({
//                     ...newCategory,
//                     parentCategory: e.target.value,
//                   })
//                 }
//               >
//                 {parentCategoryOptions}
//               </Input>
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

//       <Modal isOpen={isAddingCategory} toggle={toggleAddCategory}>
//         <ModalHeader toggle={toggleAddCategory}>Add Category</ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label for="categoryNo">Category No</Label>
//               <Input
//                 type="text"
//                 name="categoryNo"
//                 id="categoryNo"
//                 value={newCategory.categoryNo}
//                 onChange={(e) =>
//                   setNewCategory({ ...newCategory, categoryNo: e.target.value })
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="categoryName">Category Name</Label>
//               <Input
//                 type="text"
//                 name="categoryName"
//                 id="categoryName"
//                 value={newCategory.name}
//                 onChange={(e) =>
//                   setNewCategory({ ...newCategory, name: e.target.value })
//                 }
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="parentCategory">Parent Category</Label>
//               <Input
//                 type="select"
//                 name="parentCategory"
//                 id="parentCategory"
//                 value={newCategory.parentCategory}
//                 onChange={(e) =>
//                   setNewCategory({
//                     ...newCategory,
//                     parentCategory: e.target.value,
//                   })
//                 }
//               >
//                 {parentCategoryOptions}
//               </Input>
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
//     </Fragment>
//   );
// };

// export default Category;

import React, { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from 'axios';

const Category = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    parentCategory: "None",
  });

  const toggleAddCategory = () => {
    setIsAddingCategory(!isAddingCategory);
  };


  
  const handleAddCategory = async () => {
    try {
      // Send a POST request to create a new category
      const response = await axios.post('/api/categories', newCategory);
      const createdCategory = response.data;

      // Update the local state with the new category
      setCategories([createdCategory, ...categories]);

      // Reset the form
      setNewCategory({ name: "", parentCategory: "None" });

      // Close the modal
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };


  

  const handleDeleteCategory = async (categoryId) => {
    try {
      console.log('Deleting category with ID:', categoryId);
      // Send a DELETE request to delete the category
      await axios.delete(`/api/categories/${categoryId}`);
    
      // Check for successful deletion (status 200) in the response
      // Update the local state if the category was successfully deleted
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
  
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  
  
  
  

  useEffect(() => {
    // Fetch categories when the component mounts
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  // When categories change, update the parentCategoryOptions
  const parentCategoryOptions = [];

  // Add "None" option
  parentCategoryOptions.push(
    <option key="None" value="None">
      None
    </option>
  );

  // Add the name of the new category (if any)
  if (newCategory.name) {
    parentCategoryOptions.push(
      <option key={newCategory.name} value={newCategory.name}>
        {newCategory.name}
      </option>
    );
  }

  // Add the names of other categories (excluding the current category)
  parentCategoryOptions.push(
    ...categories
      .reverse()
      .map((category, index) => {
        const previousCategories = categories
          .slice(0, categories.length - index)
          .map((c) => c.name)
          .join(" / ");
        return (
          <option key={category.name} value={previousCategories}>
            {previousCategories}
          </option>
        );
      }
    )
  );

  return (
    <Fragment>
      <div className="category-header">
        <h1>Categories</h1>
        <button className="add-category-button" onClick={toggleAddCategory}>
          Add Category
        </button>
      </div>
      <div className="category-space"></div>
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Parent Category</th>
            
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{/* Place image here */}</td>
              <td>{category.name}</td>
              <td>
                {index === 0 || category.name !== categories[index - 1].name
                  ? category.parentCategory
                  : ""}
              </td>
             
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isAddingCategory} toggle={toggleAddCategory}>
        <ModalHeader toggle={toggleAddCategory}>Add Category</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="categoryName">Category Name</Label>
              <Input
                type="text"
                name="categoryName"
                id="categoryName"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="parentCategory">Parent Category</Label>
              <Input
                type="select"
                name="parentCategory"
                id="parentCategory"
                value={newCategory.parentCategory}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    parentCategory: e.target.value,
                  })
                }
              >
                {parentCategoryOptions}
              </Input>
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
    </Fragment>
  );
};

export default Category;
