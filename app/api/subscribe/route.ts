import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, lang } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. تسجيل الإيميل في القائمة (Audience)
    try {
      await resend.contacts.create({
        email: email,
        audienceId: '68e815fc-1ccb-4f74-8368-d2d931781065',
      });
    } catch (e) {
      console.log("Contact might already exist");
    }

    // 2. إعداد محتوى الإيميل على حسب اللغة المرسلة من الـ Frontend
    const emailContent: any = {
      ar: {
        subject: 'مرحباً بك في خوارزمي - Khawarizmai',
        title: 'شكراً لانضمامك إلينا!',
        body: 'تم تسجيل بريدك الإلكتروني بنجاح. ستتوصل بآخر مقالاتنا وتحديثاتنا قريباً.',
        dir: 'rtl'
      },
      fr: {
        subject: 'Bienvenue chez Khawarizmai',
        title: 'Merci de nous avoir rejoint !',
        body: 'Votre e-mail a été enregistré avec succès. Vous recevrez bientôt nos derniers articles et mises à jour.',
        dir: 'ltr'
      },
      en: {
        subject: 'Welcome to Khawarizmai',
        title: 'Thank you for joining us!',
        body: 'Your email has been successfully registered. You will receive our latest articles and updates soon.',
        dir: 'ltr'
      }
    };

    // اختيار اللغة المناسبة (والعربية كاختيار افتراضي)
    const content = emailContent[lang] || emailContent.ar;

    // 3. إرسال الإيميل الترحيبي بتنسيق احترافي
    const { data, error } = await resend.emails.send({
      from: 'Khawarizmai <contact@khawarizmai.xyz>', // تأكد من توثيق الدومين في Resend
      to: email,
      subject: content.subject,
      html: `
        <div style="direction: ${content.dir}; font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
          <h2 style="color: #2563eb;">${content.title}</h2>
          <p style="color: #444; font-size: 16px; line-height: 1.6;">${content.body}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center;">© 2026 Khawarizmai. Built for the future of AI.</p>
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