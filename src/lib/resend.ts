import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate } from '../components/email/authTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLoginEmail({
  to,
  token,
}: {
  to: string;
  token: string;
}) {
  const { data, error } = await resend.emails.send({
    from: 'Terra <onboarding@webzster.com>',
    to: [to],
    subject: 'Authentication | Terra',
    react: EmailTemplate({
      url: `${process.env.NEXT_PUBLIC_FE_URL}/validate/${token}`,
    }),
  });

  if (error) {
    console.log(error.message);

    return {
      status: 500,
      error,
    };
  }

  return {
    status: 200,
    data,
  };
}
