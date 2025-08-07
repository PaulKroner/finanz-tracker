import { useState } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { useAuth } from "../../context/useAuth";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {

    if (!username || !password) {
      toast.error("Bitte fülle alle Felder aus.");
      return;
    }
    event.preventDefault();
    await loginUser(username, password);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 md:p-16 bg-slate-800 '>
      <div className="bg-white h-full rounded-2xl p-10 login-container border shadow-md/80 shadow-white">
        <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-4">

          <div className="flex gap-4 flex-col items-center">
            <div className="flex justify-center items-center font-extrabold text-2xl text-center">
              Finanztracker Login
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="username"
                name="username"
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-64 rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 h-13 md:h-10"
                aria-label="Username"
                autoComplete="Username"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Passwort
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-64 rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 h-13 md:h-10"
                aria-label="Password"
                autoComplete="password"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-13 md:h-10 mt-5">einloggen</Button>
        </form>
      </div>
    </div>

  );
};

export default LoginPage;