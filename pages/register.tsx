import { useState } from 'react';
import Layout from '../layouts/Main';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { registerUser } from 'store/apiCalls/authAPI';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const [user,setUser] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  // const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      dispatch(registerUser({username:user,password:password,name:name,email:email,router}))
      setUser('')
      setPassword('')
      setName('')
      setEmail('')
    }catch(err:any){
     console.log("Error register : ",err)
    }
   }
  const handleUserInput = (e:any) => setUser(e.target.value)
  const handlePwdInput = (e:any) => setPassword(e.target.value)
  const handleNameInput = (e:any) => setName(e.target.value)
 const handleEmailInput = (e:any) => setEmail(e.target.value)


  return(
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/products">
            <a><i className="icon-left"></i> Back to store</a>
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">Create an account and discover the benefits</h2>
          <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing 
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__input-row">
              <input className="form__input" placeholder="First Name" type="text"   value={name}
                  onChange={handleNameInput}/>
            </div>
            
            {/* <div className="form__input-row">
              <input className="form__input" placeholder="Last Name" type="text"   value={lastName}
                  onChange={handleLastNameInput}/>
            </div> */}
            <div className="form__input-row">
              <input className="form__input" placeholder="User name" type="text"   value={user}
                  onChange={handleUserInput}/>
            </div>
            
            <div className="form__input-row">
              <input className="form__input" placeholder="Email" type="text"   value={email}
                  onChange={handleEmailInput}/>
            </div>
            
            <div className="form__input-row">
              <input className="form__input" type="Password" placeholder="Password"   value={password}
                  onChange={handlePwdInput} />
            </div>

            <div className="form__info">
              <div className="checkbox-wrapper">
                <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                  <input name="signed-in" type="checkbox" id="check-signed-in" />
                  <span className="checkbox__check"></span>
                    <p>I agree to the Google Terms of Service and Privacy Policy</p>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Sign up</button>

            <p className="form__signup-link">
              <Link href="/login">
                <a href="#">Are you already a member?</a>
              </Link>
            </p>
          </form>
        </div>

      </div>
    </section>
  </Layout>
  )
  }
  
export default RegisterPage
  