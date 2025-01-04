'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get('/api/users/me');
                setData(res.data.data);  
                setLoading(false);  
            } catch (error) {
                toast.error('Failed to fetch user details');
                setLoading(false);
            }
        }

        getUserDetails();
    }, []);  

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            toast.error('Failed to logout');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Profile</h1>
                <hr className="border-t-2 border-gray-300 mb-4" />
                {loading ? (
                    <p className="text-lg text-center text-gray-600">Loading...</p>
                ) : (
                    <>
                        <p className="text-lg text-center text-gray-600 mb-4">Welcome, {data?.name || 'User'}!</p>
                        <div className="mb-6 text-center">
                            <h2 className="p-4 rounded-full bg-green-500 text-white font-bold text-xl">
                                {data ? (
                                    <Link href={`/profile/${data._id}`}>{data._id}</Link>
                                ) : (
                                    "No Data Available"
                                )}
                            </h2>
                        </div>
                    </>
                )}
                <hr className="border-t-2 border-gray-300 my-4" />
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={logout}
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
