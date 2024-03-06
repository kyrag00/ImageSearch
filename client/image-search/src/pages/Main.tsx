import { useAuth0 } from "@auth0/auth0-react";

export const Main = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <h2>Image Search</h2>

      {isAuthenticated && (
        <>
          <input type="text" />
          <button>Search</button>
        </>
      )}
    </>
  );
};
