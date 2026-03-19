import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// تعريف الـ Client ديال Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // قراءة البيانات من الطلب (Request)
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'البريد الإلكتروني مطلوب' }, { status: 400 });
    }

    // 1. إضافة الشخص للقائمة (Audience)
    // درنا هاد الجزء بوحدو باش وخا يكون الشخص مسجل من قبل ما يحبسش لينا الكود
    try {
      await resend.contacts.create({
        email: email,
        audienceId: '68e815fc-1ccb-4f74-8368-d2d931781065',
      });
    } catch (e) {
      console.log("Contact already exists or Audience error");
    }

    // 2. إرسال إيميل الترحيب (هنا فين غايوصل الميساج للمشترك)
    const { data, error } = await resend.emails.send({
      from: 'Khawarizmai <onboarding@resend.dev>', // جرب هادي هي الأولى
      to: email,
      subject: 'مرحباً بك في خوارزمي - Khawarizmai',
      html: `
        <div style="direction: rtl; text-align: right; font-family: Arial, sans-serif;">
          <h2 style="color: #2563eb;">شكراً لانضمامك إلينا!</h2>
          <p>تم تسجيل بريدك بنجاح في منصة <strong>خوارزمي</strong>.</p>
          <p>ستتوصل بآخر المقالات والتحديثات قريباً.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
