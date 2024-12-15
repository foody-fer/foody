import Link from 'next/link';
import { useState } from 'react';

const api = "";  //backend

const SignIn = () => {
  const [input, setValue] = useState('')
  const [errorMessage, setEmailError] = useState('')
  const [bool1, setBool1] = useState(true)

  const [password, setPassword] = useState('')
  const [errorMessage2, setEmailError2] = useState('')
  const [bool2, setBool2] = useState(true)

  const [serverErrorMessage, setServerErrorMessage] = useState('')

  const inputOnChange = (e : any) => {
    setValue(e.target.value)
  }

  const passwordOnChange = (e : any) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault()

    let var1 = false, var2 = false

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
      setBool1(true)
      var1 = true
    } else {
      let counter = 0
      let tmp = input.split('') 
      tmp.map(t => ( (/^[a-zA-Z0-9._]$/.test(t)) ? '' : counter++))

      if(!counter && /^[a-zA-Z]$/.test(tmp[0])){
        setBool1(true)
        var1 = true
      } else {
        setEmailError('Incorrect e-mail/username format')
        setServerErrorMessage('')  
        setBool1(false)
      }
    }

    if(password.length < 6){
      setEmailError2('Password must be longer then 6 characters')
      setServerErrorMessage('')
      setBool2(false)
    } else{
      setBool2(true)
      var2 = true
    }
  }
  
  return (
    <div className="bg-white text-textColor rounded-[1.3rem] h-[31rem] w-[65%] sm:w-[58%] md:w-[47%] lg:w-[38%] border-2 border-white absolute top-[17%] left-[18%] sm:left-[22%] md:left-[28%] lg:left-[32%] p-8">
        <h2 className='font-bold text-[21px] sm:text-[22px] md:text-[24px] lg:text-[26px] mb-4'>Welcome back 👋</h2>
        <p className='sm:text-[16px] md:text-[18px]'>We've been missing you!</p>
        <p className='sm:text-[16px] md:text-[18px]'>Find out what's new.</p>

        <form onSubmit={handleSubmit}>
            <input type="text" onChange={inputOnChange} placeholder="E-mail / username" className="form-control mt-3" maxLength={50} required/>
            {bool1 ? '' : <div style={{ color: 'red' }} className='text-[13px] sm:text-[15px] lg:text-[16px]'>{errorMessage}</div>}
            <input type="password" onChange={passwordOnChange} placeholder="Password" className="form-control mt-3" maxLength={20} required/>
            {bool2 ? '' : <div style={{ color: 'red' }} className='text-[13px] sm:text-[15px] lg:text-[16px]'>{errorMessage2}</div>}

            {serverErrorMessage && <div style={{ color: 'red' }} className='lg:text-[15px]'>{serverErrorMessage}</div>}

            <div className='buttons mt-3'>
              <button type="submit" className="bg-resedaGreen text-white rounded-md px-4 py-2 mr-2 hover:bg-green-800 transition duration-300">
                Sign in
              </button>

              <Link href='/'>
                  <button className="bg-[#737380] text-white rounded-md p-2 px-4 hover:bg-red-600 transition duration-300">
                      Close
                  </button>
              </Link>
            </div>
        </form>
        
        <div className='text-[17px] absolute bottom-14'>
            <span>Don't have an account?</span>
            <Link href='/sign-up'>
              <button className='ml-[0.4rem] text-resedaGreen font-semibold'>Sign up</button>
            </Link>
        </div>
    </div>
  );
};

export default SignIn;