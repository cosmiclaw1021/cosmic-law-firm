import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const sanitize = (value: string | undefined): string => (value || '').trim();

export async function POST(request: Request) {
  try {
    const payload: ContactPayload = await request.json();
    const name = sanitize(payload.name);
    const email = sanitize(payload.email);
    const message = sanitize(payload.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // TODO: Forward to a real backend or third-party service.

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('contact API error', error);
    return NextResponse.json(
      { error: 'We could not submit your message right now. Please try again.' },
      { status: 500 }
    );
  }
}
