import Link from 'next/link';

function Navbar() {
    
    return (
        <div className="bg-navbarColor flex items-center p-3">
            <img src="/images/logo.png" alt="Logo" className="w-2/12 ml-5" />

            <div className="flex flex-col items-center justify-center ml-72">
                <Link href={'/homepage'}>
                    <img src="/images/home-icon.png" className="w-12 mb-[-3px]" alt="Home Icon" />
                    <p className="text-center text-white">Home</p>
                </Link>
            </div>
            
            <div className="flex flex-col items-center justify-center ml-32">
                <Link href={'/progress'} className="inline-flex flex-col items-center">
                    <img src="/images/progress-icon.png" className="w-12 mb-[-3px]" alt="Home Icon" />
                    <p className="text-center text-white">Progress</p>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center ml-32">
                <Link href={'/profile'}>
                    <img src="/images/user-icon.png" className="w-12 mb-[-3px]" alt="Home Icon" />
                    <p className="text-center text-white">Profile</p>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;