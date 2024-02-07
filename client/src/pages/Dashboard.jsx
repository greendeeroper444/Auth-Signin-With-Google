import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import axios from 'axios';

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/profile');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    // Fetch user profile only if the user is not already set
    if (!user) {
      fetchUserProfile();
    }
  }, [user, setUser]);

  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (
        <div>
          <h1>hi, {user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      )}
    </div>
  );
}
