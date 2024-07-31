import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { toast, Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {


       // اگر نیاز به اعتبارسنجی رمز عبور دارید، این بخش را باز کنید.
    // if (!validatePassword(password)) {
    //   toast.error('پسورد باید شامل 8 کارکتر از عدد، حروف و یک کارکتر خاص باشد');
    //   return;
    // }
    if (!username || !password) {
      toast.error('نام کاربری و رمز عبور نباید خالی باشند', {
        duration: 5000, 
     
      });
      return; 
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      console.log(response,"ressss")

      if (response.status==400) {
       toast.error("کاربری با این مشخصات ثبت نام نشده است", {
        duration: 5000, 
     
      });
      return;
     
      }

      const data = await response.json();
      const token = data.token;
      cookies.set('token', token, { path: '/' });

      toast.success('شما با موفقیت لاگین شدید', {
        duration: 5000, 
    
      });

      setTimeout(() => {
        navigate('/products');
      }, 5000);

    } catch (error) {
      toast.error("مشکلی پیش آمده لطفا دوباره تلاش کنید");
    }


    const validatePassword = (password:string) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-ivory p-8 rounded-lg shadow-lg w-full max-w-md">
        <Toaster position="top-right" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">ورود</h2>
        <div className="mb-4">
          <div className="flex items-center bg-gray-200 rounded-md p-2 mb-3">
            <FaUser className="text-gray-600 mx-2" />
            <input
              type="text"
              name="username"
              placeholder="نام کاربری"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent text-gray-800 w-full border-none focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-gray-200 rounded-md p-2 mb-3">
            <FaLock className="text-gray-600 mx-2" />
            <input
              type="password"
              name="password"
              placeholder="پسورد"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-800 w-full border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="text-right mb-4">
          <span className="text-gray-600">حساب کاربری ندارید؟ </span>
          <Link to="/register" className="text-blue-500 text-sm">ثبت نام</Link>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded-md"
        >
          ورود
        </button>
      </div>
    </div>
  );
}

export default Login;
