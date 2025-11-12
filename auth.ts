import { supabase } from './supabase';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string): Promise<void> => {
  console.log(`OTP for ${email}: ${otp}`);
};

export const signUp = async (email: string, password: string) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('No user returned from signup');

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error: userError } = await supabase.from('users').insert({
    id: authData.user.id,
    email,
    email_verified: false,
    otp_code: otp,
    otp_expires_at: expiresAt,
  });

  if (userError) throw userError;

  await sendOTPEmail(email, otp);

  return { user: authData.user, otp };
};

export const verifyOTP = async (email: string, otp: string) => {
  const { data: users, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!users) throw new Error('User not found');

  if (users.otp_code !== otp) {
    throw new Error('Invalid OTP');
  }

  const now = new Date();
  const expiresAt = new Date(users.otp_expires_at);

  if (now > expiresAt) {
    throw new Error('OTP has expired');
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({
      email_verified: true,
      otp_code: null,
      otp_expires_at: null,
    })
    .eq('email', email);

  if (updateError) throw updateError;

  return true;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('email_verified')
    .eq('id', data.user.id)
    .maybeSingle();

  if (userError) throw userError;

  if (!userData?.email_verified) {
    await supabase.auth.signOut();
    throw new Error('Email not verified. Please verify your email first.');
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resendOTP = async (email: string) => {
  const { data: users, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!users) throw new Error('User not found');

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error: updateError } = await supabase
    .from('users')
    .update({
      otp_code: otp,
      otp_expires_at: expiresAt,
    })
    .eq('email', email);

  if (updateError) throw updateError;

  await sendOTPEmail(email, otp);

  return otp;
};
