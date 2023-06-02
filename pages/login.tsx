import Layout from '../layouts/Main';
import Link from 'next/link';
import {useRef,useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {loginUser} from "../store/apiCalls/authAPI"
import { useRouter } from 'next/router';
const LoginPage = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [user,setUser] = useState('')
  const [password,setPassword] = useState('')
  const [errMsg,setErrMsg] = useState('')
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(()=>{
    //@ts-ignore
    userRef.current?.focus()
  },[])
  useEffect(()=>{
    setErrMsg('')
  },[user,password])
 const handleSubmit = async (e:any) => {
  e.preventDefault()
  try {
    dispatch(loginUser({username:user,password:password,router}))
    setUser('')
    setPassword('')
  }catch(err:any){
    if (!err.response) {
      setErrMsg('No server response')
    }else if (err.originalStatus === 400){
      setErrMsg('Missing Username or Password')
    }else if (err.originalStatus === 401){
      setErrMsg('Unathorized')
    }else{
      setErrMsg('Login Failed');
    }
    //@ts-ignore
    errRef.current?.focus();
  }
 }
 const handleUserInput = (e:any) => setUser(e.target.value)
 const handlePwdInput = (e:any) => setPassword(e.target.value)
  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <a><i className="icon-left"></i> Back to store</a>
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Log in</h2>
            <p className="form-block__description">Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  placeholder="username" 
                  type="text" 
                  name="username"
                  ref={userRef}
                  value={user}
                  onChange={handleUserInput}
                />
              </div>
              
              <div className="form__input-row">
                <input 
                  className="form__input" 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  onChange={handlePwdInput}
                  value={password}
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label htmlFor="check-signed-in" className={`checkbox checkbox--sm`}>
                    <input 
                      type="checkbox" 
                      name="keepSigned" 
                      id="check-signed-in" 
                    />
                    <span className="checkbox__check"></span>
                    <p>Keep me signed in</p>
                  </label>
                </div>
                <a href="/forgot-password" className="form__info__forgot-password">Forgot password?</a>
              </div>

              <div className="form__btns">
                <button type="button" className="btn-social fb-btn"><i className="icon-facebook"></i>Facebook</button>
                <button type="button" className="btn-social google-btn"><img src="/images/icons/gmail.svg" alt="gmail" /> Gmail</button>
              </div>

              <button type="submit" className="btn btn--rounded btn--yellow btn-submit">Sign in</button>

              <p className="form__signup-link">Not a member yet? <a href="/register">Sign up</a></p>
            </form>
          </div>

        </div>
      </section>
    </Layout>
  )
}
  
export default LoginPage
  