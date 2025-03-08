'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Copy } from 'lucide-react';

export default function PostGenerator() {
   const [topic, setTopic] = useState('');
   const [post, setPost] = useState('');
   const [image, setImage] = useState('');
   const [loadingPost, setLoadingPost] = useState(false);
   const [loadingImage, setLoadingImage] = useState(false);

   const generatePost = async () => {
      setLoadingPost(true);
      setPost('');

      try {
         const response = await fetch('/api/generate-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
         });

         const data = await response.json();
         setPost(data.message);
      } catch (error) {
         console.error('Erro ao gerar post:', error);
         setPost('Erro ao gerar post.');
      } finally {
         setLoadingPost(false);
      }
   };

   const generateImage = async () => {
      setLoadingImage(true);
      setImage('');

      try {
         const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
         });

         const data = await response.json();
         setImage(data.imageUrl);
      } catch (error) {
         console.error('Erro ao gerar imagem:', error);
         setImage('');
      } finally {
         setLoadingImage(false);
      }
   };

   return (
      <div className="w-full h-screen flex flex-col bg-darkBg text-white">
         {/* Input Centralizado no Topo */}
         <div className="w-full flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-neon mb-4">
               🚀 Criador de Conteúdo
            </h1>
            <motion.input
               type="text"
               placeholder="Digite um assunto..."
               value={topic}
               onChange={(e) => setTopic(e.target.value)}
               className="w-full max-w-lg p-3 rounded-lg bg-gray-900 text-white border border-neon focus:outline-none focus:ring-2 focus:ring-neon mb-4"
               whileFocus={{ scale: 1.02 }}
            />
            <div className="flex gap-4">
               <motion.button
                  onClick={generatePost}
                  disabled={loadingPost}
                  className="bg-neon text-black px-6 py-3 rounded-lg font-bold hover:opacity-80 transition duration-300 flex items-center justify-center w-40"
                  whileHover={{ scale: 1.05 }}
               >
                  {loadingPost ? (
                     <Loader className="animate-spin w-5 h-5" />
                  ) : (
                     'Gerar Post'
                  )}
               </motion.button>

               <motion.button
                  onClick={generateImage}
                  disabled={loadingImage}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:opacity-80 transition duration-300 flex items-center justify-center w-40"
                  whileHover={{ scale: 1.05 }}
               >
                  {loadingImage ? (
                     <Loader className="animate-spin w-5 h-5" />
                  ) : (
                     'Gerar Imagem'
                  )}
               </motion.button>
            </div>
         </div>

         {/* Layout Principal: Texto e Imagem lado a lado */}
         <div className="flex flex-1 w-full h-full">
            {/* Lado Esquerdo - Post (Texto) */}
            <div className="w-1/2 h-full p-6 border-r border-neon flex flex-col">
               <h2 className="text-2xl font-semibold text-neon text-center mb-4">
                  📜 Post Gerado
               </h2>
               <motion.div
                  className="bg-gray-800 rounded-lg border border-neon p-4 h-full overflow-y-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
               >
                  {loadingPost ? (
                     <p className="text-gray-400 text-center">
                        Gerando post...
                     </p>
                  ) : post ? (
                     <p className="text-gray-300 whitespace-pre-line text-lg">
                        {post}
                     </p>
                  ) : (
                     <p className="text-gray-500 text-center">
                        Nenhum post gerado ainda.
                     </p>
                  )}
               </motion.div>
            </div>

            {/* Lado Direito - Imagem */}
            <div className="w-1/2 h-full p-6 flex flex-col">
               <h2 className="text-2xl font-semibold text-neon text-center mb-4">
                  🖼️ Imagem Gerada
               </h2>
               <motion.div
                  className="bg-gray-800 rounded-lg border border-neon p-4 h-full overflow-y-auto flex justify-center items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
               >
                  {loadingImage ? (
                     <p className="text-gray-400">Gerando imagem...</p>
                  ) : image ? (
                     <img
                        src={image}
                        alt="Imagem gerada"
                        className="w-full h-auto max-h-full object-contain rounded-lg"
                     />
                  ) : (
                     <p className="text-gray-500">
                        Nenhuma imagem gerada ainda.
                     </p>
                  )}
               </motion.div>
            </div>
         </div>
      </div>
   );
}
