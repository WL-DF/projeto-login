import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import AuthForm from "../Components/AuthForm"
import axios from 'axios'
import '../Styles/global.css'

const Login = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (formData) => { // Recebe dados DIRETAMENTE do AuthForm
        try {
            const res = await axios.post('http://localhost:5000/login', {
                email: formData.email,
                password: formData.password
            });

            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError('Email ou senha incorretos');
        }
    };

    return (
        <div className="container">
            <AuthForm
                type='login'
                onSubmit={handleSubmit} // Agora recebe os dados já processados
                error={error}
            />
        </div>
    )
}

export default Login