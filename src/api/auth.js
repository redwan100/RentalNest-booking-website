const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
  };

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    }
  );
  const data = await res.json();
  return data;
};

export const becomeHost = async (email) => {
  const currentUser = {
    role: "host",
  };

  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  });
  const data = await res.json();
  return data;
};

export const getRole = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${email}`);
  const user = await res.json();

  return user?.role;
};

export default saveUser;
