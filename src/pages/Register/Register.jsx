import { Link, useLocation, useNavigate } from "react-router-dom";
import authBg from "../../assets/footer.jpg";
import { FaUserGraduate, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "./Register.css";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import useAxoisPublic from "../../hooks/useAxoisPublic";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import Swal from "sweetalert2";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [regError, setRegError] = useState("");
  const axoisPublic = useAxoisPublic();
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const selectRole = watch("role", "");

  const handleRegister = async (data) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(data.password)) {
      setRegError(
        "Password should have a uppercase and a lowercase and also minimum 6 character!"
      );
      return;
    } else {
      setRegError("");
    }
    if (data.role === "choose") {
      return toast.error("Please choose user role!");
    }

    // upload image to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axoisPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const role = data.role;
      const subject = data.subject;
      const image = res.data.data.display_url;

      createUser(email, password)
        .then((result) => {
          if (result.user.uid) {
            updateUser(name, image)
              .then(() => {
                navigate(location.state?.from?.pathname || "/");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registration successful!",
                  showConfirmButton: false,
                  timer: 1500,
                });

                let userInfo = {};

                if (selectRole === "teacher") {
                  userInfo = {
                    user_name: name,
                    user_email: email,
                    user_image: image,
                    user_role: role,
                    specialist: subject,
                  };
                } else {
                  userInfo = {
                    user_name: name,
                    user_email: email,
                    user_image: image,
                    user_role: role,
                  };
                }

                axoisPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    //
                  }
                });
              })
              .catch((error) => console.error(error.message));
          }
        })
        .catch((error) => toast.error(error.message));
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${authBg})` }}
      className='h-screen bg-fixed px-2 md:px-0 bg-color3 bg-blend-multiply py-24 bg-cover bg-center bg-no-repeat'>
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
          Create Account
        </p>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className='mt-6 space-y-4'>
          <div>
            <div className='flex items-center gap-3 border-2 px-4'>
              <FaRegUser className='text-color6' />
              <input
                type='text'
                className='w-full focus:outline-none border-none text-lg text-color5'
                placeholder='Name'
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <p className='text-color10 font-medium'>Name is required</p>
            )}
          </div>
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
            {regError && <p className='text-color10 font-medium'>{regError}</p>}
          </div>
          <div>
            <div className='flex items-center gap-3 border-2 px-4'>
              <RxDropdownMenu className='text-color6 text-xl' />
              <select
                name='role'
                defaultValue='choose'
                className='w-full text-lg focus-visible:outline-none border-none text-color5'
                {...register("role", { required: true })}>
                <option value='choose' disabled>
                  Choose a role
                </option>
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
                <option value='admin'>Admin</option>
              </select>
            </div>
          </div>
          {selectRole === "teacher" && (
            <div>
              <div className='flex items-center gap-3 border-2 px-4'>
                <LiaChalkboardTeacherSolid className='text-color6 text-xl' />
                <input
                  type='text'
                  className='w-full text-lg focus-visible:outline-none border-none text-color5'
                  placeholder='Subject'
                  {...register("subject", { required: true })}
                />
              </div>
              {errors.subject && (
                <p className='text-color10 font-medium'>Password is required</p>
              )}
            </div>
          )}
          <div>
            <div className=''>
              <input
                className='text-color5'
                type='file'
                {...register("image", { required: true })}
              />
            </div>
            {errors.image && (
              <p className='text-color10 font-medium'>Image is required</p>
            )}
          </div>
          <div>
            <input
              type='submit'
              value='Register'
              className='uppercase cursor-pointer bg-color1 w-full py-2 text-color4 font-semibold text-lg'
            />
          </div>
        </form>
        <div className='mt-4'>
          <p className='text-center text-base text-color5 font-medium'>
            Already have an account?{" "}
            <Link
              className='text-color2 duration-300 hover:underline font-semibold'
              to='/login'>
              Login Now
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
