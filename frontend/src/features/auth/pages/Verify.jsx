import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../service/auth.api';
import toast from 'react-hot-toast';
import './auth.scss';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('Confirming your identity...');
    const navigate = useNavigate();
    const hasCalledVerify = useRef(false);

    useEffect(() => {
        const token = searchParams.get('token');
        if (token && !hasCalledVerify.current) {
            hasCalledVerify.current = true;
            handleVerify(token);
        } else if (!token) {
            setStatus('error');
            setMessage('No verification token found. Please check your email link.');
        }
    }, [searchParams]);

    const handleVerify = async (token) => {
        try {
            await verifyEmail(token);
            setStatus('success');
            setMessage('Your account has been successfully verified! You can now access your discovery workspace.');
            
            // Auto-redirect after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Verification failed. This link may have expired or is invalid.');
        }
    };

    return (
        <div className="auth-modern-layout">
            <div className="auth-card-modern" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div className="auth-header-minimal" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <span className="welcome-label" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                         <div className="premium-logo-box" style={{ width: '2rem', height: '2rem', background: '#fff', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             <div className="inner-circle" style={{ width: '1rem', height: '1rem', background: '#000', borderRadius: '50%' }}></div>
                         </div>
                    </span>
                    <h1 className="main-title">
                        {status === 'verifying' ? 'Verifying Identity' : status === 'success' ? 'Identity Confirmed' : 'Verification Issue'}
                    </h1>
                </div>

                <div className="verify-body" style={{ margin: '2rem 0' }}>
                    {status === 'verifying' && (
                        <div className="modern-success-box" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', color: '#888' }}>
                            <i className="ri-loader-4-line spin" style={{ fontSize: '24px' }}></i>
                            <span style={{ fontSize: '15px' }}>{message}</span>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="modern-success-box" style={{ background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.1)', color: '#22c55e', flexDirection: 'column', padding: '2rem 1.5rem', textAlign: 'center' }}>
                            <i className="ri-checkbox-circle-fill" style={{ fontSize: '48px', marginBottom: '0.5rem' }}></i>
                            <p style={{ margin: 0, fontSize: '15px', fontWeight: '500', color: '#fff', lineHeight: 1.6 }}>{message}</p>
                            <p style={{ margin: '1rem 0 0 0', fontSize: '12px', color: '#666' }}>Redirecting to sign in...</p>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="modern-success-box" style={{ background: 'rgba(244,63,94,0.05)', borderColor: 'rgba(244,63,94,0.1)', color: '#f43f5e', flexDirection: 'column', padding: '2rem 1.5rem', textAlign: 'center' }}>
                            <i className="ri-error-warning-fill" style={{ fontSize: '48px', marginBottom: '0.5rem' }}></i>
                            <p style={{ margin: 0, fontSize: '14px', color: '#fca5a5', lineHeight: 1.6 }}>{message}</p>
                        </div>
                    )}
                </div>

                {status === 'success' && (
                    <button onClick={() => navigate('/login')} className="modern-submit-btn" style={{ marginTop: '0' }}>
                        Sign in now →
                    </button>
                )}
                
                {status === 'error' && (
                    <button onClick={() => navigate('/register')} className="modern-submit-btn" style={{ marginTop: '0' }}>
                        Create new account
                    </button>
                )}

                <div className="auth-divider-modern" style={{ marginTop: '3rem' }}>
                    <span style={{ letterSpacing: '0.05em' }}>COROS SECURE IDENTITY</span>
                </div>
            </div>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default Verify;
