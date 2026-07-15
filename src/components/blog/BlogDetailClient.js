"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Heart, Clock, ArrowRight, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Simple markdown parser for the blog content
function parseMarkdown(md) {
  let html = md;
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-black mt-10 mb-4 text-slate-800 dark:text-white">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-black mt-12 mb-5 text-slate-900 dark:text-white">$1</h2>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-black text-slate-800 dark:text-white">$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em class="text-slate-600 dark:text-slate-400 italic">$1</em>');
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-5 list-disc marker:text-brand-blue mb-2 font-medium text-slate-600 dark:text-slate-300 leading-relaxed">$1</li>');
  
  html = html.split('\n\n').map(p => {
    if (p.trim().startsWith('<h') || p.trim().startsWith('<li')) return p;
    if (p.trim() === '') return '';
    return `<p class="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-medium">${p}</p>`;
  }).join('');
  
  return html;
}

export function BlogDetailClient({ post, relatedPosts }) {
  const [mounted, setMounted] = useState(false);
  const [liked, setLiked] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const parsedContent = parseMarkdown(post.content);

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  if (!mounted) return null;

  return (
    <div className="relative bg-white dark:bg-[#020617] min-h-screen pb-32">
      
      {/* READING PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-blue origin-left z-50 shadow-glow"
        style={{ scaleX }}
      />

      {/* BACK BUTTON */}
      <div className="absolute top-8 left-8 z-40 hidden md:block">
        <Link href="/blog" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-slate-100 text-slate-600 transition-all hover:scale-105 hover:bg-white hover:text-brand-blue dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-sky-400">
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black tracking-wider text-white shadow-sm ${post.bg === 'bg-sky-50' ? 'bg-sky-500' : post.bg === 'bg-brand-navy' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
            {post.category}
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] max-w-4xl tracking-tight"
        >
          {post.title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl"
        >
          {post.excerpt}
        </motion.p>

        {/* AUTHOR BLOCK */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center gap-4 rounded-full bg-slate-50 border border-slate-100 p-2 pr-6 dark:bg-slate-900/50 dark:border-slate-800 shadow-sm"
        >
          <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-blue text-white font-black text-lg">
            {post.authorImage}
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-slate-900 dark:text-white">{post.author}</p>
            <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
              {post.date} • <Clock size={12} /> {post.time}
            </p>
          </div>
        </motion.div>
      </section>

      {/* MAIN IMAGE */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className={`relative w-full aspect-[21/9] md:aspect-[21/7] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden ${post.bg} flex items-center justify-center p-12 shadow-soft dark:border dark:border-slate-800`}>
          <Image 
            src={post.img} 
            alt={post.title} 
            fill 
            className={`object-contain p-12 lg:p-20 ${post.id === 2 ? "brightness-0 invert opacity-40" : ""}`}
            priority
          />
        </div>
      </motion.div>

      {/* CONTENT BODY */}
      <div className="max-w-[104rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12 lg:gap-24 relative">
        
        {/* ARTICLE TEXT */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl ml-auto mr-auto lg:mr-0 w-full prose-container"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />

        {/* STICKY SIDEBAR (SOCIALS) */}
        <div className="hidden lg:block">
          <div className="sticky top-32 flex flex-col items-center gap-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Share</p>
            
            <button 
              onClick={() => {
                setLiked(!liked);
                toast.success(liked ? "Removed from favorites" : "Added to favorites");
              }}
              className={`grid h-12 w-12 place-items-center rounded-full transition-all duration-300 shadow-sm ${liked ? 'bg-rose-50 text-rose-500 border border-rose-100 dark:bg-rose-900/30 dark:border-rose-800' : 'bg-white border border-slate-100 text-slate-400 hover:text-brand-blue hover:border-brand-blue/30 dark:bg-slate-900 dark:border-slate-800 dark:hover:text-sky-400'}`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} className={liked ? "animate-pulse" : ""} />
            </button>
            
            <button onClick={handleShare} className="grid h-12 w-12 place-items-center rounded-full bg-white border border-slate-100 text-slate-400 shadow-sm hover:text-brand-blue hover:border-brand-blue/30 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:text-sky-400">
              <Twitter size={18} />
            </button>
            
            <button onClick={handleShare} className="grid h-12 w-12 place-items-center rounded-full bg-white border border-slate-100 text-slate-400 shadow-sm hover:text-brand-blue hover:border-brand-blue/30 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:text-sky-400">
              <Linkedin size={18} />
            </button>

            <button onClick={handleShare} className="grid h-12 w-12 place-items-center rounded-full bg-white border border-slate-100 text-slate-400 shadow-sm hover:text-brand-blue hover:border-brand-blue/30 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:text-sky-400">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SOCIALS (Bottom fixed) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl border border-slate-100 lg:hidden dark:bg-slate-900/90 dark:border-slate-800">
         <button onClick={() => setLiked(!liked)} className={`grid h-10 w-10 place-items-center rounded-full ${liked ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
           <Heart size={18} fill={liked ? "currentColor" : "none"} />
         </button>
         <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
         <button onClick={handleShare} className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
           <Twitter size={16} />
         </button>
         <button onClick={handleShare} className="grid h-10 w-10 place-items-center rounded-full bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
           <Share2 size={16} />
         </button>
      </div>

      {/* READ NEXT SECTION */}
      <div className="max-w-[104rem] mx-auto px-4 sm:px-6 lg:px-8 mt-32 pt-20 border-t border-slate-100 dark:border-slate-800/80">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Read Next</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {relatedPosts.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium dark:bg-slate-900/50 dark:border-slate-800">
              <div className={`relative h-64 w-full ${article.bg} p-8 flex items-center justify-center`}>
                <Image 
                  src={article.img} 
                  alt="" 
                  fill 
                  className={`object-contain p-12 transition-transform duration-700 group-hover:scale-110 ${article.id === 2 ? "brightness-0 invert opacity-40" : ""}`} 
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5 dark:group-hover:bg-black/20" />
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-brand-blue dark:bg-sky-500/10 dark:text-sky-400">
                  {article.category}
                </span>
                <h2 className="text-2xl font-black leading-tight text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 dark:text-white dark:group-hover:text-sky-400">
                  {article.title}
                </h2>
                <div className="mt-8 flex items-center justify-between text-sm font-bold text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {article.time}</span>
                  <span className="flex items-center gap-1.5 text-brand-blue dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                    Read article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
