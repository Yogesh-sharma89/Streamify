
import { Loader2Icon, ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";
import { useThemeStore } from "../store/useThemeStore";

const LoginPage = () => {

  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })

  const theme = useThemeStore((state)=>state.theme);

  const {isPending,error,loginMutation} = useLogin();

  const handleLogin = (e:React.SubmitEvent<HTMLFormElement>)=>{
   e.preventDefault();
   loginMutation(loginData);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 md:p-8"
      data-theme={theme}
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row overflow-hidden shadow-lg rounded-xl max-w-6xl w-full mx-auto bg-base-100">
        {/* left section  */}

        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-8">
          {/* logo  */}

          <div className="flex items-center gap-2.5 justify-start mb-4 cursor-pointer">
            <ShipWheelIcon className="size-9 text-primary animate-none hover:animate-spin" />
            <span className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary/80 tracking-wider">
              Streamify
            </span>
          </div>

          {error && (
            <div className="mb-4 alert alert-error">
              <span>{error.message}</span>
            </div>
          )}

          {/* sign up form  */}

          <div className="w-full">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="space-y-5">
                {/* header  */}

                <div>
                  <h2 className="text-xl font-semibold">Welcome back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                {/* inputs field  */}

                <div className="space-y-3.5">

                  <div className="w-full form-control flex flex-col gap-2">
                    <label className="label" htmlFor="email">
                      <span className="text-sm text-white/70">Email</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Johndoe@gmail.com"
                      className="input input-wh w-full"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-full form-control">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="label" htmlFor="password">
                        <span className="text-sm text-white/70">Password</span>
                      </label>
                      <input
                        required
                        minLength={6}
                        maxLength={8}
                        type="password"
                        placeholder="******"
                        className="input input-wh w-full"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>

                    <p className="pl-2 mt-1 text-xs text-neutral-400 font-semibold">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                </div>

                {/* submit button  */}

                <button
                  type="submit"
                  className={`btn btn-block w-full btn-primary disabled:cursor-not-allowed`}
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="inline-flex items-center gap-2">
                      <Loader2Icon className="size-5 animate-spin" />
                      <span>Signing...</span>
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>

                <div className="w-full text-center mt-1">
                  <p className="text-sm">
                    Don't have an account? {"  "}
                    <Link
                      to={"/signup"}
                      className="text-primary hover:underline"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* right section  */}

        <div className="hidden lg:flex items-center justify-center lg:w-1/2 bg-primary/10 w-full">
          <div className="max-w-md p-6">
            {/* image  */}

            <div className="max-w-sm mx-auto aspect-square relative">
              <img
                src="/signup.png"
                alt="language Illustration"
                className="size-full"
              />
            </div>

            <div className="text-center space-y-5 mt-5">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-sm text-white/70">
                Practice conversations , make friends and improve your lnaguage
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
