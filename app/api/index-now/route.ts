import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, password } = await req.json();

    // 1. التحقق من كلمة السر
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "كلمة السر غلاط أ شريكي! ❌" }, { status: 401 });
    }

    // 2. جلب الساروت من Vercel
    const serviceAccountKey = process.env.GOOGLE_INDEXING_KEY;
    if (!serviceAccountKey) throw new Error("الساروت مفقود في Vercel!");

    const credentials = JSON.parse(serviceAccountKey);

    // 3. الاتصال بجوجل
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing('v3');

    const response = await indexing.urlNotifications.publish({
      auth: authClient as any,
      requestBody: { url, type: 'URL_UPDATED' },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}