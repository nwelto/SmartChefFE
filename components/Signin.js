import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signIn } from '../utils/auth';

function Signin() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn(() => {
      router.push('/');
    });
  };

  return (
    <div className="text-center center-container">
      <div>
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <Button type="button" size="lg" className="copy-btn custom-signin-btn" onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
