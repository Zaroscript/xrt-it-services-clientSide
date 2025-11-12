import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
    const apiEndpoint = `${apiUrl}/auth/register`;
    
    console.log('Sending registration request to:', apiEndpoint);
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        fName: body.fName,
        lName: body.lName,
        phone: body.phone,
      }),
    });

    const responseText = await response.text();
    let data;
    
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('Invalid response from server');
    }

    console.log('Registration response status:', response.status);
    console.log('Registration response data:', data);

    if (!response.ok) {
      const errorMessage = data.message || data.error || 'Registration failed';
      console.error('Registration failed:', errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred during registration',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

