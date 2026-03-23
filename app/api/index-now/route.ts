import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    
    // 1. تحديد مكان الساروت (اللي سميناه google-indexing.json)
    const keyPath = path.join(process.cwd(), 'google-indexing.json');

    // 2. تفعيل الاتصال مع جوجل
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing('v3');

    // 3. إرسال طلب الأرشفة الفورية
    const response = await indexing.urlNotifications.publish({
      auth: authClient as any,
      requestBody: {
        url: url, // الرابط اللي غاتعطيه ليه
        type: 'URL_UPDATED', // كتعلم جوجل بلي الرابط جديد أو تبدل
      },
    });

    return NextResponse.json({ success: true, message: "جوجل في الطريق أ شريكي!", data: response.data });
  } catch (error: any) {
    console.error("Indexing Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}