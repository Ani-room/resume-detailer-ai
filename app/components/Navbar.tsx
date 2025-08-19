import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="px-2 sm:px-4 lg:px-6 py-3">
            <nav className="bg-gradient-to-r from-[#1E1F29] via-[#2C2D3E] to-[#1E1F29] shadow-lg 
                            px-6 py-3 flex justify-between items-center rounded-md">
                {/* Brand */}
                <Link to="/" className="group">
                    <p className="text-lg sm:text-xl font-extrabold text-white tracking-wider relative">
                        SMARTIFY
                        {/* Animated underline */}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                    </p>
                </Link>

                {/* Upload Button — boxy corners */}
                <Link
                    to="/upload"
                    className="text-sm sm:text-base px-4 py-1.5 rounded-md font-semibold text-white 
                               bg-gradient-to-r from-pink-500 to-indigo-500 
                               hover:shadow-pink-500/30 hover:shadow-lg 
                               transition-all duration-300"
                >
                    Upload Resume
                </Link>
            </nav>
        </div>
    );
};

export default Navbar;
