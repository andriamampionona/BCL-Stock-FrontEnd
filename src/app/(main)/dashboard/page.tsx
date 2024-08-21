"use client";
// dashboard.tsx

import Sidbar from '@/components/Sidbar';
import Header from '@/components/hader';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ArticleInPage from '@/components/Article-in/page';

const DashboardPage: React.FC = () => {


  const router = useRouter();
  const { data: session, status } = useSession(); // protection de la page
  
    useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sing-in");
    }
  }, [status, router]);

  const searchParams = useSearchParams();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  useEffect(() => {
    const queryContent = searchParams?.get('content');
    if (queryContent) {
      setSelectedContent(queryContent);
    } else {
      setSelectedContent('dashboard'); // Valeur par défaut si `content` n'est pas dans l'URL
    }
  }, [searchParams]);

  const handleLinkClick = (content: string) => {
    setSelectedContent(content);
    router.push(`?content=${content}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }



   if (status === "authenticated") { // User authenticated .........
     return (
    <div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
         <Sidbar onLinkClick={handleLinkClick} activeContent={selectedContent} />
      
        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold">
          {selectedContent ? selectedContent.charAt(0).toUpperCase() + selectedContent.slice(1) : 'Dashboard'}
        </h1>
            </div>
            {selectedContent === 'dashboard' && <p>Dashboard Content</p>}
            {selectedContent === 'products' && <>Products Content</>}
            {selectedContent === 'orders' && <ArticleInPage />}
            {selectedContent === 'users' && <>Users Content</>}
            {selectedContent === 'analytics' && <>Analytics Content</>}
          </main>
        </div>
      </div>
    </div>
  );
  }

  // Vous pouvez renvoyer null ou un composant vide ici
  return null;


}

export default DashboardPage;