import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AuthForm from '../Components/AuthForm';

const Register = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (formData) => { // Recebe dados diretamente do AuthForm
        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };
        
        // Validações 
        if (userData.password.length < 6) {
            setError("Sua senha precisa ter mais de 6 caracteres");
            return false; // Retorna false para impedir submit
        }
        
        if (userData.email === userData.password) {
            setError("Email não pode ser igual a senha");
            return false;
        }

        if (userData.password !== userData.confirmPassword) {
            setError("As senhas não são iguais");
            return false;
        }

        try {
            await axios.post('http://localhost:5000/register', userData);
            alert('Cadastro feito!');
            navigate('/login');
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "Erro no cadastro");
            return false;
        }
    };

    return (
        <div className="container">
            <AuthForm 
                type="register" 
                onSubmit={handleSubmit} 
                error={error}
                showConfirmPassword={true} // Adicione esta prop
            />
        </div>
    );
};

export default Register;