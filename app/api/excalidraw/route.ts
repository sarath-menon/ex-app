import { NextResponse } from 'next/server';
import { elementsStore } from '@/lib/config';

export async function GET() {
    // Return the current state
    return NextResponse.json({ elements: elementsStore });
}

export async function POST(request: Request) {
    // Parse the incoming request to add a new element
    const data = await request.json();
    const newElement = {
        id: elementsStore.length + 1,
        type: data.type,
        x: data.x,
        y: data.y
    };
    elementsStore.push(newElement);
    return NextResponse.json({ message: 'Element added', element: newElement });
}