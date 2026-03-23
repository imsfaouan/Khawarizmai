import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    // 1. كنجيبو الساروت من Vercel (ماشي من ملف)
    const serviceAccountKey = process.env.GOOGLE_INDEXING_KEY;

    if (!serviceAccountKey) {
      throw new Error("الساروت ما كاينش في إعدادات Vercel!");
    }

    // 2. كنحولوا النص (JSON) لساروت حقيقي
    const credentials = JSON.parse(serviceAccountKey);

    // 3. تفعيل الاتصال مع جوجل
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing('v3');

    // 4. إرسال طلب الأرشفة الفورية
    const response = await indexing.urlNotifications.publish({
      auth: authClient as any,
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("Indexing Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}