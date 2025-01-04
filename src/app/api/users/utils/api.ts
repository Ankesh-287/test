
const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

export async function checkIfUserExists(email: string) {
  const response = await fetch(USERS_API_URL);
  const users = await response.json();
  return users.find((user: any) => user.email === email);
}

export async function createUser(username: string, email: string, password: string) {
  const userExists = await checkIfUserExists(email);
  if (userExists) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now(), 
    username,
    email,
    password, 
  };

  console.log("User created:", newUser);

  return newUser;
}
