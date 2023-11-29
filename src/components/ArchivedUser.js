import React, { useState, useEffect } from "react";


export default function ArchiveUser({ userId, isAdminActive, allUser }) {
  const [isActive, setIsActive] = useState(isAdminActive);

  const toggleAdminStatus = () => {
    const method = isActive ? adminInactive : adminActive;
    method();
    setIsActive(!isActive);
  };

  const adminActive = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/setAsAdmin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      setIsActive(true);
      allUser();
    });
  };

  const adminInactive = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/setAsAdmin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      setIsActive(false);
      allUser();
    });
  };

  return (
    <button className={isActive ? "btn btn-danger" : "btn btn-success"} onClick={toggleAdminStatus}>
      {isActive ? "User" : "Admin"}
    </button>
  );
}
