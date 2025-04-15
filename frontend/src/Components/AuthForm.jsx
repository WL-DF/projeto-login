import '../Styles/auth.css';

const AuthForm = ({ type, onSubmit, error, showConfirmPassword = false }) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        onSubmit(data);
    };

    return (
        <div className='auth-pai'>
            <h2 className='auth-titulo'>
                {type === 'login' ? 'Login' : 'Cadastre-se'}
            </h2>

            {error && <div className='auth-error'>{error}</div>}

            <form onSubmit={handleFormSubmit} className='auth-form'>
                {type === 'register' && (
                    <div className='input-grupo'>
                        <input
                            type='text'
                            name='name'
                            placeholder='Nome Completo'
                            required
                        />
                    </div>
                )}

                <div className='input-grupo'>
                    <input 
                        type='email'
                        name='email'
                        placeholder='Seu email'
                        required
                    />
                </div>

                <div className='input-grupo'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Sua senha'
                        required
                        minLength={6}
                    />
                </div>
                
                {showConfirmPassword && (
                    <div className='input-grupo'>
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirme sua senha'
                            required
                            minLength={6}
                        />
                    </div>
                )}
                
                <button type='submit' className='auth-button'>
                    {type === 'login' ? 'Entrar' : 'Criar conta'}
                </button>
            </form>

            <div className='auth-footer'>
                {type === 'login' ? (
                    <p>Não tem conta? <a href='/register'>Cadastre-se</a></p>   
                ) : (
                    <p>Já tem conta? <a href="/login">Faça login</a></p>
                )}
            </div>
        </div>
    );
};

export default AuthForm;