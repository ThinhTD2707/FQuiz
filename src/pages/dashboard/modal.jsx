import React, { useState } from 'react';

import { useParams } from "react-router-dom";
import axios from "axios";

const Modal = ({ onClose }) => {
  const { id } = useParams();
  const accessToken = localStorage.getItem('token');
  const headerAxios = {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'accept': '*/*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    }
  };
  console.log(id)
  const handleClose = () => {
    onClose();
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://18.143.173.183:8080/course/deleteCourse/${id}`, headerAxios);
      console.log('delete thanh cong');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="modal" onClick={handleClose}>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div onClick={(e) => e.stopPropagation()} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Modal Title
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main
                thing people are controlled by! Thoughts- their perception
                of themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you
                won’t do anything. I was taught I could do everything.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-5">
              <button
                onClick={handleClose}
                className="bg-emerald-500 bg-blue-gray-50 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
              <button
                className="bg-emerald-500 bg-red-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default Modal;
