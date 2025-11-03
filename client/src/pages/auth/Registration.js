import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'
const Register = () => {
 const{loading,error}= useSelector(state=>state.auth)
return (
  <>
  {error&&<span>{alert(error)}</span>}
   {loading?(<Spinner/>):(
<div className="row g-0" style={{ height: '100vh', margin: 0 }}>
      {/* Left side - image */}
      <div className="col-md-6" style={{ padding: 0, height: '100%' }}>
        <img
          src="./assets/banner2.jpg"
          alt="registerImage"
          style={{
            width: "120%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>

      {/* Right side - form */}
      <div 
        className="col-md-6 d-flex align-items-center justify-content-center" 
        style={{ padding: '10px' }}
      >
        
          <Form formTitle={'Register'} submitBtn={ 'Register'} formType={'register'} />
      </div>
    </div>
   )}
  
    
    </>
  )
}

export default Register
