import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ExternalLink, Mail, Github, Linkedin, FileText, ArrowRight } from "lucide-react";

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Hero 3D Neural Object Group
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    const icosaGeom = new THREE.IcosahedronGeometry(2.2, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3d2716,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(icosaGeom, wireframeMat);
    heroGroup.add(wireframeMesh);

    const innerGeom = new THREE.IcosahedronGeometry(1.5, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xe09f58,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    heroGroup.add(innerMesh);

    const pointsMat = new THREE.PointsMaterial({
      color: 0xe09f58,
      size: 0.04,
      transparent: true,
      opacity: 0.85
    });
    const heroPoints = new THREE.Points(icosaGeom, pointsMat);
    heroGroup.add(heroPoints);

    // Continuous Living Particle Field (Spans the entire page)
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleGlobalMat = new THREE.PointsMaterial({
      color: 0xe09f58,
      size: 0.035,
      transparent: true,
      opacity: 0.45
    });
    const globalParticles = new THREE.Points(particleGeom, particleGlobalMat);
    scene.add(globalParticles);

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const scrollY = window.scrollY;
      const heroVisibility = Math.max(0, 1 - scrollY / (window.innerHeight * 0.85));

      heroGroup.position.y = -scrollY * 0.003;
      heroGroup.position.x = targetX * 0.4;
      heroGroup.rotation.y = scrollY * 0.001 + targetX * 0.3;
      heroGroup.rotation.x = scrollY * 0.0005 + targetY * 0.3;

      wireframeMat.opacity = 0.35 * heroVisibility;
      innerMat.opacity = 0.25 * heroVisibility;
      pointsMat.opacity = 0.85 * heroVisibility;

      const positions = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= 0.004;
        if (positions[i * 3 + 1] < -14) {
          positions[i * 3 + 1] = 14;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      globalParticles.rotation.y = scrollY * 0.0003 + targetX * 0.15;
      globalParticles.rotation.x = targetY * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      icosaGeom.dispose();
      wireframeMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      pointsMat.dispose();
      particleGeom.dispose();
      particleGlobalMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#100904] text-[#F3EDE3] font-sans selection:bg-[#e09f58] selection:text-[#100904] overflow-x-hidden relative">
      
      {/* Root Continuous WebGL Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />

      {/* Persistent Right-Edge Brand Serial Label */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex items-center gap-3 pointer-events-none opacity-45">
        <div className="w-px h-12 bg-[rgba(243,237,227,0.12)]"></div>
        <span className="font-mono text-[9px] text-[#b8ada1] uppercase tracking-[0.25em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          NAGA VEDHIKA B. — AI/ML × DATA SCIENCE — 2026 // LAB.KCT
        </span>
        <div className="w-px h-12 bg-[rgba(243,237,227,0.12)]"></div>
      </aside>

      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 bg-[#100904]/90 backdrop-blur-md border-b border-dashed border-[rgba(243,237,227,0.12)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" className="font-mono text-xs text-[#F3EDE3] tracking-widest uppercase flex items-center gap-2 font-medium">
            <span className="text-[#e09f58] font-bold">[NV.01]</span> NAGA VEDHIKA B.
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-[#b8ada1] uppercase font-medium">
            <a href="#manifesto" className="hover:text-[#F3EDE3] transition-colors">01.MANIFESTO</a>
            <a href="#projects" className="hover:text-[#F3EDE3] transition-colors">02.WORK</a>
            <a href="#skills" className="hover:text-[#F3EDE3] transition-colors">03.STACK</a>
            <a href="#experience" className="hover:text-[#F3EDE3] transition-colors">04.TIMELINE</a>
            <a href="#about" className="hover:text-[#F3EDE3] transition-colors">05.ABOUT</a>
            <a href="#contact" className="hover:text-[#F3EDE3] transition-colors">06.CONNECT</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="resume.html" target="_blank" className="hidden sm:inline-block px-5 py-2 rounded-[20px] text-xs font-mono text-[#b8ada1] hover:text-[#F3EDE3] border border-dashed border-[rgba(243,237,227,0.15)] transition-all font-medium">
              RESUME ↗
            </a>
            <a href="#contact" className="px-6 py-2.5 rounded-[32px] text-xs font-mono font-semibold tracking-wider text-[#100904] bg-[#F3EDE3] hover:bg-[#e09f58] transition-all shadow-md">
              GET IN TOUCH
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO (100vh) */}
      <section id="hero" className="min-h-screen relative flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-36 pb-12 max-w-7xl mx-auto">
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#b8ada1]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e09f58] animate-ping"></span>
            <span className="text-[#e09f58] font-semibold">STATUS: RESEARCH & BUILD</span>
          </div>
          <span className="hidden sm:inline tracking-widest text-[11px] font-medium">
            CSE (AI/ML & DATA SCIENCE) • KCT
          </span>
        </div>

        <div className="relative z-10 my-auto py-8 max-w-4xl space-y-6">
          <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] block font-medium">
            RESEARCH PERSPECTIVE // 01
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#F3EDE3] tracking-tight leading-[1.06]">
            Naga Vedhika B. — <br />
            <span className="text-[#b8ada1] font-normal">Building</span> intelligent systems <br />
            <span className="italic text-[#e09f58] font-light">from data.</span>
          </h1>
          <p className="text-base sm:text-lg font-light text-[#b8ada1] max-w-[65ch] leading-[1.65]">
            Computer Science Engineering student at Kumaraguru College of Technology. Exploring predictive clinical models, intelligent conversational architectures, and practical algorithms.
          </p>
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <a href="#projects" className="px-8 py-3.5 rounded-[32px] text-xs font-mono font-semibold tracking-wider text-[#100904] bg-[#F3EDE3] hover:bg-[#e09f58] transition-all shadow-lg">
              SEE PROJECTS ↓
            </a>
            <a href="#manifesto" className="px-7 py-3.5 rounded-[20px] text-xs font-mono font-medium tracking-wider text-[#F3EDE3] border border-dashed border-[rgba(243,237,227,0.15)] hover:border-[#e09f58]/60 transition-colors">
              READ MANIFESTO
            </a>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-dashed border-[rgba(243,237,227,0.12)] text-xs font-mono text-[#786e64]">
          <div>
            <span className="text-[#b8ada1] block font-medium">PRIMARY OBJECTIVE</span>
            <span>Deploying AI that solves real-world human problems</span>
          </div>
          <div className="flex items-center gap-3">
            <span>SCROLL TO DISCOVER</span>
            <div className="w-px h-8 bg-[rgba(243,237,227,0.2)] animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO (100vh) */}
      <section id="manifesto" className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 lg:py-36 max-w-7xl mx-auto border-t border-dashed border-[rgba(243,237,227,0.12)]">
        <div className="max-w-4xl space-y-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] font-medium">02 // INTRO & MANIFESTO</span>
            <div className="w-12 h-px bg-[rgba(243,237,227,0.12)]"></div>
          </div>
          <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#F3EDE3] leading-[1.18] tracking-tight">
            "Artificial intelligence shouldn't be an abstract monument. It is most powerful when it quietly, reliably solves a human need."
          </blockquote>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <p className="text-base font-light text-[#b8ada1] leading-[1.65] max-w-[65ch]">
              I am a student currently learning and experimenting with machine learning pipelines, relational database structures, and applied AI systems. I don't believe in vanity metrics or superficial complexity.
            </p>
            <p className="text-base font-light text-[#b8ada1] leading-[1.65] max-w-[65ch]">
              My work focuses on the intersection of structured data, clinical predictive models, and intuitive full-stack interfaces — converting raw computational potential into software people can genuinely trust.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS (100vh per project) */}
      <section id="projects" className="border-t border-dashed border-[rgba(243,237,227,0.12)]">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <article key={project.id} className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 lg:py-36 max-w-7xl mx-auto border-b border-dashed border-[rgba(243,237,227,0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#786e64]">PROJECT // 0{index + 1}</span>
                  <span className="w-px h-3 bg-[rgba(243,237,227,0.12)]"></span>
                  <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] font-medium">{project.category}</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#F3EDE3] leading-tight">
                  {project.title}
                </h3>
                <p className="text-base font-light text-[#b8ada1] leading-[1.65] max-w-[65ch]">
                  {project.shortDescription}
                </p>
                <div className="space-y-3 pt-2 text-xs font-light">
                  <div className="p-4 rounded-[12px] bg-[#181008] border border-dashed border-[rgba(243,237,227,0.12)] space-y-1">
                    <span className="font-mono text-[10px] text-[#e09f58] uppercase tracking-wider block font-semibold">THE PROBLEM</span>
                    <p className="text-[#b8ada1] leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="p-4 rounded-[12px] bg-[#181008] border border-dashed border-[rgba(243,237,227,0.12)] space-y-1">
                    <span className="font-mono text-[10px] text-[#e09f58] uppercase tracking-wider block font-semibold">THE APPROACH</span>
                    <p className="text-[#b8ada1] leading-relaxed">{project.approach}</p>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-[#b8ada1]">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#181008] border border-dashed border-[rgba(243,237,227,0.12)]">{t}</span>
                  ))}
                </div>
                <div className="pt-4 flex items-center gap-6">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-[20px] text-xs font-mono font-semibold text-[#100904] bg-[#F3EDE3] hover:bg-[#e09f58] transition-all">
                      VIEW SOURCE ON GITHUB ↗
                    </a>
                  )}
                  <span className="text-xs font-mono text-[#786e64]">STATUS: {project.status.toUpperCase()}</span>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden border border-dashed border-[rgba(243,237,227,0.12)] bg-[#181008] group shadow-2xl">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 4. SKILLS / STACK (100vh) */}
      <section id="skills" className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 lg:py-36 max-w-7xl mx-auto border-t border-dashed border-[rgba(243,237,227,0.12)]">
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] font-medium">04 // TECH STACK & COMPETENCIES</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F3EDE3] tracking-tight mt-2">
                Systematic Knowledge.
              </h2>
            </div>
          </div>
          {/* Max 2 Columns on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
              <div key={idx} className="p-8 rounded-[12px] bg-[#181008] border border-dashed border-[rgba(243,237,227,0.12)] space-y-4">
                <span className="font-mono text-xs text-[#786e64]">0{idx + 1} / CATEGORY</span>
                <h3 className="text-xl font-display font-bold text-[#F3EDE3]">{cat.category}</h3>
                <ul className="space-y-2.5 text-xs font-mono text-[#b8ada1]">
                  {cat.skills.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-center justify-between py-1.5 border-b border-dashed border-[rgba(243,237,227,0.08)]">
                      <span className="font-medium text-[#F3EDE3]">{s.name}</span>
                      <span className="text-[#e09f58]">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIMELINE / EXPERIENCE (100vh) */}
      <section id="experience" className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 lg:py-36 max-w-7xl mx-auto border-t border-dashed border-[rgba(243,237,227,0.12)]">
        <div className="space-y-12">
          <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] font-medium">05 // CHRONOLOGY & RECORD</span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F3EDE3] tracking-tight">
            Experience & Credentials.
          </h2>
          <div className="border-l border-dashed border-[rgba(243,237,227,0.15)] ml-4 pl-8 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-[#F3EDE3]">AI-ML Virtual Internship Program</h3>
              <span className="font-mono text-xs text-[#e09f58] font-medium">EduSkills, AICTE & Google for Developers</span>
              <p className="text-sm font-light text-[#b8ada1] max-w-[65ch] leading-[1.65]">Completed structured training in Machine Learning algorithms, predictive modeling, and data pipelines utilizing Google developer technologies.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-[#F3EDE3]">Database Management System (Part 1 & 2)</h3>
              <span className="font-mono text-xs text-[#b8ada1] font-medium">Infosys Springboard Certification</span>
              <p className="text-sm font-light text-[#b8ada1] max-w-[65ch] leading-[1.65]">Certified in relational schema architecture, advanced SQL joins, transaction management, and normalization (1NF–3NF).</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-[#F3EDE3]">Foundation of 3D Modelling in Blender</h3>
              <span className="font-mono text-xs text-[#b8ada1] font-medium">3D Asset & Graphics Track</span>
              <p className="text-sm font-light text-[#b8ada1] max-w-[65ch] leading-[1.65]">Completed practical coursework in 3D polygonal geometry modeling, materials, and spatial digital rendering.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-[#F3EDE3]">B.E. Computer Science and Engineering</h3>
              <span className="font-mono text-xs text-[#e09f58] font-medium">Kumaraguru College of Technology (2025–2028)</span>
              <p className="text-sm font-light text-[#b8ada1] max-w-[65ch] leading-[1.65]">Current 3rd Year / Semester V student. Cumulative Grade Point Average: 7.8 / 10.0.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT (100vh) */}
      <section id="about" className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-28 lg:py-36 max-w-7xl mx-auto border-t border-dashed border-[rgba(243,237,227,0.12)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] font-medium">06 // HUMAN DIMENSION</span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#F3EDE3] leading-tight">
              Curious, deliberate, <br />
              <span className="text-[#b8ada1] font-normal">and always building.</span>
            </h2>
            <p className="text-base font-light text-[#b8ada1] leading-[1.65] max-w-[65ch]">
              I am Naga Vedhika B., studying at Kumaraguru College of Technology. Beyond technical coursework and algorithmic pipelines, I find balance in crochet fiber art 🧶 and reading literature 📚.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="p-8 rounded-[12px] bg-[#181008] border border-dashed border-[rgba(243,237,227,0.12)] space-y-4 shadow-2xl">
              <div className="font-mono text-xs text-[#786e64]">[IDENTITY MATRIX]</div>
              <div className="w-16 h-16 rounded-[20px] bg-[#1f150d] border border-dashed border-[#e09f58]/40 flex items-center justify-center font-display font-bold text-2xl text-[#e09f58]">NV</div>
              <div className="space-y-2 text-xs font-mono text-[#b8ada1]">
                <div><span className="text-[#786e64]">NAME:</span> Naga Vedhika B.</div>
                <div><span className="text-[#786e64]">ROLE:</span> AI/ML & Data Science Student</div>
                <div><span className="text-[#786e64]">COLLEGE:</span> Kumaraguru College of Technology</div>
                <div><span className="text-[#786e64]">CGPA:</span> 7.8 / 10.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT (100vh) */}
      <section id="contact" className="min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 pb-12 max-w-7xl mx-auto border-t border-dashed border-[rgba(243,237,227,0.12)]">
        <span className="font-mono text-[12px] text-[#e09f58] uppercase tracking-[0.12em] font-medium">07 // INITIATION</span>
        <div className="my-auto py-12 space-y-8 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#F3EDE3] tracking-tight leading-[1.08]">
            Let's build <br />
            <span className="text-[#e09f58] italic font-light">something useful.</span>
          </h2>
          <p className="text-lg sm:text-xl font-light text-[#b8ada1] max-w-[65ch] leading-[1.65]">
            Open to AI, Machine Learning, and Data Science internship roles and collaborative research projects.
          </p>
          <div className="pt-4">
            <span className="font-mono text-xs text-[#786e64] block mb-2 font-medium">DIRECT EMAIL INQUIRY</span>
            <a href="mailto:nagavedhikab@gmail.com" className="text-2xl sm:text-4xl font-display font-bold text-[#F3EDE3] hover:text-[#e09f58] transition-colors underline decoration-dashed underline-offset-8">
              nagavedhikab@gmail.com
            </a>
          </div>
          <div className="pt-6 flex flex-wrap items-center gap-6 text-xs font-mono text-[#b8ada1] uppercase tracking-wider font-medium">
            <a href="https://www.linkedin.com/in/naga-vedhika-b-260820327" target="_blank" rel="noopener noreferrer" className="hover:text-[#e09f58] transition-colors">LINKEDIN ↗</a>
            <span>/</span>
            <a href="https://github.com/nagavedhika" target="_blank" rel="noopener noreferrer" className="hover:text-[#e09f58] transition-colors">GITHUB ↗</a>
            <span>/</span>
            <a href="resume.html" target="_blank" className="hover:text-[#e09f58] transition-colors">ATS RESUME ↗</a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-dashed border-[rgba(243,237,227,0.12)] text-xs font-mono text-[#786e64]">
          <div>NAGA VEDHIKA B. • 2026 // CRAFTED WITH RESTRAINT</div>
          <div>SALEM, TAMIL NADU</div>
        </div>
      </section>

    </div>
  );
}

export default App;
