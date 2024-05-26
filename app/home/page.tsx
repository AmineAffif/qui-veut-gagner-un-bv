import React from "react";
import PrivateRoute from "components/privateRoute";

const HomePage = () => {
  return <div>Home page</div>;
};

export default function ProtectedHomePage() {
  return (
    <PrivateRoute>
      <HomePage />
    </PrivateRoute>
  );
}
