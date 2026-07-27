import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "../components/site/Reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import productSentinel from "../assets/EX 950 Drone.webp";
import weAreBg from "../assets/we-are.jpg";
import flightBlogImg from "../assets/Blog.jpg";
import printingHero from "../assets/printing-hero.jpg";
import threeDPartsImg from "../assets/3D1.webp";
import mappingImg from "../assets/mapping.png";
import blogFeaturedImg from "../assets/blog-featured.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default BlogPage;


const BLOG_POSTS = [
  {
    id: 1,
    title: "Who We Are: The Story Behind Wingspann Global",
    excerpt: "Every startup begins with a small team that believes it can build something the country needs. Read our journey from a modest facility in Chhatrapati Sambhajinagar(Aurangabad) to a leading aerospace company.",
    category: "Our Story",
    date: "September 2025",
    readTime: "6 min read",
    image: blogFeaturedImg,
  },
  {
    id: 7,
    title: "Our First Flight: The Milestone That Started It All",
    excerpt: "Every aerospace company marks its journey with a defining first flight. What began as a concept developed in Chhatrapati Sambhajinagar(Aurangabad) has now demonstrated its ability to perform in real-world conditions.",
    category: "Milestones",
    date: "October 10, 2025",
    readTime: "5 min read",
    image: flightBlogImg,
  },
  {
    id: 2,
    title: "How Additive Manufacturing is Reducing Aerospace Production Costs",
    excerpt: "A deep dive into the materials and techniques driving cost efficiency in our latest drone chassis designs.",
    category: "Engineering",
    date: "June 28, 2026",
    readTime: "8 min read",
    image: printingHero,
  },
  {
    id: 3,
    title: "Wingspann Unveils Next-Gen LiDAR Mapping Capabilities",
    excerpt: "Our new sensor payload dramatically increases precision for topographical surveying and infrastructure inspection.",
    category: "News",
    date: "June 15, 2026",
    readTime: "4 min read",
    image: mappingImg,
  },
  {
    id: 5,
    title: "3D Printed Drone Parts: Strength vs Weight",
    excerpt: "How topology optimization and new polymers are changing the way we build drone frames.",
    category: "Engineering",
    date: "April 10, 2026",
    readTime: "7 min read",
    image: threeDPartsImg,
  },
];

function BlogPage() {
  const [activePost, setActivePost] = useState<typeof BLOG_POSTS[0] | null>(null);
  const featuredWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePost]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePost(null);
      }
    };
    if (activePost) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePost]);



  const featuredPost = BLOG_POSTS[0];
  const gridPosts = BLOG_POSTS.slice(1);

  return (
    <>
      {/* Featured Post — shown directly as first section */}
      <div
        ref={featuredWrapperRef}
        className="relative w-full h-screen flex items-center justify-center px-6 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${weAreBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

        <div className="max-w-4xl w-full text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-indigo-400">
            <span className="w-6 h-px bg-indigo-400" />
            Featured Highlight
          </div>

          <h1
            onClick={() => setActivePost(featuredPost)}
            className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.2] text-white hover:text-indigo-400 transition-colors cursor-pointer"
          >
            {featuredPost.title}
          </h1>

          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {featuredPost.excerpt}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-white/60 font-medium">
            <time dateTime={featuredPost.date}>{featuredPost.date}</time>
            <span className="w-1 h-1 rounded-full bg-current opacity-40" />
            <span>{featuredPost.readTime}</span>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setActivePost(featuredPost)}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-150 text-gray-900 font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 cursor-pointer animate-duration-300"
            >
              Read Featured Article <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Scroll down indicator */}
          <div className="flex flex-col items-center gap-2 pt-8 select-none">
            <span className="text-white/40 text-xs font-medium tracking-widest uppercase">
              Scroll to see more publications
            </span>
            <svg
              className="text-white/30 animate-bounce"
              width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid of Remaining Posts */}
      <section className="py-28 bg-white text-gray-900 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-2">
              <span className="w-6 h-px bg-gray-300" />
              Latest Publications
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-display">
              All Publications
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {gridPosts.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 0.08}>
                <article
                  onClick={() => setActivePost(post)}
                  className="group cursor-pointer flex flex-col md:flex-row bg-[#fcfcfd] rounded-3xl overflow-hidden border border-gray-200/60 hover:border-gray-350 hover:shadow-xl shadow-sm transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Left image container - Fixed width & aspect ratio to prevent stretching */}
                  <div className="relative w-full md:w-[460px] shrink-0 aspect-[16/10] overflow-hidden bg-slate-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-white/95 border border-gray-200/50 text-gray-800 text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Right side details content */}
                  <div className="w-full flex flex-col justify-between p-6 md:p-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-650 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-gray-805 group-hover:text-indigo-600 transition-colors pt-4 border-t border-gray-100">
                      Read Article
                      <ArrowUpRight className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Article / Post Story Modal */}
      {activePost && (
        <div
          onClick={() => setActivePost(null)}
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 md:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden border border-gray-100 dark:border-slate-800 cursor-default animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full z-25"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="overflow-y-auto p-6 md:p-12 space-y-8">
              {/* Header Info */}
              <div className="space-y-4 border-b border-gray-100 dark:border-slate-800 pb-6">
                <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100 dark:border-indigo-900/30">
                  {activePost.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight font-display">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                  <time dateTime={activePost.date}>{activePost.date}</time>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-305 dark:bg-slate-700" />
                  <span>{activePost.id === 1 || activePost.id === 7 ? "Chhatrapati Sambhajinagar(Aurangabad), Maharashtra" : "Wingspann Global Publications"}</span>
                </div>
              </div>

              {/* Dynamic Body content based on post.id */}
              <div className="prose dark:prose-invert max-w-none text-gray-705 dark:text-slate-300 space-y-6 md:space-y-8 text-sm md:text-base leading-relaxed">
                {activePost.id === 1 && (
                  <>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white leading-relaxed">
                      Every startup begins with a small team that believes it can build something the country needs. Ours began in September 2025, in a modest facility in Chhatrapati Sambhajinagar(Aurangabad), Maharashtra, with a handful of engineers, one whiteboard full of half-finished sketches, and a conviction that India did not need to keep importing the skies it flies in. That conviction became Wingspann Global Pvt. Ltd.
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        A Beginning Rooted in Purpose
                      </h3>
                      <p>
                        India is in the middle of a quiet but massive shift. Agriculture, infrastructure monitoring, disaster response, surveillance, and defence are all leaning harder on unmanned aerial systems every year, and much of that technology has historically come from outside our borders. We started Wingspann Global because we believed this gap was not just a business opportunity, it was a responsibility. If India is going to depend on drones for its farms, its borders, and its cities, those drones should be designed, assembled, and supported by Indian hands, for Indian conditions. That is what Make in India means to us in practice—not a slogan on a wall, but a working principle behind every UAV that leaves our facility.
                      </p>
                      <p>
                        It also means staying close to the ground realities of the customers we serve, from the price sensitivity of Indian agriculture to the rigorous documentation demanded by government tenders, and designing our processes around those realities rather than around a borrowed template.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        The People Behind the Propellers
                      </h3>
                      <p>
                        What truly sets Wingspann Global apart is not any single piece of technology—it is our people. We are a team of 20–25 young, driven individuals—engineers, designers, and problem-solvers who are building our careers even as we build this company. What defines us is a shared mindset: curiosity, adaptability, and a strong sense of ownership. As a group of young, passionate, and forward-thinking minds, we bring fresh perspectives to every challenge we take on.
                      </p>
                      <p>
                        Despite being early in our journey, our team brings together both technical depth and strategic thinking. We understand that building a strong aerospace company requires more than just good engineering—it demands clarity in execution, thoughtful planning, and a deep focus on long-term value. It’s this balance of passion, intelligence, and perspective that shapes how we work and what we aim to become.
                      </p>
                      <p>
                        Guiding all of this is a capable management team of three directors who bring the experience, vision, and steady hand a young company like ours needs, helping translate raw technical talent into a functioning, disciplined organisation. Their role is not to hover over every decision, but to set direction, remove roadblocks, and give the rest of us room to take ownership of our work. That balance of strong leadership and real autonomy is, we believe, exactly what a young technical team needs to grow into a mature one.
                      </p>
                      <p>
                        We will not pretend we are a team of twenty-year industry veterans. We are not. What we have instead is something equally valuable: hunger. Our mechanical, electronics, aeromechanic, and software teams spend their days questioning assumptions, testing ideas, failing, adjusting, and trying again, because that is how real expertise gets built in an industry that is still writing its own rulebook in India. Every senior aerospace company was once a room full of people learning as they went. We are proud to be in that room right now, and we suspect some of our best engineers ten years from now are sitting at our workbenches today, still figuring out where they fit.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        Building Quality and Culture From Day One
                      </h3>
                      <p>
                        A young company can be forgiven for chasing growth before discipline. We have chosen not to make that trade-off. From our very first months, we have been deliberate about building a culture of quality, not as a certificate to chase, but as a habit to practise. We track flight test records, maintain logbooks, and are actively developing standard operating procedures across every department, from design to assembly to inspection. We are working toward ISO 9001 certification, but more importantly, we are working toward a mindset where quality checks, documentation, and accountability are simply how work gets done here, not an afterthought bolted on before a client visit.
                      </p>
                      <p>
                        Alongside quality, we are equally invested in the kind of work culture that lets young people actually grow. Open communication across departments, room to ask questions without hesitation, and leadership that is present and approachable rather than distant—these are not perks to us, they are the foundation we are building on. We would rather have a fresher walk up to a director with an honest question than have that question go unasked out of fear.
                      </p>
                      <p>
                        A strong technical product needs a strong human system behind it, and we would rather build that system slowly and correctly than skip it for speed. In our experience so far, the two are not in tension at all—a culture where people feel safe to flag a mistake early is precisely the culture that catches quality problems before they become expensive ones.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        Infrastructure That Grows With Us
                      </h3>
                      <p>
                        Our infrastructure reflects the same honest, startup mindset. We operate from our own facility equipped for design, assembly, and testing, supported by dedicated software for design and simulation work. Where we do not yet have in-house capability, such as specialised lab testing, we partner with trusted vendors and outside experts rather than cutting corners.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        Looking Ahead
                      </h3>
                      <p>
                        We are at an exciting stage of our journey—one defined by continuous learning, discovery, and growth. As we evolve, we are actively refining our strengths, refining our processes, and gaining deeper clarity on the immense potential ahead of us. Every SOP we build, every flight test we document, and every collaboration between our technical and strategic teams reflects a conscious effort to grow into something far greater—an aerospace company shaped by young Indian minds, contributing to India’s future. We strongly believe that Make in India in this industry is not just achievable, but essential.
                      </p>
                      <p>
                        This is just the beginning of our story, and we’re truly glad to have you with us on this journey. The next chapter of Wingspann Global is already in motion—being shaped each day through innovation, persistence, and the collective drive of a determined young team.
                      </p>
                    </div>
                  </>
                )}

                {activePost.id === 7 && (
                  <>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white leading-relaxed">
                      Every aerospace company marks its journey with a defining first flight. For us, this milestone represents the successful transition of an idea—from concept and design to a fully functional aerial system. What began as a concept developed in Chhatrapati Sambhajinagar(Aurangabad) has now demonstrated its ability to perform in real-world conditions. We are proud to share the results of our first successful flight test and the dedicated team behind it.
                    </p>

                    <div className="my-6 p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700/60">
                      <h4 className="text-sm font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider mb-4">Flight Performance Highlights</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">131 m</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">Max Altitude</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">4.1 km</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">Operational Range</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">4.8 kg</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">Payload Carried</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">40 min</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">Flight Endurance</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">8.5 km</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">Total Distance</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                          <div className="text-xs text-gray-500 dark:text-slate-400">Safe Landing</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p>
                        These results are the outcome of structured design iterations, extensive simulations, rigorous ground testing, and consistent engineering effort. Each performance metric reflects a deliberate and methodical approach to development.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        Significance of the Milestone
                      </h3>
                      <p>
                        This first flight serves as a strong validation of our design, system integration, and engineering processes. It confirms that our platform is capable of stable flight, effective payload handling, and reliable performance. For a young and growing team, this achievement reinforces both technical capability and organizational confidence.
                      </p>
                      <p>
                        Beyond internal validation, this milestone contributes to a larger objective. The need for reliable, high-performance UAV systems in India continues to grow across sectors such as agriculture, infrastructure, and security. Demonstrating the ability to carry meaningful payloads over practical distances and durations is an important step toward developing indigenous solutions aligned with national requirements.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-905 dark:text-white tracking-tight">
                        Moving Forward
                      </h3>
                      <p>
                        While this marks an important achievement, it is part of a broader development journey. Ongoing efforts will focus on further testing, optimizing performance, expanding payload capabilities, and enhancing range and endurance.
                      </p>
                      <p>
                        This first successful flight establishes a strong foundation for future progress and reflects what a focused, capable, and determined team can achieve. It also stands as an early demonstration of our commitment to building reliable, scalable, and mission-ready UAV systems.
                      </p>
                      <p>
                        The journey ahead is already underway, with continued advancements shaping the next phase of Wingspann Global.
                      </p>
                    </div>
                  </>
                )}

                {activePost.id !== 1 && activePost.id !== 7 && (
                  <>
                    <p className="font-semibold text-lg text-gray-900 dark:text-white leading-relaxed">
                      {activePost.excerpt}
                    </p>
                    <div className="space-y-4">
                      <p>
                        At Wingspann Global, our research and engineering teams are constantly pioneering advancements in aerospace design, additive manufacturing integration, and autonomous flight controls. This publication covers critical technical aspects and insights concerning {activePost.title.toLowerCase()}.
                      </p>
                      <p>
                        Our mission is to establish solid operational benchmarks within the domestic Indian UAV landscape. By manufacturing high-performance platforms engineered for challenging conditions, we provide local businesses and authorities with the tools they need for rapid inspection, diagnostics, and multi-mission deployments.
                      </p>
                      <p>
                        Further updates, performance benchmarks, and deep-dives will continue to be posted as our project profiles mature and flight operations yield new data. Keep checking back for regular news alerts and developer logs directly from the Wingspann labs in Chhatrapati Sambhajinagar(Aurangabad).
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Close Button */}
              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-slate-800">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-gray-900 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
