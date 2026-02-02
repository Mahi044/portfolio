"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  Code,
  Palette,
  Smartphone,
  Globe,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ModernPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // EmailJS configuration
      const serviceId = "service_275epwa" // You'll get this from EmailJS
      const templateId = "template_q73xy6v" // You'll get this from EmailJS
      const publicKey = "KlXpR4FVRw6ql64i0" // You'll get this from EmailJS

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "mahendrareddyrv72@gmail.com", // Your email
      }

      // Send email using EmailJS
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { name: "React", level: 90, icon: Code },
    { name: "TypeScript", level: 25, icon: Code },
    { name: "Data Analytics", level: 88, icon: Globe },
    { name: "UI/UX Design", level: 80, icon: Palette },
    { name: "AWS", level: 75, icon: Smartphone },
    { name: "Node.js", level: 82, icon: Code },
  ]

  const projects = [
    {
      title: "Stylocode",
      description: "Transform your code into stunning designs with Stylocode.",
      image: "project1.jpg",
      tags: [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "React DnD",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase Auth",
        "Vercel",
      ],
      github: "https://github.com/Mahi044/STYLO-CODE",
      live: "https://github.com/Mahi044/STYLO-CODE",
    },
    {
      title: "CarExpo",
      description: "A collaborative task management application with real-time updates",
      image: "project2.jpg",
      tags: ["HTML", "CSS", "JS", "MongoDB"],
      github: "https://github.com/Mahi044/CarExpo",
      live: "https://carexpo-uosw.onrender.com",
    },
    {
      title: "Customer Shopping Behavior Analysis",
      description: "This project analyzes customer shopping behavior using SQL, Python, and Power BI. ",
      image: "https://blog-static.userpilot.com/blog/wp-content/uploads/2024/06/customer-behavior-analysis-example-to-help-you-get-greater-insights_60bbf57088c20bec3c7a1debdebee383_2000.png",
      tags: ["Python","Numpy","Pandas", "SQL" ,"PowerBI"],
      github: "https://github.com/Mahi044/customer_behavior_analysis",
      live: "https://app.powerbi.com/links/Qy_B_nEQSP?ctid=bb4e68cd-fdbb-4789-82e5-1584d60de7f4&pbi_source=linkShare",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 capitalize w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="relative">
              <Image
                src="dp1.jpg"
                alt="Profile"
                width={200}
                height={200}
                className="mx-auto rounded-full border-4 border-white shadow-xl"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mahendra Reddy R V
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                I'm passionate about development, data science, analytics, and exploring the possibilities of AWS to
                create impactful solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                View My Work
              </Button>
              <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href="MAHENDRAREDDYRV_1BY22CS216.pdf" download>
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <Link
                href="https://github.com/Mahi044"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mahendra-reddy-rv-058408243/"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:mahendrareddyrv72@gmail.com"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-slate-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              I'm a dedicated student passionate about learning and creating digital solutions that make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                With a background in both development and design, I bring a unique perspective to every project. I
                believe in writing clean, maintainable code and creating user experiences that are both beautiful and
                functional.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through blog posts and community talks.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Fresher</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image src="page2.jpg" alt="About me" width={400} height={400} className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Skills & Expertise</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-300">Proficiency</span>
                        <span className="text-slate-900 dark:text-white font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A showcase of my recent work and personal projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={project.github}>
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={project.live}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Let's Work Together</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md">
                      <p className="text-green-700 dark:text-green-300">
                        Thank you! Your message has been sent to Mahendra. He'll get back to you soon!
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
                      <p className="text-red-700 dark:text-red-300">
                        Sorry, there was an error sending your message. Please try again.
                      </p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Mahendra Reddy R V
            </div>
            <p className="text-slate-400 mb-6">Tech Enthusiast</p>
            <div className="flex justify-center space-x-6 mb-8">
              <Link href="https://github.com/Mahi044" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mahendra-reddy-rv-058408243/"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:mahendrareddyrv72@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-slate-400 text-sm">© 2024 Mahendra Reddy R V. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
