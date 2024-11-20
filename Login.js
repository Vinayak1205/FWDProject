import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
function Login() {

    
    const getConfirmPassword = useRef('')

 const [CreateAccount,setCreateAccount] = useState(0)
const[LoginStatus,setLoginStatus] = useState(0)
// const navigate = useNavigate(); 
const[ErrorLogin,setErrorLogin] = useState(0)
 const EmailId = useRef("")
 const Password = useRef("")


const authenticate = () =>{

    var myData = {EmailId:EmailId.current.value,Password:Password.current.value}
    axios.post("http://localhost:9000/api/login",myData)
    .then(response=>{
        if(response.data[0].EmailId == EmailId.current.value && response.data[0].Password == Password.current.value){
            
            // localStorage.setItem("authToken", response.data.token);
            setLoginStatus(1)
            sessionStorage.setItem("loginId","true")
            setTimeout(()=>{
                setLoginStatus(0)
                
            },1000)

            setTimeout(()=>{

                window.location.href = '/dashboard';

            },1000)
            
        }

    })
    .catch(err=>{
        console.log(err)
        setErrorLogin(1)
        setTimeout(()=>{
            setErrorLogin(0)
        },1000)

    })
    
}

const SwitchToCreateAccount = () =>{

    setCreateAccount(1)

}


const SwitchToLogin = () =>{

    setCreateAccount(0)

}

const [RegisterStatus,setRegisterStatus] = useState(0)

const RegisterUser = ()=>{

    var myData = {EmailId:EmailId.current.value,Password:Password.current.value,ConfirmPassword:getConfirmPassword.current.value}


    axios.post("http://localhost:9000/api/register",myData)
    .then(response=>{

        if(response.data.message && response.data[0].EmailId === EmailId.current.value
            && response.data[0].Password === Password.current.value
        ){

            setRegisterStatus(1)
            setTimeout(()=>{

                setRegisterStatus(0)

            },1000)
            
        }
        else
            alert("User Already Exists")
            
    })
}

  return (
    <div className='flex z-50 flex-row'>
        {LoginStatus ?
         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
         <div className="shadow-custom-blue w-[300px] rounded-3xl bg-[#FA7275] h-[60px] flex items-center justify-center">
           <h1 className="text-white text-2xl text-center">Login Successful</h1>
         </div>
       </div>:null}

       {ErrorLogin ?
         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
         <div className="shadow-custom-blue w-[400px] rounded-3xl bg-[#FA7275] h-[60px] flex items-center justify-center">
           <h1 className="text-white text-2xl text-center">Incorrect Email Id or Password</h1>
         </div>
       </div>:null}

       {RegisterStatus ?
         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
         <div className="shadow-custom-blue w-[300px] rounded-3xl bg-[#FA7275] h-[60px] flex items-center justify-center">
           <h1 className="text-white text-2xl text-center">User Registered</h1>
         </div>
       </div>:null}


        <div className='bg-[#FA7275]  h-[1024px] w-[580px]'>
            
            <div className='flex  flex-col justify-center items-center gap-20' >
                <img src="/images/StoreIt.svg" className='mt-[50px]' height={82} width={223} />
                <div className='flex flex-col'>
                    <p className='text-5xl font-bold text-white' >Manage Your Files</p>
                    <p className='text-5xl font-bold text-white' >the Best Way</p>
                </div>
                <div className='flex flex-col'>
                    <p className='text-lg  text-white' >Awesome, We have created perfect place for you to </p>
                    <p className='text-lg  text-white' >store all the documents</p>
                </div>

                <img src="/images/driveImage.svg" height={342} width={342} />
            </div>
        </div>

        <div>

                <div className='h-[628px] w-[580px] flex  flex-col mt-[250px] gap-10  ml-[150px]' >
                    {CreateAccount ? 
                   <h1 className='text-5xl font-bold text-left' >Create Account</h1>:
                   <h1 className='text-5xl font-bold text-left' >Login</h1>

                    }

                    
                    <div className="bg-white shadow-custom-blue rounded-2xl w-[600px] h-[90px] p-4">
                        <h1 className="text-left mb-2">Email Id</h1>
                        <input 
                            ref = {EmailId}
                            placeholder="Enter your EmailId" 
                            className="w-full text-left border-none rounded focus:outline-none focus:ring-0" 
                            />
                    </div>

                    
                    <div className="bg-white shadow-custom-blue rounded-2xl w-[600px] h-[90px] p-4">
                        <h1 className="text-left mb-2">Password</h1>
                        <input 
                            type="password"
                            
                            ref = {Password}
                            placeholder="Enter your Password" 
                            className="w-full text-left border-none rounded focus:outline-none focus:ring-0" 
                            />
                    </div>

                    {CreateAccount ? 
                    <div className="bg-white shadow-custom-blue rounded-2xl w-[600px] h-[90px] p-4">
                        <h1 className="text-left mb-2">Confirm Password</h1>
                        <input 
                            type="password"
                            ref={getConfirmPassword}
                            placeholder="Re-Enter your Password" 
                            className="w-full text-left border-none rounded focus:outline-none focus:ring-0" 
                            />
                    </div>:null}

                    {!CreateAccount ?
                    <button onClick={authenticate} className='bg-[#FA7275] h-[60px] cursor-pointer w-[600px] font-medium mt-30px shadow-custom-blue rounded-full text-white' >Login</button>
                    :<button onClick={RegisterUser} className='bg-[#FA7275] h-[60px] cursor-pointer w-[600px] font-medium mt-30px shadow-custom-blue rounded-full text-white' >Create Account</button>}

                        
                        {CreateAccount ? 
                        
                        <p className='text-center'>Already have an account ?
                        <span onClick={SwitchToLogin} className='text-[#FA7275] cursor-pointer' > Login</span></p>:
                        <p className='text-center' >Dont have an account ? <span onClick={SwitchToCreateAccount} className='text-[#FA7275] cursor-pointer' >Create an account</span> </p>}
                </div>
        </div>
    </div>
  )
}

export default Login

// import axios from 'axios';
// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [CreateAccount, setCreateAccount] = useState(0);
//   const [LoginStatus, setLoginStatus] = useState(0);
//   const [ErrorLogin, setErrorLogin] = useState(0);

//   const EmailId = useRef('');
//   const Password = useRef('');
//   const navigate = useNavigate();  // For navigation

//   const authenticate = () => {
//     const myData = { EmailId: EmailId.current.value, Password: Password.current.value };

//     axios
//       .post("http://localhost:9000/api/login", myData)
//       .then(response => {
//         // Store the JWT token in localStorage
//         localStorage.setItem("authToken", response.data.token);
        
//         // Show success message
//         setLoginStatus(1);
//         setTimeout(() => {
//           setLoginStatus(0);
//         }, 1000);

//         // Redirect to the dashboard
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);
//       })
//       .catch(err => {
//         console.log(err);
//         setErrorLogin(1);
//         setTimeout(() => {
//           setErrorLogin(0);
//         }, 1000);
//       });
//   };

//   return (
//     <div className="flex z-50 flex-row">
//       {LoginStatus && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
//           <div className="shadow-custom-blue w-[300px] rounded-3xl bg-[#FA7275] h-[60px] flex items-center justify-center">
//             <h1 className="text-white text-2xl text-center">Login Successful</h1>
//           </div>
//         </div>
//       )}

//       {ErrorLogin && (
//         <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
//           <div className="shadow-custom-blue w-[400px] rounded-3xl bg-[#FA7275] h-[60px] flex items-center justify-center">
//             <h1 className="text-white text-2xl text-center">Incorrect Email Id or Password</h1>
//           </div>
//         </div>
//       )}

//       {/* Login Form */}
//       <div className="bg-[#FA7275] h-[1024px] w-[580px]">
//         {/* Your form content */}
//         <div className="h-[628px] w-[580px] flex flex-col mt-[250px] gap-10 ml-[150px]">
//           <button onClick={authenticate} className="bg-[#FA7275] h-[60px] cursor-pointer w-[600px] font-medium mt-30px shadow-custom-blue rounded-full text-white">
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
