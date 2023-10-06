"use client";

import { useRouter } from 'next/navigation';

export default function Home() {

  const { push } = useRouter();
  push('/landingpage');
  
  return (

    <div>
    </div>

  )
}
