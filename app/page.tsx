'use client'

import { FormEvent, useMemo, useState } from 'react'

const linkedin = 'https://www.linkedin.com/in/sanketkumar-zanzmera-12589424a/'
const github = 'https://github.com/zanzmerasanketkumar/'
const email = 'sanketzanzmera@gmail.com'
const phone = '+919870056961'
const resumePath = '/resume.pdf'

const projects = [
    { title: 'SOC Level 1 Manual Log Investigation', domain: 'SOC · Windows Security Logs · Linux Security Logs', desc: 'Manually investigated Windows and Linux security logs to identify and review authentication-related events. Applied SOC Level 1 investigation methodology to triage log entries and assess potential security relevance.', tech: ['Windows Logs', 'Linux Logs', 'SOC L1', 'Log Analysis'], type: 'SOC' },
    { title: 'Cyber Kill Chain & MITRE ATT&CK Analysis', domain: 'Threat Analysis · MITRE ATT&CK · Cyber Kill Chain', desc: 'Mapped a real-world attack scenario across the stages of the Cyber Kill Chain and cross-referenced attack techniques against the MITRE ATT&CK framework to identify potential detection opportunities.', tech: ['MITRE ATT&CK', 'Cyber Kill Chain', 'Threat Analysis'], type: 'Threat Analysis' },
    { title: 'Windows Security Log Analysis with Splunk', domain: 'SIEM · Splunk · Windows Event Logs · SPL', desc: 'Ingested Windows Security Event Logs into Splunk and built search queries to filter authentication-related events.', tech: ['Splunk', 'SPL', 'Event ID 4624', 'Event ID 4625', 'Event ID 4672'], type: 'SIEM' },
    { title: 'SOC Sentinel — Real-Time Security Monitoring & SIEM Platform', domain: 'SIEM · Security Logs · Dashboards · Docker', desc: 'Built a security monitoring platform for centralized log collection from multiple sources into a single dashboard. Implemented alerting on security-relevant activity to support analyst investigation and follow-up.', tech: ['SIEM', 'Docker', 'Security Logs', 'Dashboards'], type: 'SIEM', featured: true },
    { title: 'AWS Cloud Infrastructure Practicals', domain: 'AWS · Cloud Security · Infrastructure', desc: 'Provisioned EC2 instances with Elastic IP and EBS storage and configured security group rules. Designed a VPC with public and private subnets and a NAT Gateway, with S3 and DynamoDB configuration.', tech: ['EC2', 'VPC', 'Subnets', 'Security Groups', 'EBS', 'S3', 'DynamoDB', 'NAT Gateway'], type: 'Cloud' },
    { title: 'Women Life Empowerment NGO System', domain: 'Web Application · Academic or Personal Project', desc: 'Developed a Django-based NGO management web application with database-driven functionality. Implemented Django models, SQLite database integration, CRUD operations, backend views, templates, and responsive Bootstrap-based interfaces.', tech: ['Python', 'Django', 'SQLite', 'Bootstrap', 'HTML', 'CSS'], type: 'Web Application' }
]

const skills = { Cybersecurity: ['SOC', 'SOC Level 1', 'SIEM', 'Security Monitoring', 'Log Analysis', 'Incident Detection', 'Threat Detection', 'Network Security', 'Vulnerability Assessment', 'Web Security'], 'Security Tools': ['Splunk', 'Nmap', 'Wireshark', 'Burp Suite', 'Metasploit', 'Kali Linux', 'Hashcat', 'John the Ripper', 'DVWA'], Programming: ['Python', 'Java', 'C', 'SQL'], 'Web Development': ['Django', 'Flask', 'HTML', 'CSS'], 'Cloud & DevOps': ['AWS', 'Docker', 'Git', 'GitHub'], 'Data & Big Data': ['Pandas', 'NumPy', 'Hadoop', 'HDFS', 'MapReduce', 'Apache Spark', 'PySpark'] }

function Icon({ name }: { name: string }) {
    const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    if (name === 'github') return <svg {...common}><path d="M15 22v-4.2c0-1.2-.4-2-1.1-2.5 3.6-.4 7.4-1.8 7.4-8A6.2 6.2 0 0 0 19.6 3c.1-.3.5-1.6-.1-3 0 0-1.4-.5-4.6 1.7a15.8 15.8 0 0 0-8.4 0C3.3-.5 1.9 0 1.9 0c-.6 1.4-.2 2.7-.1 3A6.2 6.2 0 0 0 .5 7.3c0 6.2 3.8 7.6 7.4 8-.7.5-1.1 1.4-1.1 2.5V22" /><path d="M8 19c-3.5 1.2-3.5-1.7-5-2" /></svg>
    if (name === 'linkedin') return <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
    if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
    if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    if (name === 'shield') return <svg {...common}><path d="M12 3 20 6v5c0 5.1-3.4 8.4-8 10-4.6-1.6-8-4.9-8-10V6l8-3Z" /><path d="m9 12 2 2 4-5" /></svg>
    return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>
}


function ContactForm({ sent, sending, error, setSent, setSending, setError }: { sent: boolean; sending: boolean; error: string; setSent: (v: boolean) => void; setSending: (v: boolean) => void; setError: (v: string) => void }) {
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setSending(true); setError(''); setSent(false)
        const form = e.currentTarget
        const data = new FormData(form)
        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message') }) })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Unable to send message.')
            form.reset(); setSent(true)
        } catch (err) { setError(err instanceof Error ? err.message : 'Unable to send message.') }
        finally { setSending(false) }
    }
    return <form onSubmit={submit}>
        <input name="name" required maxLength={120} placeholder="Name" aria-label="Name" />
        <input name="email" required type="email" maxLength={254} placeholder="Email" aria-label="Email" />
        <textarea name="message" required maxLength={5000} placeholder="Message" rows={5} aria-label="Message" />
        <button className="primary" type="submit" disabled={sending}>{sending ? 'Sending…' : sent ? 'Message Sent' : 'Send Message'} <Icon name="arrow" /></button>
        {sent && <small className="formSuccess">Message sent successfully to {email}. You can also reply directly to the confirmation email.</small>}
        {error && <small className="formError">{error}</small>}
        <small>Your message is sent securely through the portfolio email service. Your email address is used as Reply-To.</small>
    </form>
}

function viewResume() { window.open(resumePath, '_blank') }

export default function Home() {
    const [filter, setFilter] = useState('All');
    const [open, setOpen] = useState(false);
    const [sent, setSent] = useState(false); const [sending, setSending] = useState(false); const [error, setError] = useState('');
    const filters = ['All', 'SOC', 'SIEM', 'Threat Analysis', 'Cloud', 'Web Application'];
    const shown = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.type === filter), [filter])
    return <main>
        <nav className="nav"><div className="wrap navin"><a className="brand" href="#home">SK<span>.</span></a><div className={'links ' + (open ? 'show' : '')}><a href="#about" onClick={() => setOpen(false)}>About</a><a href="#skills" onClick={() => setOpen(false)}>Skills</a><a href="#projects" onClick={() => setOpen(false)}>Projects</a><a href="#experience" onClick={() => setOpen(false)}>Experience</a><a href="#education" onClick={() => setOpen(false)}>Education</a><a href="#certifications" onClick={() => setOpen(false)}>Certifications</a><a href="#resume" onClick={() => setOpen(false)}>Resume</a><a href="#contact" onClick={() => setOpen(false)}>Contact</a></div><div className="navactions"><button className="resume" onClick={viewResume}>View Resume</button><a className="iconbtn" href={linkedin} target="_blank" aria-label="LinkedIn"><Icon name="linkedin" /></a><a className="iconbtn" href={github} target="_blank" aria-label="GitHub"><Icon name="github" /></a><button className="hamb" onClick={() => setOpen(!open)} aria-label="Toggle navigation">☰</button></div></div></nav>

        <section id="home" className="hero wrap"><div className="heroCopy"><div className="eyebrow"><span className="dot" /> SECURITY OPERATIONS / SOC FOCUS</div><h1>SANKETKUMAR<br /><span>ZANZMERA</span></h1><p className="role">Cybersecurity <i>·</i> SOC Analyst <i>·</i> SIEM & Security Monitoring</p><p className="lead">MSc IT student focused on cybersecurity, SOC operations, SIEM, security monitoring, log analysis, Linux environments, network security, and threat detection.</p><div className="cta"><a className="primary" href="#projects">View Projects <Icon name="arrow" /></a><button className="secondary" onClick={viewResume}>View Resume</button><a className="secondary" href={`mailto:${email}`}>Email Me</a><a className="secondary" href={`tel:${phone}`}>Call Me</a></div><div className="social"><a href={linkedin} target="_blank"><Icon name="linkedin" /> LinkedIn</a><a href={github} target="_blank"><Icon name="github" /> GitHub</a><a href={`mailto:${email}`}><Icon name="mail" /> Email</a></div></div><div className="socVisual" aria-label="SOC monitoring visual"><div className="scanline" /><div className="visualTop"><span>LIVE SECURITY MONITOR</span><span className="status">● OPERATIONAL</span></div><div className="visualGrid"><div className="chart"><div className="chartLabel">AUTH EVENTS / 24H</div><svg viewBox="0 0 420 160" preserveAspectRatio="none"><polyline points="0,125 35,120 70,132 105,90 140,105 175,65 210,92 245,55 280,72 315,38 350,57 385,24 420,46" /></svg></div><div className="event"><div className="chartLabel">RECENT EVENT</div><strong>4625</strong><span>Failed logon detected</span><small>Windows Security Log</small></div></div><div className="nodes"><span /><span /><span /><span /><span /></div></div></section>

        <section className="quick"><div className="wrap quickgrid">{[['SOC & SIEM', 'Security monitoring and log analysis'], ['Splunk', 'Windows Security Event Log investigation'], ['MITRE ATT&CK', 'Threat analysis and technique mapping'], ['Cybersecurity Projects', 'Hands-on security labs and monitoring projects']].map(([a, b]) => <div className="quickcard" key={a}><div className="miniicon"><Icon name="shield" /></div><div><b>{a}</b><p>{b}</p></div></div>)}</div></section>

        <section id="about" className="section wrap"><div className="sectionhead"><span>01</span><h2>About Me</h2></div><div className="aboutgrid"><div><p className="bigp">I am an MSc Information Technology student at Gujarat Vidyapith with a strong interest in Cybersecurity and Security Operations.</p><p>My practical work focuses on SOC Level 1 investigation, SIEM, security monitoring, Windows and Linux security logs, threat analysis, network security, and cybersecurity tooling.</p></div><div><p>I have hands-on exposure to Splunk, Kali Linux, Nmap, Burp Suite, Metasploit, Wireshark, DVWA, Docker, AWS, and security logs through self-directed labs and projects.</p><p>Alongside cybersecurity, I have professional internship experience in Data Science, where I worked with Python, Pandas, NumPy, data preprocessing, analysis, and visualization.</p></div></div></section>

        <section id="skills" className="section wrap"><div className="sectionhead"><span>02</span><h2>Technical Skills</h2></div><div className="skillgrid">{Object.entries(skills).map(([cat, items]) => <div className={'skillgroup ' + (cat === 'Cybersecurity' || cat === 'Security Tools' ? 'priority' : '')} key={cat}><h3>{cat}</h3><div className="pills">{items.map(i => <span key={i}>{i}</span>)}</div></div>)}</div></section>

        <section id="projects" className="section wrap projectsSection"><div className="sectionhead"><span>03</span><h2>Featured Cybersecurity Projects</h2></div><div className="filterbar">{filters.map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><div className="projectgrid">{shown.map((p, i) => <article className={'project ' + (p.featured ? 'featured' : '')} key={p.title}><div className="projectnum">0{i + 1}</div>{p.featured && <div className="featuredTag">FEATURED</div>}<h3>{p.title}</h3><p className="domain">{p.domain}</p><p>{p.desc}</p><div className="techs">{p.tech.map(t => <span key={t}>{t}</span>)}</div><a className="projectlink" href={p.title.includes('SOC Sentinel') ? github : github} target="_blank">GitHub <Icon name="arrow" /></a></article>)}</div></section>

        <section className="workflow"><div className="wrap"><div className="sectionhead"><span>04</span><h2>My SOC Investigation Approach</h2></div><div className="flow">{['Collect', 'Normalize / Review Logs', 'Identify Suspicious Activity', 'Triage', 'Investigate', 'Map to MITRE ATT&CK', 'Document Findings'].map((x, i) => <div className="flowitem" key={x}><span>{String(i + 1).padStart(2, '0')}</span><b>{x}</b>{i < 6 && <em>→</em>}</div>)}</div><p className="note">Learning and project methodology — not professional SOC employment experience.</p></div></section>

        <section id="experience" className="section wrap"><div className="sectionhead"><span>05</span><h2>Experience</h2></div><div className="timeline"><div className="timelineitem"><div className="time">July 1, 2026 – Present</div><div><h3>Part-Time Web Development Intern</h3><b>Women Life Empowerment NGO</b><p>Part-Time Internship</p><p>Working as a Part-Time Web Development Intern, contributing to the development and maintenance of web-based applications using Python and Django, with SQLite for database management and Bootstrap for responsive frontend development.</p><div className="techs">{['Python', 'Django', 'SQLite', 'Bootstrap'].map(x => <span key={x}>{x}</span>)}</div></div></div><div className="timelineitem"><div className="time">JAN 2025 — JUN 2025</div><div><h3>Data Science Intern</h3><b>Maxgen Technology Private Limited</b><p>Ahmedabad, Gujarat, India</p><p>Worked across the data science workflow on real-time datasets, from preprocessing through analysis and visualization.</p><div className="techs">{['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Data Preprocessing', 'Data Analysis', 'Visualization'].map(x => <span key={x}>{x}</span>)}</div></div></div></div></section>

        <section id="education" className="section wrap"><div className="sectionhead"><span>06</span><h2>Education</h2></div><div className="edugrid"><div className="edu"><span>2025 — 2027</span><h3>Master of Science — Information Technology</h3><b>Gujarat Vidyapith, Ahmedabad</b><p>Currently pursuing</p></div><div className="edu"><span>2022 — 2025</span><h3>Bachelor of Computer Applications</h3><b>Gujarat Vidyapith, Ahmedabad</b><p>First Class</p></div></div></section>

        <section id="certifications" className="section wrap"><div className="sectionhead"><span>07</span><h2>Certifications</h2></div><div className="certgrid"><div className="cert"><div className="certmark">WS</div><div><span>SEPTEMBER 2026</span><h3>Become Next-Generation Ethical Hacker with AI</h3><b>WsCube Tech</b><p>Credential ID: WS/2026/M/64624</p></div></div><div className="cert"><div className="certmark">WS</div><div><span>SEPTEMBER 2026</span><h3>How to Become a Certified SOC Analyst in 2026</h3><b>WsCube Tech</b><p>Credential ID: WS/2026/M/63909</p></div></div></div></section>

        <section className="section lab"><div className="wrap"><div className="sectionhead"><span>08</span><h2>Cybersecurity Lab & Practical Experience</h2></div><div className="labgrid">{['Splunk', 'Kali Linux', 'Nmap', 'Burp Suite', 'Metasploit', 'Wireshark', 'DVWA', 'Docker', 'Windows Security Logs', 'Linux Security Logs'].map((x, i) => <div className="labcard" key={x}><span>0{i + 1}</span><b>{x}</b><small>{['SIEM & log investigation', 'Security lab environment', 'Network reconnaissance', 'Web security testing', 'Security testing lab', 'Packet analysis', 'Web application lab', 'Containerized tooling', 'Authentication event analysis', 'Linux log analysis'][i]}</small></div>)}</div></div></section>

        <section className="section wrap githubSec"><div className="githubBox"><div><div className="eyebrow"><Icon name="github" /> GITHUB PROJECTS</div><h2>Technical work, labs & code.</h2><p>Explore public repositories and project documentation. Repository details and statistics are intentionally not fabricated.</p></div><a className="primary" href={github} target="_blank">Open GitHub <Icon name="arrow" /></a></div></section>

        <section id="resume" className="section wrap resumeSection"><div className="sectionhead"><span>09</span><h2>Resume</h2></div><div className="resumeBox"><div><h3>View my professional resume</h3><p>Covering my cybersecurity/SOC profile, technical skills, projects, education, certifications, and experience.</p></div><div className="cta"><button className="primary" onClick={viewResume}>View Resume</button><a className="secondary" href={resumePath} download="sanketkumar.pdf">Download Resume</a></div></div></section>

        <section id="contact" className="contact"><div className="wrap"><div className="sectionhead"><span>10</span><h2>Contact Me</h2></div><div className="contactgrid"><div><h3>SanketKumar Zanzmera</h3><b>Cybersecurity & SOC Analyst</b><p>Ahmedabad, Gujarat, India</p><div className="contactdetails"><a href={`mailto:${email}`}><strong>Email</strong><span>{email}</span></a><a href={`tel:${phone}`}><strong>Phone</strong><span>+91 9870056961</span></a><a href={linkedin} target="_blank"><strong>LinkedIn</strong><span>linkedin.com/in/sanketkumar-zanzmera-12589424a</span></a><a href={github} target="_blank"><strong>GitHub</strong><span>github.com/zanzmerasanketkumar</span></a></div><div className="contactlinks"><a href={`mailto:${email}`}><Icon name="mail" /> Email Me</a><a href={`tel:${phone}`}>Call Me</a><button className="secondary" onClick={viewResume}>View Resume</button></div></div><ContactForm sent={sent} sending={sending} error={error} setSent={setSent} setSending={setSending} setError={setError} /></div></div></section>

        <footer><div className="wrap foot"><div><b>SanketKumar Zanzmera</b><span>Cybersecurity & SOC Analyst</span><a href={`mailto:${email}`}>Email: {email}</a><a href={`tel:${phone}`}>Phone: +91 9870056961</a></div><div className="footlinks"><a href={linkedin} target="_blank">LinkedIn</a><a href={github} target="_blank">GitHub</a></div><span>© 2026 SanketKumar Zanzmera. All rights reserved.</span></div></footer>
    </main>
}
