"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { sendContactEmail } from "./actions/send-email"
import { useActionState } from "react"
import { Award } from "./components/ui/award-icon"

export default function PortfolioV2() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [emailState, emailAction, isEmailPending] = useActionState(sendContactEmail, null)

  // Toggle dark/light theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Certifications", icon: <Award size={18} /> },
  ]

  const skills = [
    {
      category: "Frontend",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "TypeScript",
        "React",
        "Next.js",
        
        "Angular",
        "Tailwind CSS",
        "Bootstrap",
        "Sass/SCSS",
        "Material-UI",
        "Framer Motion",
        "React Query",
        "Redux",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "Python",
        "Django",
        "Flask",
        "Spring Boot",
        ".NET",
        "REST APIs",
        "Microservices",
        "Socket.io",
      ],
    },
    {
      category: "Tools & Technologies",
      items: [
        "Git",
        "GitHub",
        "GitLab",
        "Docker",
        "Vercel",
        "Netlify",
        "Firebase",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "VS Code",
        "Figma",
        "Postman",
        "Webpack",
        "Vite",
        "Babel",
      ],
    },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with shopping cart, payment gateway, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Sanity.io or Contentful CMS", "Redux", "Auth flow", "Stripe checkout integration"],
      image: "better.PNG?height=200&width=350",
      github: "https://github.com/tochi2055/shopamour",
      demo: "https://shopamour.vercel.app/",
    },
    {
      title: "Task Management App",
      description:
        "TaskFlow is a Trello/Asana-style project management dashboard for modern teams. Manage your tasks, projects, and workflows with an intuitive interface and real-time updates, powered by Supabase..",
      technologies: ["Next.js", "TypeScript", "React Query", "TailwindCSS + HeadlessUI", "CRUD", " real-world interactions"],
      image: "taskflow.PNG?height=200&width=350",
      github: "https://github.com/tochi2055/Taskflow",
      demo: "https://task-flow-nu-virid.vercel.app/auth",
    },
    {
      title: "Money Amour",
      description: "A financial dashboard helps track balances, expenses, goals, and bills in one view. Built with modern tech like React, it offers real-time insights for better money management.",
      technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS"],
      image: "/moneyamour.png?height=200&width=350",
      github: "https://github.com/tochi2055/moneyamour",
      demo: "https://moneyamour.vercel.app/",
    },
    {
      title: "Track-IT",
      description: "a modern, offline-first Progressive Web App (PWA) designed to simulate internal inventory systems used by logistics and e-commerce giants.",
      technologies: ["CRUD", "Dexie.js (IndexedDB)", "PWA Setup", "FastAPI", "real-time sync", "offline-first PWA", "Springboot"],
      image: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/tochi2055/Track-it",
      demo: "#",
    },
    {
      title: "Devfolio",
      description: "Property listing platform with advanced search, virtual tours, and mortgage calculator.",
      technologies: ["MongoDB Atlas", "CRUD", "PostgreSQL", "AWS S3", " Cloudinary"],
      image: "betterdevfo.PNG?height=200&width=350",
      github: "https://github.com/tochi2055/devfolio",
      demo: "https://devfolio-52zf.vercel.app/",
    },
    {
      title: "IoT Inverter Monitoring",
      description: "Designing a State-of-the-Art React Dashboard for Real-Time IoT Inverter Monitoring.",
      technologies: ["React", "Node.js", " MQTT/WebSocket Integration", "Firebase", "Tailwind CSS", "Real-time data visualization"],
      image: "460080797-cb0c8252-eba7-46fa-9f74-2a99f957ae2d.png?height=200&width=350",
      github: "https://github.com/tochi2055/Amour-IoT-solar",
      demo: "https://amour-io-t-solar.vercel.app/",
    },
  ]

  const education = [
    {
    
      title: "Computer Science Degree",
      institution: "Memorial University of Newfoundland",
      description: "Specialized in software engineering with focus on web development and data structures.",
    },
    {
      
      title: "Full Stack Web Development Certification",
      institution: "NASSCOM",
      description: "Intensive training in modern web technologies including React, Node.js, and cloud deployment.",
    },
    {
      
      title: "Certified DevOps Enginee",
      institution: "HNG Internship",
      description: "Certified in cloud computing fundamentals and AWS services implementation.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold">
              TO
            </div>
            <span className="font-bold text-xl hidden sm:block">Tochukwu Onuoha</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeSection === item.id
                    ? "bg-gray-100 dark:bg-gray-800 text-teal-500 dark:text-teal-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            <Button
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
            >
              Contact Me 
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-[#0f172a] pt-16"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="order-2 md:order-1"
              >
                <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400 hover:bg-teal-500/20 dark:hover:bg-teal-400/20">
                  Full-Stack Developer | Devops Engineer
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Hello, I'm{" "}
                  <span className="bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
                    Tochukwu Onuoha
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Full-stack developer passionate about creating innovative web solutions and exceptional user
                  experiences.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => scrollToSection("projects")}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                  >
                    View Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a href="https://drive.google.com/file/d/1cqRBhy-9aaq12XLL1mhLHCTAONUti0Kw/view?usp=sharing">  <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                    Download CV
                  </Button>
                  
                  </a>
                
                </div>

                <div className="mt-12 flex gap-4">
                  <a
                    href="https://github.com/tochi2055"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tochukwu-onuoha-3b1821240/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:tochukwu.onuoha@example.com"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 md:order-2 flex justify-center"
              >
                <div className="relative">
                  <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-teal-500/20 to-indigo-500/20 blur-3xl opacity-40 absolute -inset-8"></div>
                  <div className="w-80 h-80 md:w-96 md:h-96 relative z-10 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                        <img
                          src="/adc0e920-40b9-4041-b9b9-37044e38abdb.jpeg?height=320&width=320"
                          alt="Tochukwu Onuoha"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Floating elements around avatar */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <Code size={20} className="text-white" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Briefcase size={16} className="text-white" />
                      </div>
                      <div className="absolute top-1/4 -left-6 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-ping">
                        <User size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                About Me
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Get to know me better</h2>
              <p className="text-gray-600 dark:text-gray-300">
                I'm a passionate full-stack developer with expertise in modern web technologies and a commitment to
                creating innovative solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I'm a dedicated full-stack developer with a passion for learning cutting-edge technologies and
                  creating innovative solutions. My goal is to bridge the gap between design and functionality to
                  deliver exceptional user experiences.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  With expertise spanning both frontend and backend development, I specialize in React, Node.js, and
                  cloud technologies. I thrive on solving complex problems and collaborating with diverse teams to bring
                  ideas to life.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                    <div className="text-3xl font-bold text-teal-500 dark:text-teal-400 mb-1">9+</div>
                    <div className="text-gray-600 dark:text-gray-300">Years of experience</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                    <div className="text-3xl font-bold text-indigo-500 dark:text-indigo-400 mb-1">35+</div>
                    <div className="text-gray-600 dark:text-gray-300">Completed projects</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6">My Tech Stack</h3>
                <Tabs defaultValue="Frontend" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    {skills.map((skill) => (
                      <TabsTrigger key={skill.category} value={skill.category}>
                        {skill.category === "Tools & Technologies" ? "Tools" : skill.category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {skills.map((skill) => (
                    <TabsContent key={skill.category} value={skill.category} className="mt-0">
                      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                        {skill.items.map((item) => (
                          <div
                            key={item}
                            className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Projects
              </Badge>
              <h2 className="text-3xl font-bold mb-4">My Recent Work</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Here's a selection of projects that showcase my skills and experience in full-stack development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <Github size={18} className="text-white" />
                          </a>
                          <a
                            href={project.demo}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink size={18} className="text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
               <a href="https://github.com/tochi2055">  <Button variant="outline" className="border-gray-300 dark:border-gray-700">
                View More Projects
              </Button>
              </a>
              </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-gray-100 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Education
              </Badge>
              <h2 className="text-3xl font-bold mb-4">My Academic Background</h2>
              <p className="text-gray-600 dark:text-gray-300">
                My educational journey and professional certifications.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-12 last:mb-0"
                >
                  <div className="hidden sm:block pt-1">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500"></div>
                    </div>
                    {index !== education.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 ml-6 mt-2"></div>
                    )}
                  </div>

                  <Card className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400">
                        {item.period}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">{item.institution}</p>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 dark:bg-teal-400/10 dark:text-teal-400">
                Certifications
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Professional Credentials</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Industry certifications and professional qualifications that validate my expertise and knowledge.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-1 bg-gradient-to-r from-teal-500 to-indigo-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-md bg-teal-500/10 dark:bg-teal-400/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-500 dark:text-teal-400"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1"> Certified full Stack Development</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">NASSCOM</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            Issued: Jan 2024
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            No Expiration
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Certified Full Stack Developer with expertise in building modern CRUD apps using Next.js and Node.js. Skilled in deploying distributed systems on AWS with EC2, S3, RDS, and more.
                        </p>
                       <a
  href="https://drive.google.com/file/d/1CwuHhSwjJm0tmHTTZjVkUjH5tTUAIR0J/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="link" className="mt-2 p-0 h-auto text-teal-500 dark:text-teal-400">
    View Certificate <ExternalLink className="ml-1 h-3 w-3" />
  </Button>
</a>

                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-md bg-indigo-500/10 dark:bg-indigo-400/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-indigo-500 dark:text-indigo-400"
                        >
                          <path d="M12 2H2v10h10V2Z" />
                          <path d="M12 12H2v10h10V12Z" />
                          <path d="M22 2h-10v20h10V2Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">DEVOPS ENGINEER</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">HNG INTERNSHIP</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            Issued: Mar 2020
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                           No Expiration
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Specialized in developing solutions using Azure services. Skilled in Azure App Service,
                          Functions, Storage, and Azure DevOps for CI/CD pipelines.
                        </p>
                                              <a
  href="https://drive.google.com/file/d/1wkS5mU5fYr3J4i1JpOBBO3vyfpPY8zqb/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="link" className="mt-2 p-0 h-auto text-teal-500 dark:text-teal-400">
    View Certificate <ExternalLink className="ml-1 h-3 w-3" />
  </Button>
</a>                   
   </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-md bg-amber-500/10 dark:bg-amber-400/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-amber-500 dark:text-amber-400"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Full Stack java Developer</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">ROOMAN</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            Issued: Jun 2020
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            No Expiration
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                         Full Stack Java Developer skilled in building scalable web apps on GCP. Proficient with Java, Spring Boot, React, and GCP services like App Engine, Compute Engine, Cloud Functions, and Cloud SQL.
                        </p>
                         <a
  href="https://drive.google.com/file/d/1zRty8dRvLmIK2rn__vsmd2HBZFWBF_Xm/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="link" className="mt-2 p-0 h-auto text-teal-500 dark:text-teal-400">
    View Certificate <ExternalLink className="ml-1 h-3 w-3" />
  </Button>
</a>                     
   </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-md bg-emerald-500/10 dark:bg-emerald-400/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-500 dark:text-emerald-400"
                        >
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13 15v6" />
                          <path d="M11 15v6" />
                          <path d="M12 3v5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">Cloud Devops Nanodegree</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-3">UDACITY</p>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            Issued: Sep 2017
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0"
                          >
                            No Expiration
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Expert in designing and implementing MongoDB database solutions. Skilled in data modeling,
                          aggregation framework, indexing, and performance optimization.
                        </p>
                        <a
  href="https://drive.google.com/file/d/1BV9jOpSf0p5zD6D0F6mQ1xIgYdt93rZm/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="link" className="mt-2 p-0 h-auto text-teal-500 dark:text-teal-400">
    View Certificate <ExternalLink className="ml-1 h-3 w-3" />
  </Button>
</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Interested in discussing how my skills and certifications can benefit your project?
                </p>
                <Button
                  className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white border-0"
                  onClick={() => (window.location.href = "mailto:tochukwu.onuoha@example.com")}
                >
                  Get in Touch <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                TO
              </div>
              <span className="font-bold">Tochukwu Onuoha</span>
            </div>

            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Tochukwu Onuoha. All rights reserved.
            </div>

            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/tochi2055"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/tochukwu-onuoha-3b1821240/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:tochukwu.onuoha@example.com"
                className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
