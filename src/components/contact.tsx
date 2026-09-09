"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Copy, Check, MessageSquare } from "lucide-react";
import GithubIcon from "@/components/ui/github-icon";
import LinkedinIcon from "@/components/ui/linkedin-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const myEmail = "sagarbhatiya12211@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Open mailto link so user can send direct email
      const mailtoUrl = `mailto:sagarbhatiya12211@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/5 blur-[120px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent inline-block">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-blue to-brand-cyan mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Have an AI project, an opportunity, or want to collaborate? Send me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-foreground">
                Let&apos;s build intelligent solutions together
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                I am currently open to AI Engineering and Software Development Internship roles. Reach out directly via email or message below!
              </p>
            </div>

            {/* Email Card with Copy Trigger */}
            <Card className="border border-border bg-card/65 dark:bg-card/45 backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl border border-border bg-background text-brand-blue flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground/80 uppercase tracking-widest">Email Address</h4>
                    <a href={`mailto:${myEmail}`} className="text-sm font-semibold text-foreground/90 hover:text-brand-cyan transition-colors mt-0.5 block">{myEmail}</a>
                  </div>
                </div>
                
                <Button
                  onClick={handleCopyEmail}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-border bg-background hover:bg-accent/40 font-semibold pointer-events-auto cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-brand-cyan" />
                      Email Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Email to Clipboard
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Social channels */}
            <Card className="border border-border bg-card/65 dark:bg-card/45 backdrop-blur-md">
              <CardContent className="p-6 space-y-3">
                <h4 className="text-xs font-extrabold text-foreground/80 uppercase tracking-widest mb-1">External Channels</h4>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://www.linkedin.com/in/sagar-bhatiya-3570a2282/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-brand-blue/30 text-foreground hover:bg-brand-blue/5 transition-all duration-300 pointer-events-auto"
                  >
                    <LinkedinIcon className="w-5 h-5 text-brand-blue" />
                    <span className="text-sm font-bold">Connect on LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/sagarBhatiya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:border-brand-blue/30 text-foreground hover:bg-brand-cyan/5 transition-all duration-300 pointer-events-auto"
                  >
                    <GithubIcon className="w-5 h-5 text-foreground/90" />
                    <span className="text-sm font-bold">View GitHub Repositories</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <Card className="border border-border bg-card/60 dark:bg-card/30 backdrop-blur-md h-full flex flex-col justify-between">
              <CardContent className="p-6 sm:p-8 space-y-6 text-left">
                <div className="flex items-center gap-2.5 text-brand-cyan font-bold tracking-wide text-sm uppercase">
                  <MessageSquare className="w-4 h-4" />
                  Send message
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Email side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Your Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-background border-border pointer-events-auto focus:border-brand-blue/50"
                      />
                      {errors.name && <p className="text-[11px] text-red-500 font-semibold">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="bg-background border-border pointer-events-auto focus:border-brand-blue/50"
                      />
                      {errors.email && <p className="text-[11px] text-red-500 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Collaboration opportunity"
                      className="bg-background border-border pointer-events-auto focus:border-brand-blue/50"
                    />
                    {errors.subject && <p className="text-[11px] text-red-500 font-semibold">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Your Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi Sagar, I came across your portfolio and..."
                      className="bg-background border-border pointer-events-auto focus:border-brand-blue/50 resize-none"
                    />
                    {errors.message && <p className="text-[11px] text-red-500 font-semibold">{errors.message}</p>}
                  </div>

                  {/* Form response states */}
                  {status === "success" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 rounded-xl border border-green-500/20 bg-green-500/10 text-green-500 text-xs sm:text-sm font-semibold">
                      Thank you! Your message was sent successfully. I will get back to you shortly.
                    </motion.div>
                  )}
                  
                  {status === "error" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs sm:text-sm font-semibold">
                      Oops! Something went wrong while sending your message. Please try again.
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-5 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
