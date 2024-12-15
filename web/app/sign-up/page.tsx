"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css'

function SignUpPage(){
    //kontrola formata imena
    const [name, setName] = useState('')
    const [errorMessage1, setNameError] = useState('')

    //kontrola formata prezimena
    const [surname, setSurname] = useState('')
    const [errorMessage2, setSurnameError] = useState('')

    //kontrola formata korisnickog imena
    const [username, setUsername] = useState('')
    const [errorMessage3, setUsernameError] = useState('')

    //kontrola formata broja
    const [num, setNum] = useState('')
    const [errorMessage4, setNumError] = useState('')
    
    //kontrola formata e-maila
    const [email, setEmail] = useState('')
    const [errorMessage5, setEmailError] = useState('')

    //kontrola formata lozinke
    const [password, setPassword] = useState('')
    const [errorMessage6, setPasswordError] = useState('')

    const router = useRouter();
    
    const emailOnChange = (e : any) => {
        setEmail(e.target.value)
    }

    const passwordOnChange = (e : any) => {
        setPassword(e.target.value)
    }

    const nameOnChange = (e : any) => {
        setName(e.target.value)
    }

    const surnameOnChange = (e : any) => {
        setSurname(e.target.value)
    }

    const usernameOnChange = (e : any) => {
        setUsername(e.target.value)
    }

    const numOnChange = (e : any) => {
        setNum(e.target.value)
    }

    //funkcija za trazenje pritisnutih gumba form-a
    function findChecked():string {
        // Selektiraj sve inpute(radio button ovdje) s imenom "role" unutar el. s id-om toggleForm1
        let radios = document.querySelectorAll<HTMLInputElement>('#toggleForm input[name="gender"]');
        let selectedValue = '';

        // Prolazimo kroz sve radio button-e i ako radio ima atribut checked true znaci da je oznacen
        radios.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.value; // Uzmi vrednost označenog radio button-a
            }
        });

        return selectedValue;
    }

    //provjera formata inputa na submit
    const handleSubmit = async (e : any) => {
        /*ova funkcija sprecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
        e.preventDefault()

        const btn_gender = findChecked().toUpperCase()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Incorrect e-mail format')
        } else {
            setEmailError('')
        }

        //lozinka mora biti dulja od 6 znakova te moze biti bilo koja kombinacija slova/brojeva/specijalnih znakova
        if(password.length < 6){
            setPasswordError('Password must be longer then 6 characters')
        } else {
            setPasswordError('')
        }

        //ime i prezime moraju pocinjat velikom slovom i sastojat se samo od slova te biti duljine barem 2
        let tmp1 = name.split('')
        if(/^[A-ZČĆŠĐŽ]+$/.test(tmp1[0]) && name.length > 1){
            let br = 0;
            tmp1.map(t => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? '' : br++))
            //ako je br 0 to znaci da ga nismo povecavali tj. svaki t se nalazio u zadanom regex-u
            if(br === 0){
                setNameError('')
            }
            else{
                setNameError('Incorrect name format')
            } 
        } else {
            setNameError('Incorrect name format')
        }

        let tmp2 = surname.split('')
        if(/^[A-ZŠČĆĐŽ]+$/.test(tmp2[0]) && surname.length > 1){
            let br = 0;
            tmp2.map(t => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? '' : br++))
            if(br === 0){
                setSurnameError('')
            }
            else{
                setSurnameError('Incorrect surname format')
            } 
        } else {
            setSurnameError('Incorrect surname format')
        }
        
        //korisnicko ime mora pocinjat slovom te dalje moze biti bilo koja kombinacija slova/brojeva/./_ te duljine barem 4
        let tmp3 = username.split('')
        if(/^[a-zA-Z]$/.test(tmp3[0]) && username.length > 3){
            let br = 0;
            tmp3.map(t => (/^[a-zA-Z0-9._]$/.test(t) ? '' : br++))
            if(br === 0){
                setUsernameError('')
            }
            else{
                setUsernameError('Incorrect username format')
            } 
        } else {
            setUsernameError('Incorrect username format')
        }

        // mobilni broj mora se sastojati od pozivnog broja drzave u formatu +(pa pozivni broj), npr. +385, +1, +43
        // zatim slijedi razmak pa ostatak mobilnog broja, npr. 0913452936 te taj dio mora biti dulji od 6 znamenki
        let tmp4 = num.split(' ')
        let tmp5 = tmp4[0].split('')
        if(tmp5[0] === '+' && isFinite(Number(tmp4[1])) && tmp4[1].length > 6 && !tmp4[1].includes('.')){
            tmp5[0] = '0'
            let br = 0
            tmp5.map(t => isFinite(Number(t)) ? '' : br++)
            if(br === 0 && tmp5[1] && tmp4[1]){
                setNumError('')
            } else {
                setNumError('+(country_code)  phone_number')
            }
        } else {
            setNumError('+(country_code)  phone_number')
        }
    }

    // funckija za odselektiranje gumba ako drugi selektiramo
    function toggleActive(){
        let labels = document.querySelectorAll('#toggleForm .btn') as NodeListOf<HTMLLabelElement>;
        
        labels.forEach(label => {
            label.onclick = () => {
            // Uklanja 'active' klasu sa svih labela
            labels.forEach(l => l.classList.remove('active'));
            
            // Dodaje 'active' klasu na kliknuti label
            label.classList.add('active');
            };
        });
    }

    return (
        <div className="create-acc-container bg-backgroundGreen min-h-screen min-w-screen pb-4">
            <div className='logopic w-[12rem]'>
                <img src="/images/logo.png" className='pt-[1.5rem] pl-[1.5rem]'/>
            </div>
            <div className='create-card bg-gray-100 rounded-[1rem] p-[1.4rem] pb-5 mt-[2rem] sm:mt-[0rem] sm:w-[40%] w-[60%] h-[auto] text-textColor relative top-[10%] left-[23%] sm:left-[31%]'>
                <h3 className='h3 ml-2'>
                    Create an account
                </h3>
                <p className=' ml-2 mt-[1rem]'>Sign up today and</p>
                <p className=' ml-2 mt-[-0.2rem]'>see the change tomorrow !</p>

                <form onSubmit={handleSubmit}>
                    <div className=' form-container mt-4 flex flex-col justify-center items-center'>
                        <div className="btn-group w-75" role="group" aria-label="Toggle button group" id='toggleForm'>
                            <label className="btn btn-outline-secondary" onClick={() => toggleActive()}>
                                <input type="radio" className="btn-check" name="gender" value="Male" required/> Male
                            </label>

                            <label className="btn btn-outline-secondary" onClick={() => toggleActive()}>
                                <input type="radio" className="btn-check" name="gender" value="Female" required/> Female
                            </label>
                        </div>
                    
                        <input type="text" onChange={nameOnChange} placeholder="Name" className="form-control mt-2 mb-[0.1rem] w-75" maxLength={20} required/>
                        {errorMessage1 ? <div className='text-red-700 text-xs md:text-sm'>{errorMessage1}</div> : ''}
                        
                        <input type="text" onChange={surnameOnChange} placeholder="Surname" className="form-control mt-2 mb-[0.1rem] w-75" maxLength={20} required/>
                        {errorMessage2 ? <div className='text-red-700 text-xs md:text-sm'>{errorMessage2}</div> : ''}
                        
                        <input type="text" onChange={usernameOnChange} placeholder="Username" className="form-control mt-2 mb-[0.1rem] w-75" maxLength={20} required/>
                        {errorMessage3 ? <div className='text-red-700 text-xs md:text-sm'>{errorMessage3}</div> : ''}
                        
                        <input type="text" onChange={numOnChange} placeholder="Contact (mobile/telephone number)" className="form-control mt-2 mb-[0.1rem] w-75" maxLength={19} required/>
                        {errorMessage4 ? <div className='text-red-700 text-xs md:text-sm'>{errorMessage4}</div> : ''}
                        
                        <input type="text" onChange={emailOnChange} placeholder="E-mail" className="form-control mt-2 mb-[0.1rem] w-75" maxLength={50} required/>
                        {errorMessage5 ? <div className='text-red-700 text-xs md:text-sm'>{errorMessage5}</div> : ''}
                        
                        <input type="password" onChange={passwordOnChange} placeholder="Password" className="form-control mt-2 mb-[0.1rem] w-75" maxLength={20} required/>
                        {errorMessage6 ? <div className='text-red-700 text-xs md:text-sm'>{errorMessage6}</div> : ''}

                        <div className='w-75'>
                            <input type="checkbox" className='mt-3' required/>
                            <p className='text-xs ml-[1rem] mt-[-20px]'>
                                I have read and agree to Foody's
                                <a href="" className='no-underline text-blue-600'> Terms of Service </a>
                                and <a href="" className='no-underline text-blue-500'>Privacy Policy</a> 
                            </p>
                           
                        </div>
                    </div>                                                       
                    
                    <div className='buttons ml-2 mt-[1rem] mb-[1rem] flex justify-center items-center'>
                        <button type="submit" className="btn1 rounded-[0.5rem] mr-3 py-[0.4rem] px-[0.6rem] bg-resedaGreen text-gray-100 hover:bg-green-800 transition duration-300 md:py-2 md:px-[1.8rem]">
                            Continue
                        </button>
                        <Link href={'/'} className='no-underline'>
                            <button className="close-btn mr-2 py-[0.4rem] px-[0.8rem] bg-gray-500 text-gray-100 rounded-[0.5rem] hover:bg-red-600 transition duration-300 md:py-2 md:px-[1.8rem]">
                                Close
                            </button>
                        </Link>
                    </div>

                </form>
                <br />
                <div className='link ml-[0.3rem] absolute top-[94%] left-[5%]'>
                    <span className='message'>Already have an account? </span>
                    <Link href={'/sign-in'} className='no-underline'>
                        <button className='signUp text-blue-500'> Sign in</button>
                    </Link>                
                </div>
            </div>
            <div className='picture absolute top-[4%] right-[2.5%]'>
                <img src="/images/quote.jpg" alt="motivatePicture" className='hidden rounded-[1rem] md:w-[11rem] sm:w-[9rem] sm:block'/>
            </div>

        </div>
    )  
}
  
export default SignUpPage;
