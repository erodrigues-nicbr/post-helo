import PostGenerator from '@/components/PostGenerator';

export default function Home() {
   return (
      <main className="min-h-screen bg-darkBg text-white flex items-center justify-center p-6">
         <div className="w-full bg-cardBg p-8 rounded-2xl shadow-lg border border-neon text-center">
            <PostGenerator />
         </div>
      </main>
   );
}
