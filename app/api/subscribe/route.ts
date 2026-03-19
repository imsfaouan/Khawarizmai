import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// هاد الساروت غانجيبوه من Vercel Environment Variables باش يبقى محمي
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // هنا كنربطو السيت بـ Resend وبـ Audience ديالك (68e815fc...)
    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: '68e815fc-1ccb-4f74-8368-d2d931781065', 
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}