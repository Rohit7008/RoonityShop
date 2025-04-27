import { useEffect } from 'react';
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // If user is signed in and is an admin, redirect to admin dashboard
    if (isSignedIn && user?.publicMetadata?.role === 'admin') {
      navigate('/admin');
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Sign in to access the admin dashboard</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: {
                boxShadow: 'none',
                width: '100%'
              },
              card: {
                border: '1px solid rgba(147, 51, 234, 0.2)',
                boxShadow: '0 0 20px rgba(147, 51, 234, 0.1)',
              }
            }
          }}
          redirectUrl="/admin"
        />
      </div>
    </div>
  );
};

export default LoginPage; 