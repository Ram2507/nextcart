"use client";
import { useState, useEffect } from "react";

export default function RegisterPage() {

  const[employees,setEmployees]=useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/employees");
      const data = await res.json();
      if (data.status) {
        setEmployees(data.employees);
      }
    };
    fetchEmployees();
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    gender: "",
    state: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      
      setLoading(true);
     try{
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
         console.log("Form submitted successfully:", formData);
         setFormData({
           username: "",
           email: "",
           password: "",
           cpassword: "",
           phone: "",
           gender: "",
           state: "",
           terms: false,
         });
         setSuccess(true);
         setErrors({});
        } else {
          console.error("Form submission failed:", res.statusText);
        }
     } catch (error) {
       console.error("Error submitting form:", error);
     } finally {
       setLoading(false);
     }
      
    } else {
      // Handle form errors
      console.log("Form validation errors:", errors);
      setErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.cpassword) errors.cpassword = "Passwords do not match";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.terms) errors.terms = "You must agree to the terms";

    return errors;
  };

  const handleFocus = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  const handleBlur = (field) => {
    const errors = validateForm();
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errors[field],
      }));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      {loading && <p className="text-blue-500">Submitting...</p>}
      {success && <p className="text-green-500">Registration successful!</p>}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
          <input className="border border-gray-300 p-2 rounded w-full" type="text" id="username" name="username" onChange={handleChange} value={formData.username} onFocus={() => handleFocus("username")} onBlur={() => handleBlur("username")} />
        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input className="border border-gray-300 p-2 rounded w-full" type="email" id="email" name="email" onChange={handleChange} value={formData.email} onFocus={() => handleFocus("email")} onBlur={() => handleBlur("email")} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input className="border border-gray-300 p-2 rounded w-full" type="password" id="password" name="password" onChange={handleChange} value={formData.password} onFocus={() => handleFocus("password")} onBlur={() => handleBlur("password")} />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="cpassword">Confirm Password</label>
          <input className="border border-gray-300 p-2 rounded w-full" type="password" id="cpassword" name="cpassword" onChange={handleChange} value={formData.cpassword} onFocus={() => handleFocus("cpassword")} onBlur={() => handleBlur("cpassword")} />
        {errors.cpassword && <p className="text-red-500 text-sm mt-1">{errors.cpassword}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
          <input className="border border-gray-300 p-2 rounded w-full" type="text" id="phone" name="phone" onChange={handleChange} value={formData.phone} onFocus={() => handleFocus("phone")} onBlur={() => handleBlur("phone")} />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
          <select className="border border-gray-300 p-2 rounded w-full" id="gender" name="gender" onChange={handleChange} value={formData.gender} onFocus={() => handleFocus("gender")} onBlur={() => handleBlur("gender")}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="state">Select State</label>
          <select className="border border-gray-300 p-2 rounded w-full" id="state" name="state" onChange={handleChange} value={formData.state} onFocus={() => handleFocus("state")} onBlur={() => handleBlur("state")}>
            <option value="">Select State</option>
            <option value="ny">New York</option>
            <option value="ca">California</option>
            <option value="tx">Texas</option>
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="terms">
            <input className="mr-2" type="checkbox" id="terms" name="terms" onChange={handleChange} checked={formData.terms} onFocus={() => handleFocus("terms")} onBlur={() => handleBlur("terms")} />
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
        </div>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Register</button>
      </form>
    </div>
    </section>
  );
}