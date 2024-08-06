import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users");
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between w-9/12 items-center mx-auto">
        <h1 className="text-center text-2xl ml-2">All Users</h1>
        <Link to="/add" className="dark:bg-gray-800 text-white p-2 rounded ">
          Add New
        </Link>
      </div>
      <table className="w-9/12 divide-y divide-gray-200 dark:divide-gray-700 mx-auto mt-2">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center gap-x-3">
                <span>ID</span>
              </div>
            </th>
            <th
              scope="col"
              className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-white-500 "
            >
              <button className="flex items-center gap-x-2">
                <span className="text-white">Name</span>
              </button>
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <button className="flex items-center gap-x-2">
                <span>Email</span>
              </button>
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              Age
            </th>
            <th
              scope="col"
              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              Option
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-4 text-sm font-medium text-white whitespace-nowrap">
                <div className="inline-flex items-center gap-x-3">
                  <div>{user.id}</div>
                </div>
              </td>
              <td className="px-12 py-4 text-sm font-medium  whitespace-nowrap text-white">
                {user.name}
              </td>
              <td className="px-4 py-4 text-sm   whitespace-nowrap text-white">
                {user.email}
              </td>
              <td className="px-4 py-4 text-sm   whitespace-nowrap text-white">
                {user.age}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <Link
                    to={`/edit/${user.id}`}
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-green-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                  >
                    <FaEdit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
