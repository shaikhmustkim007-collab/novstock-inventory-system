// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
// import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
// import { useState } from "react";
// import { useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const Product = () => {
//   const { token } = useContext(AuthContext);

//   const [productName, setProductName] = useState("");
//   const [mrpPrice, setMrpPrice] = useState("");
//   const [price, setPrice] = useState("");
//   const [productImage, setProductImage] = useState("");
//   const [description, setDescription] = useState("");

//   // EDIT STATE
//   const [isEdit, setIsEdit] = useState("");
//   const [editId, setEditId] = useState("");

//   // product-list-api
//   const [productList, setProductList] = useState();

//   const fetchProductList = async () => {
//     try {
//       const { data } = await axiosInstance.get("/product/product-list");

//       setProductList(data);
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProductList();
//   }, []);

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("mrpPrice", mrpPrice);
//     formData.append("price", price);
//     formData.append("description", description);

//     //instanceof File Check karne ke liye ki kya waqai nayi file upload hui hai.
//     if (productImage instanceof File) {
//       formData.append("productImage", productImage);
//     }

//     try {
//       if (isEdit) {
//         const { data } = await axiosInstance.put(
//           `/product/update-product/${isEdit}`,
//           formData,
//         );
//         toast.success(data.message);
//       } else {
//         const { data } = await axiosInstance.post(
//           "/product/add-product",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" }, // Ye line add kar
//           },
//         );
//         toast(data.message);
//       }

//       handleReset();
//       fetchProductList();
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response?.data?.message);
//     }
//   };

//   const handleReset = () => {
//     setProductName("");
//     setMrpPrice("");
//     setPrice("");
//     setDescription("");
//     setProductImage("");
//     setIsEdit("");
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     setIsEdit(item._id);
//     setEditId(item._id);
//     setProductName(item.productName);
//     setMrpPrice(item.mrpPrice);
//     setPrice(item.price);
//     setDescription(item.description);
//     // setProductImage(item.productImage);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you eant to delete this product")) {
//       try {
//         await axiosInstance.delete(`/product/delete-product/${id}`);
//         toast.success("Product is deleted");
//         fetchProductList();
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="  p-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center p-4">
//               {isEdit ? "Edit Product" : "Add Product Form"}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form action="" onSubmit={handleAddProduct}>
//               <FieldGroup>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field>
//                     <FieldLabel>Product Name</FieldLabel>
//                     <Input
//                       id="name"
//                       type="text"
//                       value={productName}
//                       onChange={(e) => setProductName(e.target.value)}
//                       placeholder="Product Name"
//                       required
//                     />
//                   </Field>
//                   <Field>
//                     <FieldLabel>₹ MRP Price</FieldLabel>
//                     <Input
//                       id="mrp price"
//                       type="number"
//                       value={mrpPrice}
//                       onChange={(e) => setMrpPrice(e.target.value)}
//                       placeholder="₹ MrpPice"
//                       required
//                     />
//                   </Field>
//                 </div>

//                 <Field>
//                   <FieldLabel>₹ Price</FieldLabel>
//                   <Input
//                     id="price"
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="₹ price"
//                     required
//                   />
//                 </Field>
//                 <Field>
//                   <FieldLabel>Add Image</FieldLabel>
//                   <Input
//                     id="image"
//                     type="file"
//                     onChange={(e) => setProductImage(e.target.files[0])}
//                     placeholder="Product Name"
//                     required={!isEdit}
//                   />
//                 </Field>
//                 <Field>
//                   <FieldLabel>Description</FieldLabel>
//                   <Textarea
//                     id="name"
//                     type="text"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Add Discription"
//                     required
//                   />
//                 </Field>
//                 <FieldGroup className="flex gap-2">
//                   <Button type="submit">
//                     {isEdit ? "Update Product" : "Submit"}
//                   </Button>
//                   {isEdit && (
//                     <Button variant="outline" onClick={handleReset}>
//                       Cancel
//                     </Button>
//                   )}
//                 </FieldGroup>
//               </FieldGroup>
//             </form>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Product-List-Table */}

//       <div className="flex items-center  justify-center p-6">
//         <Table>
//           <TableCaption>A list of your products.</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Product Image</TableHead>
//               <TableHead>Product Name</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>₹ MRP Price</TableHead>
//               <TableHead>₹ Price</TableHead>
//               <TableHead>Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {Array.isArray(productList) &&
//               productList?.map((item) => (
//                 <TableRow key={item._id || item.id}>
//                   <TableCell>
//                     <img
//                       src={`http://localhost:5000/uploads/${item.productImage}`}
//                       alt="product_image"
//                       className="w-16 h-16 object-cover"
//                     />
//                   </TableCell>
//                   <TableCell>{item.productName}</TableCell>
//                   <TableCell>{item.description}</TableCell>
//                   <TableCell className="line-through">
//                     {item.mrpPrice}
//                   </TableCell>
//                   <TableCell>{item.price}</TableCell>
//                   <TableCell className="flex gap-2 items-center mt-3">
//                     <Button type="update" onClick={() => handleEdit(item)}>
//                       Edit
//                     </Button>
//                     <Button
//                       type="button"
//                       variant="destructive"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default Product;

import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const Product = () => {
  const { token } = useContext(AuthContext);

  // States
  const [productName, setProductName] = useState("");
  const [mrpPrice, setMrpPrice] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [productList, setProductList] = useState([]);

  // Fetch Data
  const fetchProductList = async () => {
    try {
      const { data } = await axiosInstance.get("/product/product-list");
      setProductList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  // Handlers
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("mrpPrice", mrpPrice);
    formData.append("price", price);
    formData.append("description", description);
    if (productImage instanceof File) {
      formData.append("productImage", productImage);
    }

    try {
      if (isEdit) {
        await axiosInstance.put(`/product/update-product/${isEdit}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product Updated");
      } else {
        await axiosInstance.post("/product/add-product", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product Added Successfully");
      }
      handleReset();
      fetchProductList();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  const handleReset = () => {
    setProductName("");
    setMrpPrice("");
    setPrice("");
    setDescription("");
    setProductImage("");
    setIsEdit("");
  };

  const handleEdit = (item) => {
    setIsEdit(item._id);
    setProductName(item.productName);
    setMrpPrice(item.mrpPrice);
    setPrice(item.price);
    setDescription(item.description);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosInstance.delete(`/product/delete-product/${id}`);
        toast.success("Product deleted");
        fetchProductList();
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Form Section */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="text-xl font-bold">
            {isEdit ? "Edit Product Details" : "Add New Inventory Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Product Name</FieldLabel>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel>MRP Price (₹)</FieldLabel>
                <Input
                  type="number"
                  value={mrpPrice}
                  onChange={(e) => setMrpPrice(e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel>Actual Price (₹)</FieldLabel>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Upload Image</FieldLabel>
                <Input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  required={!isEdit}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Field>

            <div className="flex gap-3">
              <Button type="submit">
                {isEdit ? "Update Product" : "Submit Product"}
              </Button>
              {isEdit && (
                <Button variant="outline" onClick={handleReset}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-lg text-slate-800">Inventory List</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead>MRP</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList?.map((item) => (
                <TableRow
                  key={item._id}
                  className="transition-colors duration-200 hover:bg-blue-50/50 cursor-default"
                >
                  <TableCell>
                    <img
                      src={`http://localhost:5000/uploads/${item.productImage}`}
                      className="w-12 h-12 rounded-md object-cover border transition-transform duration-300 hover:scale-110"
                      alt="prod"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.productName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-slate-500 text-sm max-w-xs truncate">
                    {item.description}
                  </TableCell>
                  <TableCell className="line-through text-slate-400">
                    ₹{item.mrpPrice}
                  </TableCell>
                  <TableCell className="font-bold text-blue-600">
                    ₹{item.price}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="transition-all duration-200 hover:bg-blue-600 hover:text-white"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="transition-all duration-200 hover:scale-105"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Product;
