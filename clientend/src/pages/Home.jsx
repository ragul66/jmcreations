import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from session storage
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API}/product/products`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data); // Update state with fetched products
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Could not fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-24 font-poppins">
      <div className="flex justify-center items-center">
        <h2 className="text-black font-bold text-2xl">
          Welcome Admin <span className="text-yellow-400">JM</span> Creations
        </h2>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-12">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Price (₹)</th>
                <th className="border border-gray-300 p-2">Stock</th>
                <th className="border border-gray-300 p-2">Publication</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Age</th>
                <th className="border border-gray-300 p-2">Language</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{product._id}</td>
                  <td className="border border-gray-300 p-2">
                    {product.productName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{product.productprice}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.stock}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.publication}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.productdescription}
                  </td>
                  <td className="border border-gray-300 p-2 w-14">
                    {product.age}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {product.language}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch all products from the backend
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API}/product/products`
//       ); // Adjust the URL as necessary
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setProducts(data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Could not fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mx-auto p-4 mt-24 font-poppins">
//       <div className="flex justify-center items-center">
//         <h2 className="text-black font-bold text-2xl">
//           Welcome Admin <span className="text-yellow-400">JM</span>Creations
//         </h2>
//       </div>
//       <h1 className="text-2xl font-bold mb-4 mt-12">Product Added</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-200">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">ID</th>
//                 <th className="border border-gray-300 p-2">Product Name</th>
//                 <th className="border border-gray-300 p-2">Price(₹)</th>
//                 <th className="border border-gray-300 p-2">Stock</th>
//                 <th className="border border-gray-300 p-2">Publication</th>
//                 <th className="border border-gray-300 p-2">Description</th>
//                 <th className="border border-gray-300 p-2">Age</th>
//                 <th className="border border-gray-300 p-2">Language</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="hover:bg-gray-100">
//                   <td className="border border-gray-300 p-2">{product._id}</td>
//                   <td className="border border-gray-300 p-2">
//                     {product.productName}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     ₹{product.productprice}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {product.stock}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {product.publication}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {product.productdescription}
//                   </td>
//                   <td className="border border-gray-300 p-2 w-14">
//                     {product.age}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {product.language}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
