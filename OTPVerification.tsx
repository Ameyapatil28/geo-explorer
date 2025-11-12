import { useState } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { verifyOTP, resendOTP } from '../lib/auth';

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const OTPVerification = ({ email, onSuccess, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOTP(email, otp);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setResendMessage('');

    try {
      const newOtp = await resendOTP(email);
      console.log('New OTP:', newOtp);
      setResendMessage('New OTP sent! Check console.');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Verify Email</h2>
        <p className="text-gray-600 mb-8 text-center">
          Enter the 6-digit code sent to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
              placeholder="000000"
              required
              maxLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {resendMessage && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
              {resendMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>

          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-700 font-medium"
          >
            Back to Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
