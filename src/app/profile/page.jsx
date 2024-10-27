"use client"; // Required for client-side rendering
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import Link from "next/link"; // Next.js Link
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter
  const [balance, setBalance] = useState("XXXXXX");
  const { accountNumber } = useAuth(); // Get user information from your auth hook

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        router.push("/auth/login");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setBalance(null); // Reset balance
    setLoading(true); // Set loading state

    try {
      const response = await fetch(
        `/api/userinfo?accountNumber=${accountNumber}`
      );
      if (!response.ok) {
        throw new Error(
          (await response.json()).error || "Something went wrong"
        );
      }

      const data = await response.json();
      setBalance(data.balance);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return (
    <>
      <Sidebar />
      <div className="bg-gradient-to-br from-green-900  to-red-950 h-screen">
        <div className=" ml-72 p-4 flex flex-col gap-4 items-center text-white ">
          <div className="grid grid-cols-3 gap-4 w-full">
            {/* Left block with glassmorphism */}
            {/* <div className="bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-lg shadow-lg col-span-2 h-74 p-10 "> */}
            <div
              className="bg-opacity-20 backdrop-blur-md border  border-opacity-30 rounded-lg shadow-lg col-span-2 h-74 p-10 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:bg-opacity-30"
              style={{
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {/* <h2 className="text-lg font-bold mb-2">Left Block</h2> */}

              <div className="flex justify-between items-start font-serif font-bold">
                <div className="space-y-14">
                  <p>
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Ac/number:</strong> {user.accountNumber}
                  </p>
                  <div className="mt-8">
                    {/* <p>Available balance</p>
                     */}
                    <p className="mt-4 text-green-500">Balance: {balance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p>Interest rate</p>
                  <button
                    onClick={handleSubmit}
                    type="button" // Change to 'button' since form submission is handled manually
                    disabled={loading}
                    className={`w-full py-2  ${
                      loading ? " mt-32" : " mt-32"
                    }  flex justify-center items-center`}
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faEyeSlash} size="xl" /> // Closed eye icon
                    ) : (
                      <FontAwesomeIcon icon={faEye} size="xl" /> // Open eye icon
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right block with glassmorphism */}
            <div className="bg-opacity-20 backdrop-blur-md border-opacity-30 rounded-lg shadow-lg">
              <div className="relative flex flex-col gap-4 items-center text-green-700">
                {/* Top row with two blocks */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Top left block (fixed height) */}
                  <div className="bg-opacity-20 backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-3 h-36 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-30">
                    <div
                      className="text-right flex justify-center "
                      // style={{
                      //   position: "relative",
                      //   height: "100%",
                      //   width: "20px",
                      // }}
                    >
                      <Link
                        href="/admin/addbalance"
                        className="block px-4 py-2 text-white "
                      >
                        <Image
                          className="ml-5 "
                          src="/icons/transaction.png" // Replace with the path to your image
                          alt="Description of image" // Always include an alt for accessibility
                          width={60} // Set the width of the image
                          height={5} // Set the height of the image
                        />
                        <p className="p-2 font-bold "> Fund Transfer</p>
                      </Link>
                    </div>
                  </div>

                  {/* Top right block (fixed height) */}
                  {/* <div className="bg-opacity-20 backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-3 h-36"> */}

                  <div className="bg-opacity-20 backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-3 h-36 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-30">
                    <Link
                      href="userfunction/moneytransfer"
                      className="block px-4 py-2 text-white "
                    >
                      <Image
                        className="ml-5 "
                        src="/icons/fd.png" // Replace with the path to your image
                        alt="Description of image" // Always include an alt for accessibility
                        width={60} // Set the width of the image
                        height={5} // Set the height of the image
                      />
                      <p className="p-2 font-bold ">MoneyTransfer</p>
                    </Link>
                  </div>
                </div>

                {/* Bottom row with two blocks */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Bottom left block (fixed height) */}
                  <div className="bg-opacity-20 backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-3 h-36 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-30">
                    <Link
                      href="/userfunction/balancecheck"
                      className="block px-4 py-2 text-white "
                    >
                      <Image
                        className="ml-5 "
                        src="/icons/fd.png" // Replace with the path to your image
                        alt="Description of image" // Always include an alt for accessibility
                        width={60} // Set the width of the image
                        height={5} // Set the height of the image
                      />
                      <p className="p-2 font-bold "> Balance check</p>
                    </Link>
                  </div>

                  {/* Bottom right block (fixed height) */}
                  <div className="bg-opacity-20 backdrop-blur-md border border-opacity-30 rounded-lg shadow-lg p-3 h-36 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-30">
                    <Link href="/" className="block px-4 py-2 text-white ">
                      <Image
                        className="ml-5 "
                        src="/icons/fd.png" // Replace with the path to your image
                        alt="Description of image" // Always include an alt for accessibility
                        width={60} // Set the width of the image
                        height={5} // Set the height of the image
                      />
                      <p className="p-2 font-bold "> Fund Transfer</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            {/* Below Left block with glassmorphism */}
            <div
              className=" bg-opacity-20 backdrop-blur-md border  border-opacity-30 rounded-lg p-4 shadow-lg col-span-2 h-72 transition-transform duration-300 ease-in-out hover:shadow-2xl hover:bg-opacity-30"
              style={{
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h2 className="text-lg font-bold mb-2">Digital transaction</h2>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            {/* Below Right block with glassmorphism */}
            <div className="bg-opacity-20 backdrop-blur-md border  border-opacity-30 rounded-lg p-4 shadow-lg col-span-1 h-72 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-opacity-30 relative">
              <Link href="/" className="block w-full h-full relative">
                <Image
                  className="object-cover" // Ensures the image covers the entire area
                  src="/icons/instantbank.png" // Replace with the path to your image
                  alt="Description of image" // Always include an alt for accessibility
                  fill // This makes the image fill the entire div
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
