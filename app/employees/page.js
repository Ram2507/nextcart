"use client"

import { set } from "mongoose";
import { useState, useEffect } from "react";
export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [action, setAction] = useState("create"); // 'create' or 'edit'
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        designation: "",
        salary: 0,
    });
    const [errors, setErrors] = useState({
        name: undefined,
        email: undefined,
        phone: undefined,
        gender: undefined,
        designation: undefined,
        salary: undefined,
    });
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
const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.designation) errors.designation = "Designation is required";
    if (!formData.salary) errors.salary = "Salary is required";
    return errors;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setLoading(false);
        return;
    }

    try {
        let url = "/api/employees";

        if (action === "edit") {
            url = `/api/employees/${formData._id}`;
        }
        const res = await fetch(url, {
            method: action === "create" ? "POST" : "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            throw new Error("Failed to create employee");
        }
        if(action === "edit"){
            const updatedEmployee = await res.json();
            setAction("create");
            setMessage("Employee updated successfully");
        }
        else{
            const newEmployee = await res.json();
            console.log(newEmployee);
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee.employee]);
            setMessage
        }
        setFormData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            designation: "",
            salary: 0,
        });
        setSuccess(true);
        setErrors({});
        setLoading(false);
        setAction("create");
        setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
        console.error(error);
        setLoading(false);
        setAction("create");
    }
};

const handleEdit = (employee) => {
    // Implement edit functionality
    setAction("edit");
    setFormData(employee);
};

const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
        const res = await fetch(`/api/employees/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error("Failed to delete employee");
        }
        setEmployees((prevEmployees) => prevEmployees.filter(emp => emp._id !== id));
        setSuccess(true);
        setMessage("Employee deleted successfully");
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    setLoading(true);
    const fetchEmployees = async () => {
        try {
            const res = await fetch("/api/employees");
            const data = await res.json();
            if (data.status) {
                setEmployees(data.employees);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
            setLoading(false);
        }
    };
    fetchEmployees();
}, [message]);

return (
    <section>
        <h1>Employees Page</h1>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            {/* Employees List */}
                <div className="md:w-1/2 w-full">
                    <h2 className="text-xl font-semibold mb-4">Employees List</h2>
                    <div className="overflow-x-auto">
                        {loading && <p className="text-blue-500">Loading employees...</p>}
                        {!loading && employees.length === 0 && <p className="text-gray-500">No employees found.</p>}
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Email</th>
                                    <th className="py-2 px-4 border-b">Phone</th>
                                    <th className="py-2 px-4 border-b">Gender</th>
                                    <th className="py-2 px-4 border-b">Designation</th>
                                    <th className="py-2 px-4 border-b">Salary</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example row */}
                                {employees.map((emp) => (
                                    <tr key={emp?._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{emp?.name}</td>
                                        <td className="py-2 px-4 border-b">{emp?.email}</td>
                                        <td className="py-2 px-4 border-b">{emp?.phone}</td>
                                        <td className="py-2 px-4 border-b">{emp?.gender}</td>
                                        <td className="py-2 px-4 border-b">{emp?.designation}</td>
                                        <td className="py-2 px-4 border-b">{emp?.salary}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(emp)}>Edit</button>
                                            <button className="text-red-600 hover:underline" onClick={() => handleDelete(emp._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Create Employee Form */}
                <div className="md:w-1/2 w-full">
                    <h2 className="text-xl font-semibold mb-4">{action === "create" ? "Add New Employee" : "Edit Employee"}</h2>
                    {success && <p className="text-green-500">{message}</p>}
                    {loading && <p className="text-blue-500">Adding employee...</p>}
                    
                    <form className="bg-white p-6 rounded-lg shadow space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input onFocus={() => handleFocus("name")} onBlur={() => handleBlur("name")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input onFocus={() => handleFocus("email")} onBlur={() => handleBlur("email")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input onFocus={() => handleFocus("phone")} onBlur={() => handleBlur("phone")} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="tel" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender</label>
                            <select onFocus={() => handleFocus("gender")} onBlur={() => handleBlur("gender")} value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Designation</label>
                            <input onFocus={() => handleFocus("designation")} onBlur={() => handleBlur("designation")} value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.designation && <p className="text-red-500">{errors.designation}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Salary</label>
                            <input onFocus={() => handleFocus("salary")} onBlur={() => handleBlur("salary")} value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} type="number" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            {errors.salary && <p className="text-red-500">{errors.salary}</p>}
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">{action === "create" ? "Create Employee" : "Update Employee"}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
