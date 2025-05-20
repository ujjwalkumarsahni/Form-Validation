import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validatePan,
  validateAadhar,
  validateUsername
} from '../utils/validation';

const countryCityData = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Chicago', 'Los Angeles'],
  UK: ['London', 'Manchester', 'Liverpool']
};

const countryCodes = {
  India: '+91',
  USA: '+1',
  UK: '+44'
};

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    country: '',
    city: '',
    phoneCode: '',
    phoneNumber: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.country) {
      setFormData((prev) => ({
        ...prev,
        phoneCode: countryCodes[formData.country] || ''
      }));
    }
  }, [formData.country]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.username) newErrors.username = 'Required';
    else if (!validateUsername(formData.username)) newErrors.username = 'Only letters & numbers, 4–15 chars';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = 'Enter 10-digit number';
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.city) newErrors.city = 'Required';
    if (!validatePan(formData.pan)) newErrors.pan = 'Invalid PAN format';
    if (!validateAadhar(formData.aadhar)) newErrors.aadhar = '12-digit Aadhar required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/summary', { state: formData });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Registration Form</h2>

      <div>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
      </div>

      <div>
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
      </div>

      <div>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
      </div>

      <div>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Password input with toggle icon */}
      <div className="relative">
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600 focus:outline-none"
          aria-label={formData.showPassword ? 'Hide password' : 'Show password'}
        >
          {formData.showPassword ? (
            // Eye-off icon SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.286.572-2.56 1.623-3.727M6.11 6.1a9.964 9.964 0 0111.778 0m-2.015 2.015a3 3 0 11-4.243 4.243M3 3l18 18"
              />
            </svg>
          ) : (
            // Eye icon SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>

      <div>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.country ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        >
          <option value="">Select Country</option>
          {Object.keys(countryCityData).map((ctry) => (
            <option key={ctry} value={ctry}>
              {ctry}
            </option>
          ))}
        </select>
        {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
      </div>

      <div>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.country}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          } ${!formData.country ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        >
          <option value="">Select City</option>
          {(countryCityData[formData.country] || []).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
      </div>

      <div className="flex gap-3">
        <input
          value={formData.phoneCode}
          disabled
          className="w-16 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
      </div>
      {errors.phoneNumber && <p className="text-red-600 text-sm mt-[-30px]">{errors.phoneNumber}</p>}

      <div>
        <input
          name="pan"
          placeholder="PAN Number"
          value={formData.pan}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.pan ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {errors.pan && <p className="text-red-600 text-sm mt-1">{errors.pan}</p>}
      </div>

      <div>
        <input
          name="aadhar"
          placeholder="Aadhar Number"
          value={formData.aadhar}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.aadhar ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
          }`}
        />
        {errors.aadhar && <p className="text-red-600 text-sm mt-1">{errors.aadhar}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
