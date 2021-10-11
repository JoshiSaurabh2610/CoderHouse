import React, { useState } from 'react'
import Button from '../../Components/Button'
import Card from '../../Components/Card'
import Input from '../../Components/Input';
import { verifyOtp } from '../../Http';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../Store/authSlice';

const Otp = () => {
    const [OTP, setOTP] = useState('');
    const { phoneNo, hash } = useSelector(state => state.auth.otp)

    const dispatch = useDispatch();

    async function submitHandler() {
        if(!OTP || !phoneNo || !hash)
            return;
        try {
            const { data } = await verifyOtp({ phoneNo, hash, OTP });
            console.log(data);
            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="cardWrapper">
            <div>
                <Card heading=" Enter Your OTP " imoji="lock">
                    <div style={{ marginBottom: "10px" }}>
                        <span style={{ color: "#07f" }}> example@email.com </span>
                        {/* <Link style={{color:"#07f",fontWeight:"bold",textDecoration:"none"}} to="/login"> Sign In </Link> */}
                    </div>
                    <Input onChange={(e) => setOTP(e.target.value)} type="text" />
                    <div style={{ marginTop: '40px' }}>
                        <Button text="Next" onClick={submitHandler} />
                    </div>
                    <p className="subHeading">
                        {`OTP (one Time Password) has been just send to you. Check your Email/Phone . Thanks!`}
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default Otp;
