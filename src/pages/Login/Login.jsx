import { Link } from "react-router-dom";
import authBg from "../../assets/footer.jpg";
import { FaUserGraduate, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <div
      style={{ backgroundImage: `url(${authBg})` }}
      className='h-screen bg-fixed px-2 md:px-0 bg-color3 bg-blend-multiply py-40 bg-cover bg-center bg-no-repeat'>
      <div className='md:max-w-lg mx-auto bg-color4 p-5 md:p-8 rounded-xl border-2 border-color2 shadow-xl'>
        <Link
          to='/'
          className='flex items-center justify-center gap-2 text-color1 text-[27px] mr-5'>
          <FaUserGraduate className='' />
          <span className='font-bold text-4xl'>
            Learn<span className='text-color2'>Verse</span>
          </span>
        </Link>
        <p className='text-center text-lg mt-3 font-semibold text-color5'>
          Login Now
        </p>
        <form onSubmit={handleSubmit(handleLogin)} className='mt-6 space-y-4'>
          <div>
            <div className='flex items-center gap-3  border-2 px-4'>
              <MdAlternateEmail className='text-color6 text-xl' />
              <input
                type='email'
                className='w-full focus:outline-none border-none text-lg text-color5'
                placeholder='Email'
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <p className='text-color10 font-medium'>Email is required</p>
            )}
          </div>
          <div>
            <div className='flex items-center gap-3 border-2 px-4'>
              <RiLockPasswordLine className='text-color6 text-xl' />
              <input
                type='password'
                className='w-full text-lg focus-visible:outline-none border-none text-color5'
                placeholder='Password'
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <p className='text-color10 font-medium'>Password is required</p>
            )}
          </div>
          <div>
            <input
              type='submit'
              value='Login'
              className='uppercase cursor-pointer bg-color1 w-full py-2 text-color4 font-semibold text-lg'
            />
          </div>
        </form>
        <div className='my-4 flex items-center gap-5'>
          <div className='border-b-[3px] w-full'></div>
          <h3 className='text-lg font-semibold text-color6'>OR</h3>
          <div className='border-b-[3px] w-full'></div>
        </div>
        <div className='flex items-center justify-around'>
          <button className='flex items-center text-color4 text-lg'>
            <p className='bg-[#DB4437] p-4'>
              <FaGoogle />
            </p>
            <p className='bg-[#CC3333] py-[11px] px-5 font-medium'>Google</p>
          </button>
          <button className='flex items-center text-color4 text-lg'>
            <p className='bg-[#2b3137] p-4'>
              <FaGithub />
            </p>
            <p className='bg-color5 py-[11px] px-5 font-medium'>Github</p>
          </button>
        </div>
        <div className='mt-4'>
          <p className='text-center text-base text-color5 font-medium'>
            Don{"'"}t have an account?{" "}
            <Link
              className='text-color2 duration-300 hover:underline font-semibold'
              to='/register'>
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
